import {
    FunctionComponent,
    useCallback,
    useMemo,
    useRef,
} from "react";
import { Post } from "../../../../generated/graphql";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    ControlContainer,
    PageBlock,
    PageText,
    RightContainer,
    UserFullName,
    UserFullNameContainer,
    UserInfo,
    UsernameContainer,
} from "../../../../styles/global";
import TextContainerRender from "../../../utils/TextContainerRender";
import LikeIcon from "../../../icons/Like";
import { formatter } from "../../../../utils/formatter";
import { COLORS } from "../../../../styles/colors";
import Share from "../../../icons/Share";
import Views from "../../../icons/Views";
import Options from "../../options/Options";
import More from "../../../icons/More";
import { useOptions } from "../../../utils/hooks";
import Flag from "../../../icons/Flag";
import Comment from "../../../icons/Comment";
import {
    getDateToLocaleString,
    processDate,
} from "../../../../utils/processDate";
import Pen from "../../../icons/Pen";
import {
    useHasThisUserAsAffiliate,
    useFollowData,
    useHasBlockedMeData,
    useIsUserBlockedData,
    useMeData,
} from "../../../../utils/user/userQueries";
import Bin from "../../../icons/Bin";
import FollowIcon from "../../../icons/FollowIcon";
import Chain from "../../../icons/Chain";
import copy from "copy-to-clipboard";
import { useToasts } from "../../../utils/ToastProvider";
import RepostIcon from "../../../icons/Repost";
import Mail from "../../../icons/Mail";
import VerificationBadge from "../../../utils/VerificationBadge";
import {
    useBookmarkData,
    useComments,
    useFeedItemStats,
    useFindPostById,
    useGetPostMentions,
    useLikeData,
    usePostLikes,
    useRepostData,
    useReposts,
} from "../../../../utils/post/postQueries";
import QuotedPost from "./QuotedPost";
import LoadingComponent from "../../../utils/LoadingComponent";
import AffiliationIcon from "../../../utils/AffiliationIcon";
import BookmarkIcon from "../../../icons/Bookmark";
import Block from "../../../icons/Block";
import OptionComponent from "../../options/OptionComponent";
import { usePostMutations } from "../../../../utils/post/postMutations";
import { useUserMutations } from "../../../../utils/user/userMutations";
import Unmention from "../../../icons/Unmention";
import ProfilePicture from "../../../utils/ProfilePicture";
import { POST_TYPES } from "../../../../utils/constants";
import globalObserver from "../../../utils/globalObserver";

interface PostComponentProps {
    post: Post;
    showReplying?: boolean;
    showIsReposted?: boolean;
    origin: string;
}

const PostWrapper = styled.div`
    display: block;
    border-top: unset;
    border-bottom: 1px solid ${({ theme }) => theme.inputText};

    &:first-child {
        border-top: 1px solid ${({ theme }) => theme.inputText};
    }
`;

const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: transparent;
    cursor: pointer;
`;

export const PostHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding-top: 16px;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 16px;
    width: 100%;
    overflow: hidden;
`;

export const PostAuthorContainer = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
    width: auto;
    overflow: hidden;
    cursor: pointer;
    text-decoration: none;

    &:hover,
    &:active {
        text-decoration: none;
    }
`;

export const PostDate = styled(PageText)`
    font-size: 14px;
    color: ${({ theme }) => theme.inputText};
    white-space: nowrap;
    text-decoration: none;
    cursor: pointer;

    &:hover,
    &:focus {
        text-decoration: underline;
    }
`;

export const PostContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-top: 10px;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 10px;
`;

export const PostTextContainer = styled.div`
    display: block;
    font-size: 22px;
`;

export const PostMediaContainer = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;

    &:has(div:nth-child(3):last-child) div:nth-child(3),
    &:has(div:nth-child(1):only-child) div:nth-child(1) {
        grid-column: span 2;
    }
`;

export const PostMediaItem = styled.div`
    display: flex;
    width: 100%;
    height: auto;
    border-radius: 12px;

    img,
    video {
        display: block;
        width: 100%;
        height: auto;
        border-radius: inherit;
        object-fit: cover;
        object-position: center;
    }
`;

export const PostActionsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding-top: 10px;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 10px;
`;

export const PostActionsGroup = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
`;

const PostActionContainer = styled.button.attrs(
    (props: { color?: string; isActive: boolean }) => props
)`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    color: ${(props) =>
        props.isActive ? props.color || COLORS.blue : "inherit"};

    &:hover,
    &:focus {
        color: ${(props) => props.color || COLORS.blue};
    }

    &:hover div div svg,
    &:focus div div svg,
    &:hover div div div svg,
    &:focus div div div svg {
        fill: ${(props) => props.color || COLORS.blue};
    }

    &:hover ${ControlContainer}, &:focus ${ControlContainer} {
        background-color: ${({ theme }) => theme.overlayGrey};
    }

    &:disabled {
        opacity: 0.6;
    }
`;

export const PostActionInfo = styled(PageText)`
    font-size: 14px;
    color: inherit;
    background-color: transparent;
`;

export const QuotedPostNotAvailable = styled.div`
    display: block;
    color: ${({ theme }) => theme.inputText};
    background-color: ${({ theme }) => theme.inputBackground};
    padding: 12px;
    border-radius: 12px;
`;

const PostComponent: FunctionComponent<PostComponentProps> = ({
    post,
    showReplying,
    showIsReposted,
    origin,
}) => {
    const navigate = useNavigate();

    const { activeOptions, handleOptionsClick } = useOptions();

    const date = useMemo(
        () => processDate(post.createdAt, true, true),
        [post.createdAt]
    );

    const createdAt = getDateToLocaleString(post.createdAt);

    const { me } = useMeData();

    const location = useLocation();

    const {
        handleDeletePost,
        handleLikePost,
        handleRepost,
        handleBookmark,
        handleViewFeedItem,
        handleRevokeMention,
    } = usePostMutations();

    const viewedRef = useRef(false);

    const setPostRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (node) {
                const handleIntersect = (entries: IntersectionObserverEntry[]) => {
                    const isVisible = entries[0].isIntersecting;
                    
                    if (isVisible && !viewedRef.current) {
                        viewedRef.current = true;
                        handleViewFeedItem(post.itemId, post.type, false, origin);
                    }
                };

                globalObserver.observe(node, handleIntersect);
            }

            return () => {
                if (node) {
                    globalObserver.unobserve(node);
                }
            };
        },
        [handleViewFeedItem, post.itemId, post.type, origin]
    );

    const isPostLikedByMe = useLikeData(post.itemId, post.type);

    const like = useMemo(() => isPostLikedByMe, [isPostLikedByMe]);

    const { postLikes } = usePostLikes(post.itemId, post.type);

    const likes = postLikes?.totalCount || 0;

    const { postComments } = useComments(post.type, post.id);

    const comments = postComments?.totalCount || 0;

    const { addToast } = useToasts();

    const isRepostedByUser = useRepostData(post.id, me?.id);

    const repost = useMemo(() => isRepostedByUser, [isRepostedByUser]);

    const { userReposts } = useReposts(post.id);

    const reposts = userReposts?.totalCount || 0;

    const {
        post: quotedPost,
        loading,
        error,
    } = useFindPostById(post.quotedPostId);

    const isFollowedByMe = useFollowData(post.authorId);

    const follow = useMemo(() => isFollowedByMe, [isFollowedByMe]);

    const isBookmarked = useBookmarkData(post.type, post.id);

    const bookmark = useMemo(() => isBookmarked, [isBookmarked]);

    const isBlockedByMe = useIsUserBlockedData(post.authorId);

    const blockedByMe = useMemo(() => isBlockedByMe, [isBlockedByMe]);

    const hasBlockedMe = useHasBlockedMeData(post.authorId);

    const blockedMe = useMemo(() => hasBlockedMe, [hasBlockedMe]);

    const isAffiliatedToMe = useHasThisUserAsAffiliate(me?.id, post.authorId);
    const isAffiliatedToAuthor = useHasThisUserAsAffiliate(
        post.authorId,
        me?.id
    );

    const affiliation = useMemo(() => {
        return isAffiliatedToMe || isAffiliatedToAuthor;
    }, [isAffiliatedToMe, isAffiliatedToAuthor]);

    const { handleFollowUser, handleBlockUser } = useUserMutations();

    const postStats = useFeedItemStats(post.itemId, post.type);

    const views = postStats?.views || 0;

    const postMentions = useGetPostMentions(post.itemId);

    const mentions = postMentions?.mentions || [];

    return (
        <PostWrapper>
            <PostContainer
                role="link"
                tabIndex={0}
                ref={setPostRef}
                onClick={(e: any) => {
                    if (
                        e.target.tagName === "A" &&
                        e.target.getAttribute("target") === "_blank"
                    ) {
                        e.stopPropagation();
                    } else {
                        navigate(
                            `/${post.author.username}/post/${post.itemId}`
                        );
                    }
                }}
                onKeyDown={(e) =>
                    e.key === "Enter" &&
                    navigate(`/${post.author.username}/post/${post.itemId}`)
                }
            >
                <PostHeader>
                    <PostAuthorContainer
                        role="link"
                        aria-label={`${post.author.name}'s profile`}
                        title={`${post.author.name}'s profile`}
                        to={`/${post.author.username}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <ProfilePicture
                            loading={false}
                            pictureUrl={post.author.profile.profilePicture}
                            type={post.author.type}
                            size={40}
                            title={post.author.name}
                        />
                        <UserInfo>
                            <UserFullNameContainer>
                                <UserFullName>{post.author.name}</UserFullName>
                                {post.author.verification.verified ===
                                    "VERIFIED" && (
                                    <VerificationBadge
                                        type={post.author.type}
                                        verifiedSince={
                                            post.author.verification
                                                .verifiedSince
                                                ? new Date(
                                                      parseInt(
                                                          post.author
                                                              .verification
                                                              .verifiedSince
                                                      )
                                                  ).toLocaleString("en-us", {
                                                      month: "long",
                                                      year: "numeric",
                                                  })
                                                : undefined
                                        }
                                        size={18}
                                    />
                                )}
                                <AffiliationIcon
                                    userId={post.authorId}
                                    size={18}
                                />
                            </UserFullNameContainer>
                            <UsernameContainer>
                                @{post.author.username}
                            </UsernameContainer>
                        </UserInfo>
                    </PostAuthorContainer>
                    <RightContainer>
                        <PostDate title={createdAt} aria-label={createdAt}>
                            <time dateTime={createdAt}>{date}</time>
                        </PostDate>
                        {post.isEdited && (
                            <PageBlock
                                role="button"
                                title="Edited post"
                                aria-label="Edited post"
                            >
                                <Pen color={COLORS.blue} size={22} />
                            </PageBlock>
                        )}
                        <Options
                            key={post.id}
                            title="Post options"
                            icon={<More />}
                            isOpen={activeOptions === post.id}
                            toggleOptions={() => handleOptionsClick(post.id)}
                            children={
                                <>
                                    {((me && post.authorId !== me.id) ||
                                        !me) && (
                                        <OptionComponent
                                            title="Report this post"
                                            onClick={() => {
                                                navigate(
                                                    `/report/post/${post.itemId}`,
                                                    {
                                                        state: {
                                                            backgroundLocation:
                                                                location,
                                                        },
                                                    }
                                                );
                                            }}
                                            icon={<Flag />}
                                            text="Report this post"
                                        />
                                    )}
                                    {me && (
                                        <>
                                            {post.authorId === me.id ? (
                                                <>
                                                    <OptionComponent
                                                        title="Edit this post"
                                                        onClick={() => {
                                                            navigate(
                                                                `/edit_post/${post.itemId}`,
                                                                {
                                                                    state: {
                                                                        backgroundLocation:
                                                                            location,
                                                                    },
                                                                }
                                                            );
                                                        }}
                                                        icon={<Pen />}
                                                        text="Edit this post"
                                                    />
                                                    <OptionComponent
                                                        title="Delete this post"
                                                        onClick={async () => {
                                                            const response =
                                                                await handleDeletePost(
                                                                    post.itemId,
                                                                    post.id,
                                                                    post.type ===
                                                                        POST_TYPES.COMMENT,
                                                                    post.isReplyToId,
                                                                    post.isReplyToType
                                                                );

                                                            addToast(
                                                                response.status
                                                            );
                                                        }}
                                                        icon={
                                                            <Bin
                                                                color={
                                                                    COLORS.red
                                                                }
                                                            />
                                                        }
                                                        text="Delete this post"
                                                        isRed
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    {!blockedByMe &&
                                                        !blockedMe && (
                                                            <OptionComponent
                                                                title={`${
                                                                    follow
                                                                        ? "Unfollow"
                                                                        : "Follow"
                                                                } @${
                                                                    post.author
                                                                        .username
                                                                }`}
                                                                onClick={async () => {
                                                                    const response =
                                                                        await handleFollowUser(
                                                                            post.author,
                                                                            origin,
                                                                            follow
                                                                                ? true
                                                                                : false
                                                                        );

                                                                    addToast(
                                                                        response
                                                                    );
                                                                }}
                                                                icon={
                                                                    <FollowIcon
                                                                        isActive={
                                                                            follow
                                                                                ? true
                                                                                : false
                                                                        }
                                                                    />
                                                                }
                                                                text={`${
                                                                    follow
                                                                        ? "Unfollow"
                                                                        : "Follow"
                                                                } 
                                                                @
                                                                ${
                                                                    post.author
                                                                        .username
                                                                }`}
                                                            />
                                                        )}
                                                    {!affiliation && (
                                                        <OptionComponent
                                                            title={`${
                                                                blockedByMe
                                                                    ? "Unblock"
                                                                    : "Block"
                                                            } ${
                                                                post.author
                                                                    .username
                                                            }`}
                                                            onClick={async () => {
                                                                const response =
                                                                    await handleBlockUser(
                                                                        post.authorId,
                                                                        post
                                                                            .author
                                                                            .username,
                                                                        origin,
                                                                        blockedByMe
                                                                            ? true
                                                                            : false
                                                                    );

                                                                addToast(
                                                                    response
                                                                );
                                                            }}
                                                            icon={<Block />}
                                                            text={`${
                                                                blockedByMe
                                                                    ? "Unblock"
                                                                    : "Block"
                                                            } @${
                                                                post.author
                                                                    .username
                                                            }`}
                                                        />
                                                    )}
                                                    {mentions.includes(
                                                        me.username
                                                    ) && (
                                                        <OptionComponent
                                                            title="Unmention yourself"
                                                            onClick={async () => {
                                                                const response =
                                                                    await handleRevokeMention(
                                                                        post.itemId
                                                                    );

                                                                addToast(
                                                                    response
                                                                );
                                                            }}
                                                            icon={<Unmention />}
                                                            text="Unmention yourself"
                                                        />
                                                    )}
                                                </>
                                            )}
                                        </>
                                    )}
                                </>
                            }
                        />
                    </RightContainer>
                </PostHeader>
                <PostContentContainer>
                    <PostTextContainer>
                        <TextContainerRender
                            content={post.content}
                            mentions={mentions}
                        />
                    </PostTextContainer>
                    {post.media && post.media.length > 0 && (
                        <PostMediaContainer>
                            {post.media.map((media) => (
                                <PostMediaItem key={media.id}>
                                    {media.type.includes("image") ? (
                                        <img src={media.src} alt={media.alt} loading="lazy" decoding="async" />
                                    ) : (
                                        <video
                                            controls
                                            src={
                                                media.src
                                            }
                                            muted
                                            playsInline
                                            preload="metadata"
                                        />
                                    )}
                                </PostMediaItem>
                            ))}
                        </PostMediaContainer>
                    )}
                    {post.quotedPostId && (
                        <>
                            {loading || error ? (
                                <>
                                    {error ? (
                                        <PageText>
                                            An error occurred while trying to
                                            load the quoted post.
                                        </PageText>
                                    ) : (
                                        <LoadingComponent />
                                    )}
                                </>
                            ) : (
                                <>
                                    {quotedPost ? (
                                        <QuotedPost
                                            post={quotedPost as Post}
                                            origin="feed"
                                        />
                                    ) : (
                                        <QuotedPostNotAvailable>
                                            The quoted post is not available.
                                        </QuotedPostNotAvailable>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </PostContentContainer>
                <PostActionsContainer>
                    <PostActionContainer
                        type="button"
                        title={`${like ? "Remove like from" : "Like"} @${
                            post.author.username
                        }'s post`}
                        aria-label={`${like ? "Remove like from" : "Like"} @${
                            post.author.username
                        }'s post`}
                        color={COLORS.red}
                        disabled={blockedMe && !like ? true : false}
                        onClick={async (e) => {
                            e.stopPropagation();

                            if (me) {
                                const response = await handleLikePost(
                                    post.itemId,
                                    post.type,
                                    like ? true : false,
                                    origin,
                                    false
                                );

                                if (!response) {
                                    addToast(
                                        `An error occurred while trying to ${
                                            like
                                                ? "remove the like from"
                                                : "like"
                                        } this post.`
                                    );
                                }
                            } else {
                                addToast("You're not authenticated.");
                            }
                        }}
                        isActive={like ? true : false}
                    >
                        <ControlContainer size={32}>
                            <LikeIcon isActive={like ? true : false} />
                        </ControlContainer>
                        <PostActionInfo>
                            {formatter.format(likes)}
                        </PostActionInfo>
                    </PostActionContainer>
                    <PostActionContainer
                        type="button"
                        aria-label={"Repost options"}
                        title={"Repost options"}
                        color={COLORS.green}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        isActive={repost ? true : false}
                        disabled={blockedMe && !repost ? true : false}
                    >
                        <Options
                            key={`repost-options-${post.id}`}
                            title="Repost options"
                            icon={
                                <RepostIcon
                                    size={22}
                                    isActive={repost ? true : false}
                                />
                            }
                            isOpen={activeOptions === -2}
                            toggleOptions={() => {
                                if (me) {
                                    handleOptionsClick(-2);
                                } else {
                                    addToast("You're not authenticated.");
                                }
                            }}
                            size={32}
                            mirrored={true}
                            children={
                                <>
                                    <OptionComponent
                                        title={
                                            repost
                                                ? "Remove repost"
                                                : "Repost this post"
                                        }
                                        onClick={async (e) => {
                                            if (!blockedMe) {
                                                e.stopPropagation();
                                            }

                                            if (me) {
                                                const response =
                                                    await handleRepost(
                                                        post.itemId,
                                                        post.id,
                                                        repost
                                                    );

                                                if (!response) {
                                                    addToast(
                                                        `An error occurred while trying to ${
                                                            repost
                                                                ? "remove the repost from"
                                                                : "repost"
                                                        } this post.`
                                                    );
                                                }
                                            } else {
                                                addToast(
                                                    "You're not authenticated."
                                                );
                                            }
                                        }}
                                        icon={<RepostIcon size={24} />}
                                        text={
                                            repost
                                                ? "Remove repost"
                                                : "Repost this post"
                                        }
                                    />
                                    {!blockedMe && (
                                        <OptionComponent
                                            title="Quote this post"
                                            onClick={() => {
                                                navigate(
                                                    `/create_post/quote/post/${post.itemId}`,
                                                    {
                                                        state: {
                                                            backgroundLocation:
                                                                location,
                                                        },
                                                    }
                                                );
                                            }}
                                            icon={<Pen />}
                                            text="Quote this post"
                                        />
                                    )}
                                </>
                            }
                        />
                        <PostActionInfo>
                            {formatter.format(reposts)}
                        </PostActionInfo>
                    </PostActionContainer>
                    <PostActionContainer
                        type="button"
                        aria-label={"Comment this post"}
                        title={"Comment this post"}
                        disabled={blockedMe ? true : false}
                        onClick={(e) => {
                            e.stopPropagation();

                            if (me) {
                                navigate(
                                    `/create_post/reply/post/${post.itemId}`,
                                    {
                                        state: {
                                            backgroundLocation: location,
                                        },
                                    }
                                );
                            } else {
                                addToast("You're not authenticated.");
                            }
                        }}
                    >
                        <ControlContainer size={32}>
                            <Comment />
                        </ControlContainer>
                        <PostActionInfo>
                            {formatter.format(comments)}
                        </PostActionInfo>
                    </PostActionContainer>
                    <PostActionContainer
                        type="button"
                        aria-label={"Post views"}
                        title={"Post views"}
                        disabled={blockedMe ? true : false}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <ControlContainer size={32}>
                            <Views />
                        </ControlContainer>
                        <PostActionInfo>
                            {formatter.format(views)}
                        </PostActionInfo>
                    </PostActionContainer>
                    <PostActionsGroup>
                        <PostActionContainer
                            type="button"
                            aria-label={
                                bookmark
                                    ? "Remove the bookmark from this post"
                                    : "Bookmark this post"
                            }
                            title={
                                bookmark
                                    ? "Remove the bookmark from this post"
                                    : "Bookmark this post"
                            }
                            disabled={blockedMe && !bookmark ? true : false}
                            onClick={async (e) => {
                                e.stopPropagation();

                                if (me) {
                                    const response = await handleBookmark(
                                        post.itemId,
                                        post.type,
                                        post.id,
                                        origin,
                                        bookmark ? true : false
                                    );

                                    if (!response) {
                                        addToast(
                                            `An error occurred while trying to ${
                                                bookmark
                                                    ? "remove the bookmark from"
                                                    : "bookmark"
                                            } this post.`
                                        );
                                    }
                                } else {
                                    addToast("You're not authenticated.");
                                }
                            }}
                        >
                            <ControlContainer size={32}>
                                <BookmarkIcon
                                    isActive={bookmark ? true : false}
                                />
                            </ControlContainer>
                        </PostActionContainer>
                        <PostActionContainer
                            type="button"
                            aria-label={"Share options"}
                            title={"Share options"}
                            disabled={blockedMe ? true : false}
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                        >
                            <Options
                                key={`share-options-${post.id}`}
                                title="Share options"
                                icon={<Share />}
                                isOpen={activeOptions === -1}
                                toggleOptions={() => handleOptionsClick(-1)}
                                size={32}
                                children={
                                    <>
                                        <OptionComponent
                                            title="Copy link to this post"
                                            onClick={() => {
                                                const currentUrl = `${window.location.origin}/${post.author.username}/post/${post.itemId}`;

                                                const response =
                                                    copy(currentUrl);

                                                if (response) {
                                                    addToast(
                                                        "Link copied to clipboard."
                                                    );
                                                } else {
                                                    addToast(
                                                        "Failed to copy link."
                                                    );
                                                }
                                            }}
                                            icon={<Chain />}
                                            text="Copy link to this post"
                                        />
                                        {me && (
                                            <OptionComponent
                                                title="Send this post"
                                                onClick={() => {}}
                                                icon={<Mail type="options" />}
                                                text="Send this post"
                                            />
                                        )}
                                    </>
                                }
                            />
                        </PostActionContainer>
                    </PostActionsGroup>
                </PostActionsContainer>
            </PostContainer>
        </PostWrapper>
    );
};

export default PostComponent;
