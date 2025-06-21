import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
} from "react";
import { useMeData } from "./userQueries";
import {
    PaginatedNotifications,
    useDeletedNotificationSubscription,
    useNewNotificationSubscription,
    useNotificationFeedQuery,
    useUnseenNotificationsQuery,
} from "../generated/graphql";
import { ApolloError, gql } from "@apollo/client";

interface NotificationsContextType {
    notificationFeed: PaginatedNotifications | undefined;
    loading: boolean;
    notificationsCount: number;
    error: ApolloError | undefined;
    loadMore: () => void;
}

const NotificationsContext = createContext<
    NotificationsContextType | undefined
>(undefined);

const NewNotificationFragment = gql`
    fragment NewNotification on Notification {
        id
        notificationId
        creatorId
        recipientId
        resourceId
        resourceType
        notificationType
        content
        viewed
        createdAt
        updatedAt
    }
`;

export const NotificationsProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const { me } = useMeData();

    const limit = 5;

    const { data, loading, error, fetchMore, client } =
        useNotificationFeedQuery({
            variables: {
                limit,
                cursor: null,
            },
            fetchPolicy: "cache-first",
            notifyOnNetworkStatusChange: true,
        });

    const loadMore = useCallback(() => {
        if (!data || (data && !data.notificationFeed.nextCursor) || loading)
            return;

        fetchMore({
            variables: { limit, cursor: data.notificationFeed.nextCursor },
        }).catch((error) => {
            console.error(error);
        });
    }, [data, fetchMore, limit, loading]);

    const { data: newNotificationData } = useNewNotificationSubscription({
        variables: { userId: me?.id },
        skip: !me,
    });

    const { data: deletedNotificationData } =
        useDeletedNotificationSubscription({
            variables: { userId: me?.id },
            skip: !me,
        });

    const handleNewNotification = useCallback(
        (newNotification: any) => {
            client.cache.modify({
                fields: {
                    notificationFeed(
                        existing = { notifications: [], nextCursor: null }
                    ) {
                        const exists = existing.notifications.some(
                            (n: any) =>
                                n.__ref === `Notification:${newNotification.id}`
                        );

                        if (exists) return existing;

                        return {
                            ...existing,
                            notifications: [
                                client.cache.writeFragment({
                                    data: newNotification,
                                    fragment: NewNotificationFragment,
                                }),
                                ...existing.notifications,
                            ],
                        };
                    },
                    unseenNotifications(existing = []) {
                        const exists = existing.some(
                            (n: any) =>
                                n.__ref === `Notification:${newNotification.id}`
                        );

                        if (exists) return existing;

                        return [
                            client.cache.writeFragment({
                                data: newNotification,
                                fragment: NewNotificationFragment,
                            }),
                            ...existing,
                        ];
                    },
                },
            });
        },
        [client]
    );

    useEffect(() => {
        if (newNotificationData) {
            const newNotification = newNotificationData.newNotification;

            handleNewNotification(newNotification);
        }
    }, [newNotificationData, handleNewNotification]);

    const handleDeletedNotification = useCallback(
        (deletedNotification: any) => {
            const refId = `Notification:${deletedNotification.id}`;

            client.cache.modify({
                fields: {
                    notificationFeed(
                        existing = { notifications: [], nextCursor: null }
                    ) {
                        const filteredNotifications =
                            existing.notifications.filter(
                                (n: any) => n.__ref !== refId
                            );

                        return {
                            ...existing,
                            notifications: filteredNotifications,
                        };
                    },
                    unseenNotifications(existing = []) {
                        return existing.filter((n: any) => n.__ref !== refId);
                    },
                },
            });
        },
        [client]
    );

    useEffect(() => {
        if (deletedNotificationData) {
            const deletedNotification =
                deletedNotificationData.deletedNotification;

            handleDeletedNotification(deletedNotification);
        }
    }, [deletedNotificationData, handleDeletedNotification]);

    const { data: unseenData } = useUnseenNotificationsQuery({
        fetchPolicy: "cache-and-network",
    });

    const notificationsCount = useMemo(() => {
        if (unseenData) {
            return unseenData.unseenNotifications.length;
        } else {
            return 0;
        }
    }, [unseenData]);

    return (
        <NotificationsContext.Provider
            value={{
                notificationFeed: data?.notificationFeed,
                loading,
                error,
                loadMore,
                notificationsCount,
            }}
        >
            {children}
        </NotificationsContext.Provider>
    );
};

export const useNotificationsContext = (): NotificationsContextType => {
    const context = useContext(NotificationsContext);

    if (!context)
        throw new Error(
            "useNotificationsContext must be used inside NotificationsProvider"
        );

    return context;
};
