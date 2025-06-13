import { useNavigate } from "react-router-dom";
import Head from "../components/Head";
import Settings from "../components/icons/Settings";
import PageLayout from "../components/layouts/PageLayout";
import PageContentLayout from "../components/layouts/sublayouts/PageContentLayout";
import {
    ControlContainer,
    FullWidthFeedContainer,
} from "../styles/global";
import NotificationComponent from "../components/layouts/items/notifications/NotificationComponent";
import { useNotificationsContext } from "../utils/NotificationsProvider";
import FeedComponent from "../components/utils/FeedComponent";
import { useMemo } from "react";

function Notifications() {
    const navigate = useNavigate();

    const { notificationFeed, loading, loadMore, error } =
        useNotificationsContext();

    const feedContent = useMemo(() => (
        <>
            {notificationFeed?.notifications.map(
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
        </>
    ), [notificationFeed?.notifications]);
    
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
                                <FeedComponent
                                    key="notifications"
                                    feedContent={feedContent}
                                    loading={loading}
                                    error={error}
                                    loadMore={loadMore}
                                    noElementsText="No activity yet."
                                    isFeedEmpty={notificationFeed?.notifications.length === 0 && !notificationFeed?.nextCursor}
                                />
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
