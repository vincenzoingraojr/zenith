import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import { AuthContext } from "../types";
import { logger } from "../helpers/logger";

export const isAuth: MiddlewareFn<AuthContext> = ({ context }, next) => {
    const authorization = context.req.headers["authorization"];

    if (!authorization) {
        logger.warn("Not authenticated.");
    } else {
        try {
            const token = authorization.split(" ")[1];
            const payload = verify(
                token,
                process.env.ACCESS_TOKEN_SECRET as string
            );
            context.payload = payload as any;
        } catch (error) {
            logger.error(error);
        }
    }

    return next();
};
