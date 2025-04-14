import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user.resolver";
import path from "path";
import favicon from "serve-favicon";
import cors, { CorsOptions } from "cors";
import http from "http";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import { Session, User } from "./entities/User";
import { createAccessToken, createRefreshToken } from "./auth/auth";
import { sendRefreshToken } from "./auth/sendRefreshToken";
import { PostResolver } from "./resolvers/post.resolver";
import { getPresignedUrlForDeleteCommand, getPresignedUrlForPutCommand } from "./helpers/getPresignedUrls";
import { MessageNotificationResolver, NotificationResolver } from "./resolvers/notification.resolver";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { execute, subscribe } from "graphql";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { SearchResolver } from "./resolvers/search.resolver";
import { v4 as uuidv4 } from "uuid";
import { createUniqueIdentifier } from "./helpers/createUniqueIdentifier";
import { ChatResolver, MessageResolver } from "./resolvers/message.resolver";
import appDataSource from "./dataSource";
import { expressMiddleware } from "@apollo/server/express4";
import { pubSub } from "./helpers/createPubSub";
import { ReportResolver } from "./resolvers/report.resolver";
import * as admin from "firebase-admin";
import { seedTopics } from "./helpers/topics";
import { LandingUserResolver } from "./resolvers/landingUser.resolver";
import { initAccounts } from "./helpers/user/initAccounts";
import { logger } from "./helpers/logger";

const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

async function main() {
    const app = express();

    app.use(cookieParser());
    
    const allowedOriginRegex = new RegExp(process.env.ORIGIN!);

    const corsOptions: CorsOptions = {
        origin: (origin, callback) => {
            if (!origin || allowedOriginRegex.test(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
    };

    app.use(
        cors(corsOptions),
    );

    app.use(express.static(path.join(__dirname, "./public")));
    app.use(favicon(path.join(__dirname, "./public", "favicon.ico")));
    app.get(process.env.NODE_ENV === "production" ? "/*" : "/", (_req, res) => {
        res.sendFile("index.html", {
            root: path.join(__dirname, "./public"),
        });
    });

    app.use(express.json());

    await appDataSource.initialize()
        .then(() => {
            logger.info("Data source ready.");
        })
        .catch((error) => {
            logger.error("Error during data source initialization", error);
        });

    const userRepository = appDataSource.getRepository(User);
    const sessionRepository = appDataSource.getRepository(Session);

    app.post("/", async (req, res) => {
        const token = req.cookies.cke;
        const identifier = req.cookies.uid;

        if (!identifier) {
            createUniqueIdentifier(res, uuidv4());
        }

        if (!token) {
            return res.send({ ok: false, accessToken: "", sessionId: "" });
        }

        let payload: any = null;

        try {
            payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
        } catch (error) {
            console.error(error);
            return res.send({ ok: false, accessToken: "", sessionId: "" });
        }

        const user = await userRepository.findOne({ where: { id: payload.id }, relations: ["sessions"] });
        const session = await sessionRepository.findOne({ where: { sessionId: payload.sessionId }, relations: ["user"] });

        if (!user || !session) {
            return res.send({ ok: false, accessToken: "", sessionId: "" });
        }

        sendRefreshToken(res, createRefreshToken(user, session));

        return res.send({ ok: true, accessToken: createAccessToken(user, session), sessionId: session.sessionId });
    });

    app.post("/users", async (_, res) => {
        let rawUsers = await userRepository.find();
        let users: any = [];

        rawUsers.map((user: User) => (
            users.push({
                id: user.id,
                name: user.name,
                link: "/" + user.username,
                username: user.username,
                avatar: user.profile.profilePicture,
            })
        ));

        if (users.length > 0) {
            return res.send({ ok: true, users });
        } else {
            return res.send({ ok: false, users: [] });
        }
    });

    app.post("/presigned-url", async (req, res) => {
        const { key, type, itemType } = req.body;
        let url;

        if (type === "put") {
            url = await getPresignedUrlForPutCommand(key, itemType);
        } else {
            url = await getPresignedUrlForDeleteCommand(key, itemType);
        }

        res.send({ url });
    });

    const schema = await buildSchema({
        resolvers: [UserResolver, PostResolver, NotificationResolver, SearchResolver, ChatResolver, MessageResolver, MessageNotificationResolver, ReportResolver, LandingUserResolver],
        pubSub,
    });

    const httpServer = http.createServer(app);
    const wsServer = new WebSocketServer({ server: httpServer, path: "/graphql" });

    const serverCleanup = useServer({ 
        schema, 
        execute, 
        subscribe,
    }, wsServer);

    const server = new ApolloServer({
        schema,
        plugins: [        
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        },
                    };
                },
            },
        ],
    });

    await server.start();
    app.use(
        "/graphql",
        expressMiddleware(server, {
            context: async ({ req, res }) => ({ req, res }),
        }),
    );

    httpServer.listen({ port: process.env.PORT || 4000 }, () => {
        logger.info("Zenith server started.");
    });

    await seedTopics();

    await initAccounts();
}

main().catch((error) => {
    logger.error(error);
});
