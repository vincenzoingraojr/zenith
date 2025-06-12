import { useNavigate } from "react-router-dom";
import Head from "../components/Head";
import Settings from "../components/icons/Settings";
import PageLayout from "../components/layouts/PageLayout";
import PageContentLayout from "../components/layouts/sublayouts/PageContentLayout";
import {
    ControlContainer,
    EndContainer,
    FeedLoading,
    FullWidthFeedContainer,
    NoElementsAlert,
    PageBlock,
} from "../styles/global";
import { useEffect, useRef } from "react";
import LoadingComponent from "../components/utils/LoadingComponent";
import ErrorOrItemNotFound from "../components/utils/ErrorOrItemNotFound";
import { ERROR_SOMETHING_WENT_WRONG } from "../utils/constants";
import NotificationComponent from "../components/layouts/items/notifications/NotificationComponent";
import { useNotificationsContext } from "../utils/NotificationsProvider";

function Notifications() {
    const navigate = useNavigate();

    const { notificationFeed, loading, moreLoading, loadMore, error } =
        useNotificationsContext();

    const endContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.5,
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
                                {loading && !notificationFeed ? (
                                    <FeedLoading>
                                        <LoadingComponent />
                                    </FeedLoading>
                                ) : (
                                    <>
                                        {notificationFeed && !error ? (
                                            <>
                                                {notificationFeed.notifications
                                                    .length === 0 &&
                                                !notificationFeed.nextCursor ? (
                                                    <NoElementsAlert>
                                                        No activity yet.
                                                    </NoElementsAlert>
                                                ) : (
                                                    <>
                                                        {notificationFeed.notifications.map(
                                                            (notification) => (
                                                                <NotificationComponent
                                                                    key={
                                                                        notification.notificationId
                                                                    }
                                                                    notification={
                                                                        notification
                                                                    }
                                                                />
                                                            )
                                                        )}
                                                        {moreLoading ? (
                                                            <FeedLoading>
                                                                <LoadingComponent />
                                                            </FeedLoading>
                                                        ) : (
                                                            <PageBlock
                                                                ref={
                                                                    endContainerRef
                                                                }
                                                            >
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
                                                title={
                                                    ERROR_SOMETHING_WENT_WRONG.title
                                                }
                                                content={
                                                    ERROR_SOMETHING_WENT_WRONG.message
                                                }
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
