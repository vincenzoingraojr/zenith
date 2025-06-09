import { useNavigate } from "react-router-dom";
import Head from "../components/Head";
import Settings from "../components/icons/Settings";
import PageLayout from "../components/layouts/PageLayout";
import PageContentLayout from "../components/layouts/sublayouts/PageContentLayout";
import { ControlContainer, EndContainer, FeedLoading, FullWidthFeedContainer, NoElementsAlert, PageBlock } from "../styles/global";
import { useDeletedNotificationSubscription, useNewNotificationSubscription, useNotificationFeedQuery } from "../generated/graphql";
import { useMeData } from "../utils/userQueries";
import { useCallback, useEffect, useRef, useState } from "react";
import LoadingComponent from "../components/utils/LoadingComponent";
import ErrorOrItemNotFound from "../components/utils/ErrorOrItemNotFound";
import { ERROR_SOMETHING_WENT_WRONG } from "../utils/constants";
import { gql } from "@apollo/client";

function Notifications() {
    const navigate = useNavigate();
    const limit = 5;

    const { data, loading, error, fetchMore, client } = useNotificationFeedQuery({
        variables: {
            limit,
            cursor: null,
        },
        fetchPolicy: "cache-first",
        notifyOnNetworkStatusChange: true,
    });

    const { me } = useMeData();

    const { data: newNotificationData } = useNewNotificationSubscription({
        variables: { userId: me?.id },
    });

    const { data: deletedNotificationData } = useDeletedNotificationSubscription({
        variables: { userId: me?.id },
    });

    const [isLoading, setIsLoading] = useState(false);
    
    const endContainerRef = useRef<HTMLDivElement | null>(null);
    
    const loadMore = useCallback(() => {
        if (!data || (data && !data.notificationFeed.nextCursor)) return;

        setIsLoading(true);

        fetchMore({
            variables: { limit, cursor: data.notificationFeed.nextCursor },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult || fetchMoreResult.notificationFeed.notifications.length === 0) return prev;

                return {
                    notificationFeed: {
                        __typename: prev.notificationFeed.__typename,
                        notifications: [...fetchMoreResult.notificationFeed.notifications],
                        nextCursor: fetchMoreResult.notificationFeed.nextCursor,
                    }
                };
            },
        }).then(() => {            
            setIsLoading(false);
        }).catch((error) => {
            console.error(error);
        });
    }, [data, fetchMore]);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0,
        };

        const observer = new IntersectionObserver((entries) => {
            const target = entries[0];
            if (target.isIntersecting) {
                loadMore();
            }
        }, options);

        const current = endContainerRef.current;
    
        if (current) {
            observer.observe(current);
        }
    
        return () => {
            if (current) {
                observer.unobserve(current);
            }
        };
    }, [loadMore, endContainerRef]);

    useEffect(() => {
        if (newNotificationData && newNotificationData.newNotification) {
            const newNotification = newNotificationData.newNotification;

            client.cache.modify({
                fields: {
                    notificationFeed(existing = { notifications: [], nextCursor: null }) {
                        const exists = existing.notifications.some((n: any) => n.__ref === `Notification:${newNotification.id}`);

                        if (exists) return existing;

                        return {
                            ...existing,
                            notifications: [client.cache.writeFragment({
                                data: newNotification,
                                fragment: gql`
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
                                `
                            }), ...existing.notifications],
                        };
                    }
                }
            });
        }
    }, [newNotificationData, client]);

    useEffect(() => {
        if (deletedNotificationData && deletedNotificationData.deletedNotification) {
            const deletedNotification = deletedNotificationData.deletedNotification;

            const refId = `Notification:${deletedNotification.id}`;

            client.cache.modify({
                fields: {
                    notificationFeed(existing = { notifications: [], nextCursor: null }) {
                        const filteredNotifications = existing.notifications.filter((n: any) =>
                            n.__ref ? n.__ref !== refId : n.id !== deletedNotification.id
                        );

                        return {
                            ...existing,
                            notifications: filteredNotifications,
                        };
                    }
                }
            });
        }
    }, [deletedNotificationData, client]);

    return (
        <>
            <Head 
                title="Notifications | Zenith"
                description="Here you can look at your notifications."
            />
            <PageLayout 
                children={
                    <PageContentLayout
                        title="Notifications"
                        type="main"
                        children={
                            <FullWidthFeedContainer>
                                {(loading && !data) ? (
                                    <FeedLoading>
                                        <LoadingComponent />
                                    </FeedLoading>
                                ) : (
                                    <>
                                        {data && !error ? (
                                            <>
                                                {data.notificationFeed.notifications.length === 0 && !data.notificationFeed.nextCursor ? (
                                                    <NoElementsAlert>
                                                        No activity yet.
                                                    </NoElementsAlert>
                                                ) : (
                                                    <>
                                                        {data.notificationFeed.notifications.map(
                                                            (notification) => (
                                                                <div key={notification.notificationId}>{notification.content}</div>
                                                            )
                                                        )}
                                                        {isLoading ? (
                                                            <FeedLoading>
                                                                <LoadingComponent />
                                                            </FeedLoading>
                                                        ) : (
                                                            <PageBlock ref={endContainerRef}>
                                                                <EndContainer>
                                                                    ⋅
                                                                </EndContainer>
                                                            </PageBlock>
                                                        )}
                                                    </>
                                                )}
                                            </>   
                                        ) : (
                                            <ErrorOrItemNotFound
                                                isError={true}
                                                title={ERROR_SOMETHING_WENT_WRONG.title}
                                                content={ERROR_SOMETHING_WENT_WRONG.message}
                                            /> 
                                        )}
                                    </>
                                )}
                            </FullWidthFeedContainer>
                        }
                        headerIconsComponent={
                            <ControlContainer
                                role="link"
                                title="Notification settings"
                                aria-label="Notification settings"
                                onClick={() => {
                                    navigate("/settings/notifications");
                                }}
                            >
                                <Settings type="options" />
                            </ControlContainer>
                        }
                    />
                }
            />
        </>
    );
}

export default Notifications;