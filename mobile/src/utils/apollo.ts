import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, Observable } from "@apollo/client";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import { REACT_APP_SERVER_ORIGIN, REACT_APP_WS_SERVER_ORIGIN } from "@env";
import { getToken, setToken } from "./token";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { RetryLink } from '@apollo/client/link/retry';
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { onError } from "apollo-link-error";

const cache = new InMemoryCache();

const refreshLink = new TokenRefreshLink({
    accessTokenField: "accessToken",
    isTokenValidOrUndefined: async () => {
        const token = await getToken();

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
        return fetch(REACT_APP_SERVER_ORIGIN, {
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
    handleFetch: async (accessToken: string) => {
        await setToken(accessToken);
    },
    handleError: (error: any) => {
        console.error(error);
    },
}) as ApolloLink;

const authContextLink = new ApolloLink(
    (operation, forward) =>
        new Observable((observer) => {
            let handle: any;
            Promise.resolve(operation)
                .then(async (operation) => {
                    const accessToken = await getToken();

                    if (accessToken) {
                        operation.setContext({
                            headers: {
                                authorization: `Bearer ${accessToken}`,
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

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) => {
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${
                    locations || "not found"
                }, Path: ${path}`
            );
        });

    if (networkError)
        console.log(
            `[Network error]: ${JSON.stringify(networkError)}`
        );
}) as any;

const httpLink = new HttpLink({
    uri: `${REACT_APP_SERVER_ORIGIN}/graphql`,
    credentials: "include",
});

const wsLink = new GraphQLWsLink(
    createClient({
        url: `${REACT_APP_WS_SERVER_ORIGIN}/graphql`,
    })
);

const retryIf = (error: any) => {
    const doNotRetryCodes = [500, 400, 401];
    return !!error && !doNotRetryCodes.includes(error.statusCode);
};

const retryLink = new RetryLink({
    delay: {
        initial: 300,
        max: Infinity,
        jitter: true,
    },
    attempts: {
        max: 5,
        retryIf,
    },
});

const link = retryLink.split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
        );
    },
    wsLink,
    httpLink,
);

export const client = new ApolloClient({
    link: ApolloLink.from([refreshLink, errorLink, authContextLink, link]),
    cache,
});