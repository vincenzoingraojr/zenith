import { FunctionComponent, useEffect, useMemo, useRef } from "react";
import {
    Notification,
    UnseenNotificationsDocument,
    UnseenNotificationsQuery,
    User,
    useViewNotificationMutation,
} from "../../../../generated/graphql";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import {
    NOTIFICATION_TYPES,
    POST_TYPES,
    USER_TYPES,
} from "../../../../utils/constants";
import { useFindUserById } from "../../../../utils/userQueries";
import {
    getDateToLocaleString,
    processDate,
} from "../../../../utils/processDate";
import {
    ItemLoading,
    OptionBaseIcon,
    PageText,
} from "../../../../styles/global";
import { useFindPostById } from "../../../../utils/postQueries";
import Bell from "../../../icons/Bell";
import Profile from "../../../icons/Profile";
import LikeIcon from "../../../icons/Like";
import Comment from "../../../icons/Comment";
import { COLORS } from "../../../../styles/colors";
import Pen from "../../../icons/Pen";
import RepostIcon from "../../../icons/Repost";
import profilePicture from "../../../../images/profile-picture.png";
import LoadingComponent from "../../../utils/LoadingComponent";

interface NotificationComponentProps {
    notification: Notification;
}

const NotificationWrapper = styled.div`
    display: block;
    border-bottom: 1px solid ${({ theme }) => theme.inputText};
`;

const NotificationInnerWrapper = styled.div`
    display: flex;
    gap: 16px;
    cursor: pointer;
    padding: 16px;
    background-color: transparent;
    transition: 0.2s background-color ease;

    &:hover,
    &:focus {
        background-color: ${({ theme }) => theme.overlayGrey};
    }
`;

const NotificationTypeIcon = styled(OptionBaseIcon)`
    width: 32px;
    height: 32px;
`;

const NotificationContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    overflow: hidden;
`;

const NotificationImageContainer = styled.div.attrs(
    (props: { type: string }) => props
)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: ${(props) =>
        props.type === USER_TYPES.ORGANIZATION ? "4px" : "16px"};
    opacity: 1;
    transition: opacity ease 0.2s;

    img {
        width: inherit;
        height: inherit;
        border-radius: inherit;
        object-fit: cover;
        object-position: center;
    }

    &:hover,
    &:focus {
        opacity: 0.8;
    }
`;

const NotificationContent = styled(PageText)`
    a {
        font-weight: 700;
        color: ${({ theme }) => theme.color};
    }
`;

const NotificationDate = styled(PageText)`
    font-size: 16px;
    color: ${({ theme }) => theme.inputText};
    text-decoration: none;
    cursor: pointer;

    &:hover,
    &:focus {
        text-decoration: underline;
    }
`;

const PostContent = styled(PageText)`
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: ${({ theme }) => theme.inputText};
`;

function transformSentence(sentence: string, user: User | null) {
    const match = sentence.match(/^(.+?) \(@(.+?)\)(.*)$/);

    if (!match || !user) {
        return <>{sentence}</>;
    }

    const [_, name, username, rest] = match;

    if (user.username !== username || user.name !== name) {
        return <>{sentence}</>;
    }

    return (
        <>
            <Link
                to={`/${username}`}
                title={name}
                aria-label={name}
                onClick={(e) => e.stopPropagation()}
            >
                {name}
            </Link>
            {rest}
        </>
    );
}

function getIcon(type: string, size: number) {
    switch (type) {
        case NOTIFICATION_TYPES.LIKE:
            return <LikeIcon isActive size={size} />;
        case NOTIFICATION_TYPES.MENTION:
            return <Profile isActive size={size} />;
        case NOTIFICATION_TYPES.COMMENT:
            return <Comment color={COLORS.purple} size={size} />;
        case NOTIFICATION_TYPES.QUOTE:
            return <Pen size={size} />;
        case NOTIFICATION_TYPES.REPOST:
            return <RepostIcon isActive size={size} />;
        case NOTIFICATION_TYPES.FOLLOW:
            return <Profile isActive size={size} />;
        default:
            return <Bell isActive size={size} />;
    }
}

const NotificationComponent: FunctionComponent<NotificationComponentProps> = ({
    notification,
}) => {
    const navigate = useNavigate();
    const size = 32;
    const notificationRef = useRef<HTMLDivElement>(null);

    const { user, loading: userLoading } = useFindUserById(
        notification.creatorId
    );
    const { post, loading: postLoading } = useFindPostById(
        notification.resourceId
    );

    const content = useMemo(
        () => transformSentence(notification.content, user || null),
        [notification.content, user]
    );
    const date = useMemo(
        () => processDate(notification.createdAt, true, false),
        [notification.createdAt]
    );
    const createdAt = useMemo(
        () => getDateToLocaleString(notification.createdAt),
        [notification.createdAt]
    );

    const url = useMemo(() => {
        switch (notification.notificationType) {
            case NOTIFICATION_TYPES.LIKE:
            case NOTIFICATION_TYPES.MENTION:
            case NOTIFICATION_TYPES.COMMENT:
            case NOTIFICATION_TYPES.QUOTE:
            case NOTIFICATION_TYPES.REPOST:
                return post
                    ? `/${post.author.username}/post/${post.itemId}`
                    : "/notifications";
            case NOTIFICATION_TYPES.FOLLOW:
                return user ? `/${user.username}` : "/notifications";
            case NOTIFICATION_TYPES.AFFILIATION:
                return "/affiliations";
            case NOTIFICATION_TYPES.PAYMENT:
                return "/payments";
            default:
                return "/notifications";
        }
    }, [notification.notificationType, post, user]);

    const icon = useMemo(
        () => getIcon(notification.notificationType, size),
        [notification.notificationType]
    );

    const [viewNotification] = useViewNotificationMutation();

    useEffect(() => {
        let notificationDivRef = notificationRef.current;

        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.5,
        };

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                viewNotification({
                    variables: {
                        notificationId: notification.notificationId,
                    },
                    update: (cache, { data: viewNotificationData }) => {
                        if (
                            viewNotificationData &&
                            viewNotificationData.viewNotification
                        ) {
                            const existing =
                                cache.readQuery<UnseenNotificationsQuery>({
                                    query: UnseenNotificationsDocument,
                                });

                            const existingUnseenNotifications =
                                existing?.unseenNotifications ?? [];

                            cache.writeQuery({
                                query: UnseenNotificationsDocument,
                                data: {
                                    unseenNotifications:
                                        existingUnseenNotifications.filter(
                                            (n: any) =>
                                                n.notificationId !==
                                                notification.notificationId
                                        ),
                                },
                            });
                        }
                    },
                });
            }
        }, options);

        if (notificationDivRef) {
            observer.observe(notificationDivRef);
        }

        return () => {
            if (notificationDivRef) {
                observer.unobserve(notificationDivRef);
            }

            notificationDivRef = null;
        };
    }, [viewNotification, notification]);

    const loading = userLoading || postLoading;

    return (
        <NotificationWrapper>
            {loading ? (
                <ItemLoading>
                    <LoadingComponent />
                </ItemLoading>
            ) : (
                <NotificationInnerWrapper
                    role="link"
                    tabIndex={0}
                    title="Open notification"
                    aria-label="Open notification"
                    ref={notificationRef}
                    onClick={() => navigate(url)}
                    onKeyDown={(e) => e.key === "Enter" && navigate(url)}
                >
                    <NotificationTypeIcon>{icon}</NotificationTypeIcon>
                    <NotificationContainer>
                        <NotificationImageContainer
                            key={notification.id}
                            onClick={(e) => {
                                e.stopPropagation();

                                if (user) {
                                    navigate(`/${user.username}`);
                                }
                            }}
                            type={user ? user.type : USER_TYPES.USER}
                        >
                            <img
                                src={
                                    user &&
                                    user.profile.profilePicture.length > 0
                                        ? user.profile.profilePicture
                                        : profilePicture
                                }
                                title={
                                    user ? `${user.name}'s profile picture` : ""
                                }
                                alt={
                                    user ? `${user.name}'s profile picture` : ""
                                }
                            />
                        </NotificationImageContainer>
                        <NotificationContent>{content}</NotificationContent>
                        {post &&
                            (notification.resourceType === POST_TYPES.POST ||
                                notification.resourceType ===
                                    POST_TYPES.COMMENT) && (
                                <PostContent>{post.content}</PostContent>
                            )}
                        <NotificationDate
                            title={createdAt}
                            aria-label={createdAt}
                        >
                            <time
                                dateTime={new Date(
                                    parseInt(notification.createdAt)
                                ).toISOString()}
                            >
                                {date}
                            </time>
                        </NotificationDate>
                    </NotificationContainer>
                </NotificationInnerWrapper>
            )}
        </NotificationWrapper>
    );
};

export default NotificationComponent;
