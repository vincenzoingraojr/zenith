import {
    ApolloClient,
    ApolloLink,
    ApolloProvider,
    HttpLink,
    InMemoryCache,
    Observable,
    split,
} from "@apollo/client";
import { onError } from "apollo-link-error";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode, { JwtPayload } from "jwt-decode";
import ReactDOM from "react-dom";
import { getAccessToken, setAccessToken } from "./utils/token";
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import GlobalStyle from "./styles/global";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styles/theme";
import { ThemeProviderWrapper, useThemeContext } from "./styles/ThemeContext";
import App from "./App";
import { AuthProvider } from "./utils/AuthContext";
import { ToastProvider } from "./components/utils/ToastProvider";

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                postFeed: {
                    keyArgs: false,
                    merge: (existing, incoming) => {
                        return {
                            posts: [
                                ...(existing?.posts || []),
                                ...incoming.posts,
                            ],
                            hasMore: incoming.hasMore,
                            totalCount: incoming.totalCount,
                        };
                    },
                },
                notificationFeed: {
                    keyArgs: false,
                    merge: (existing, incoming) => {
                        return {
                            notifications: [
                                ...(existing?.notifications || []),
                                ...incoming.notifications,
                            ],
                            nextCursor: incoming.nextCursor,
                        };
                    },
                },
                getPostLikes: {
                    keyArgs: ["itemId", "type"],
                    merge: (existing, incoming) => {
                        return {
                            users: [
                                ...(existing?.users || []),
                                ...incoming.users,
                            ],
                            hasMore: incoming.hasMore,
                            totalCount: incoming.totalCount,
                        };
                    },
                },
                getReposts: {
                    keyArgs: ["postId"],
                    merge: (existing, incoming) => {
                        return {
                            reposts: [
                                ...(existing?.reposts || []),
                                ...incoming.reposts,
                            ],
                            hasMore: incoming.hasMore,
                            totalCount: incoming.totalCount,
                        };
                    },
                },
                postComments: {
                    keyArgs: ["id", "type"],
                    merge: (existing, incoming) => {
                        return {
                            posts: [
                                ...(existing?.posts || []),
                                ...incoming.posts,
                            ],
                            hasMore: incoming.hasMore,
                            totalCount: incoming.totalCount,
                        };
                    },
                },
                unseenNotifications: {
                    merge: (_existing = [], incoming) => {
                        return incoming;
                    },
                },
            },
        },
        Post: {
            fields: {
                media: {
                    merge: (_existing = [], incoming) => {
                        return incoming;
                    },
                },
            },
        },
    },
});

const requestLink = new ApolloLink(
    (operation, forward) =>
        new Observable((observer) => {
            let handle: any;
            Promise.resolve(operation)
                .then((operation) => {
                    const accessToken = getAccessToken();
                    if (accessToken) {
                        operation.setContext({
                            headers: {
                                authorization: `bearer ${accessToken}`,
                            },
                        });
                    }
                })
                .then(() => {
                    handle = forward(operation).subscribe({
                        next: observer.next.bind(observer),
                        error: observer.error.bind(observer),
                        complete: observer.complete.bind(observer),
                    });
                })
                .catch(observer.error.bind(observer));

            return () => {
                if (handle) handle.unsubscribe();
            };
        })
);

const httpLink = new HttpLink({
    uri: `${process.env.REACT_APP_SERVER_ORIGIN}/graphql`,
    credentials: "include",
});

const wsLink = new GraphQLWsLink(
    createClient({
        url: `${process.env.REACT_APP_WS_SERVER_ORIGIN}/graphql`,
    })
);

const link = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
        );
    },
    wsLink,
    httpLink
);

const client = new ApolloClient({
    link: ApolloLink.from([
        new TokenRefreshLink({
            accessTokenField: "accessToken",
            isTokenValidOrUndefined: () => {
                const token = getAccessToken();

                if (!token) {
                    return true;
                }

                try {
                    const { exp } = jwtDecode<JwtPayload>(token);
                    if (exp && Date.now() >= exp * 1000) {
                        return false;
                    } else {
                        return true;
                    }
                } catch {
                    return false;
                }
            },
            fetchAccessToken: () => {
                return fetch(process.env.REACT_APP_SERVER_ORIGIN!, {
                    method: "POST",
                    credentials: "include",
                });
            },
            handleResponse:
                (_: any, accessTokenField: string) =>
                async (response: Response) => {
                    const result = await response.json();

                    return {
                        [accessTokenField]: result[accessTokenField],
                    };
                },
            handleFetch: (accessToken) => {
                setAccessToken(accessToken);
            },
            handleError: (err) => {
                console.warn("Your refresh token is invalid. Try to relogin.");
                console.error(err);
            },
        }),
        onError(({ graphQLErrors, networkError }) => {
            console.log(graphQLErrors);
            console.log(networkError);
        }) as any,
        requestLink,
        link,
    ]),
    cache,
});

const ThemedApp = () => {
    const { isDarkMode } = useThemeContext();
    const theme = isDarkMode ? darkTheme : lightTheme;

    return (
        <ThemeProvider theme={theme}>
            <ToastProvider>
                <GlobalStyle />
                <App />
            </ToastProvider>
        </ThemeProvider>
    );
};

ReactDOM.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <AuthProvider>
                <ThemeProviderWrapper>
                    <ThemedApp />
                </ThemeProviderWrapper>
            </AuthProvider>
        </BrowserRouter>
    </ApolloProvider>,
    document.getElementById("root")
);

serviceWorkerRegistration.register({
    bypassNodeEnvProduction:
        process.env.REACT_APP_ENV === "development" ? true : false,
});

reportWebVitals();
