import { FunctionComponent, useEffect, useMemo, useRef, useState } from "react";
import {
    Post,
    useIncrementPostViewsMutation,
} from "../../../../generated/graphql";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    ControlContainer,
    PageBlock,
    PageText,
} from "../../../../styles/global";
import profilePicture from "../../../../images/profile-picture.png";
import TextContainerRender from "../../../utils/TextContainerRender";
import { USER_TYPES } from "../../../../utils/constants";
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
import { useHasThisUserAsAffiliate, useFollowData, useHasBlockedMeData, useIsUserBlockedData, useMeData } from "../../../../utils/userQueries";
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
    useFindPostById,
    useLikeData,
    usePostLikes,
    useRepostData,
    useReposts,
} from "../../../../utils/postQueries";
import QuotedPost from "./QuotedPost";
import LoadingComponent from "../../../utils/LoadingComponent";
import AffiliationIcon from "../../../utils/AffiliationIcon";
import BookmarkIcon from "../../../icons/Bookmark";
import Block from "../../../icons/Block";
import OptionComponent from "../../options/OptionComponent";
import { usePostMutations } from "../../../../utils/postMutations";
import { useUserMutations } from "../../../../utils/userMutations";

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

const PostHeader = styled.div`
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

const PostAuthorContainer = styled(Link)`
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

export const AuthorImageContainer = styled.div.attrs(
    (props: { type: string }) => props
)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: ${(props) =>
        props.type === USER_TYPES.ORGANIZATION ? "5px" : "20px"};

    img {
        width: inherit;
        height: inherit;
        border-radius: inherit;
    }
`;

export const AuthorInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: auto;
    flex: 1;
    overflow: hidden;
`;

export const AuthorFullNameContainer = styled.div`
    display: flex;
    align-items: center;
    width: auto;
    flex: 1;
    overflow: hidden;
    text-overflow: clip;
    gap: 8px;
`;

const AuthorFullName = styled(PageText)`
    font-weight: 700;
    font-size: 16px;
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-decoration: none;
    color: ${({ theme }) => theme.color};

    &:hover,
    &:active {
        text-decoration: underline;
        text-decoration-color: ${({ theme }) => theme.color};
    }
`;

export const AuthorUsername = styled(PageText)`
    font-size: 14px;
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: ${({ theme }) => theme.inputText};
`;

export const PostRightContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;
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

const PostContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-top: 10px;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 10px;
`;

const PostTextContainer = styled.div`
    display: block;
    font-size: 22px;
`;

const PostMediaContainer = styled.div`
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

const PostActionsContainer = styled.div`
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

const PostActionsGroup = styled.div`
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

const PostActionInfo = styled(PageText)`
    font-size: 14px;
    color: inherit;
    background-color: transparent;
`;

const QuotedPostNotAvailable = styled.div`
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

    const createdAt = useMemo(
        () => getDateToLocaleString(post.createdAt),
        [post.createdAt]
    );

    const { me } = useMeData();

    const location = useLocation();

    const postRef = useRef<HTMLDivElement>(null);
    const [incrementPostViews] = useIncrementPostViewsMutation();

    const [views, setViews] = useState(post.views);

    useEffect(() => {
        let postDivRef = postRef.current;

        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.5,
        };

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                incrementPostViews({
                    variables: {
                        itemId: post.itemId,
                        type: post.type,
                        itemOpened: false,
                        origin,
                    },
                }).then((response) => {
                    if (response.data && response.data.incrementPostViews) {
                        setViews(response.data.incrementPostViews.views);
                    }
                });
            }
        }, options);

        if (postDivRef) {
            observer.observe(postDivRef);
        }

        return () => {
            if (postDivRef) {
                observer.unobserve(postDivRef);
            }

            postDivRef = null;
        };
    }, [incrementPostViews, post, origin]);

    const isPostLikedByMe = useLikeData(post.itemId, post.type);

    const like = useMemo(() => isPostLikedByMe, [isPostLikedByMe]);

    const { postLikes } = usePostLikes(post.itemId, post.type);

    const likes = useMemo(() => {
        if (postLikes && postLikes.totalCount) {
            return postLikes.totalCount;
        } else {
            return 0;
        }
    }, [postLikes]);

    const { postComments } = useComments(post.id, post.type);

    const comments = useMemo(() => {
        if (postComments && postComments.totalCount) {
            return postComments.totalCount;
        } else {
            return 0;
        }
    }, [postComments]);

    const { addToast } = useToasts();

    const isRepostedByUser = useRepostData(post.id, me ? me.id : null);

    const repost = useMemo(() => {
        if (isRepostedByUser) {
            return isRepostedByUser;
        } else {
            return null;
        }
    }, [isRepostedByUser]);

    const { userReposts } = useReposts(post.id);

    const reposts = useMemo(() => {
        if (userReposts && userReposts.totalCount) {
            return userReposts.totalCount;
        } else {
            return 0;
        }
    }, [userReposts]);

    const {
        post: quotedPost,
        loading,
        error,
    } = useFindPostById(post.quotedPostId as number | undefined);

    const isFollowedByMe = useFollowData(post.authorId);

    const follow = useMemo(() => {
        if (isFollowedByMe) {
            return isFollowedByMe;
        } else {
            return null;
        }
    }, [isFollowedByMe]);

    const isBookmarked = useBookmarkData(post.id, post.type);

    const bookmark = useMemo(() => {
        if (isBookmarked) {
            return isBookmarked;
        } else {
            return null;
        }
    }, [isBookmarked]);

    const isBlockedByMe = useIsUserBlockedData(post.authorId);

    const blockedByMe = useMemo(() => {
        if (isBlockedByMe) {
            return isBlockedByMe;
        } else {
            return null;
        }
    }, [isBlockedByMe]);

    const hasBlockedMe = useHasBlockedMeData(post.authorId);

    const blockedMe = useMemo(() => {
        if (hasBlockedMe) {
            return hasBlockedMe;
        } else {
            return null;
        }
    }, [hasBlockedMe]);

    const isAffiliatedToMe = useHasThisUserAsAffiliate(me ? me.id : null, post.authorId);
    const isAffiliatedToAuthor = useHasThisUserAsAffiliate(post.authorId, me ? me.id : null);

    const affiliation = useMemo(() => {
        return isAffiliatedToMe || isAffiliatedToAuthor;
    }, [isAffiliatedToMe, isAffiliatedToAuthor]);

    const { handleDeletePost, handleLikePost, handleRepost, handleBookmark } = usePostMutations();

    const { handleFollowUser, handleBlockUser } = useUserMutations();

    return (
        <PostWrapper>
            <PostContainer
                role="link"
                tabIndex={0}
                ref={postRef}
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
                        <AuthorImageContainer type={post.author.type}>
                            <img
                                src={
                                    post.author.profile.profilePicture.length >
                                    0
                                        ? post.author.profile.profilePicture
                                        : profilePicture
                                }
                                title={`${post.author.name}'s profile picture`}
                                alt={post.author.name}
                            />
                        </AuthorImageContainer>
                        <AuthorInfo>
                            <AuthorFullNameContainer>
                                <AuthorFullName>
                                    {post.author.name}
                                </AuthorFullName>
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
                            </AuthorFullNameContainer>
                            <AuthorUsername>
                                @{post.author.username}
                            </AuthorUsername>
                        </AuthorInfo>
                    </PostAuthorContainer>
                    <PostRightContainer>
                        <PostDate title={createdAt} aria-label={createdAt}>
                            <time dateTime={createdAt}>{date}</time>
                        </PostDate>
                        {post.isEdited && (
                            <PageBlock
                                role="button"
                                title="Edited post"
                                aria-label="Edited post"
                            >
                                <Pen color={COLORS.blue} />
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
                                                            const status = await handleDeletePost(post.itemId, post.id);

                                                            addToast(status);
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
                                                    {(!blockedByMe && !hasBlockedMe) && (
                                                        <OptionComponent
                                                            title={`${
                                                                follow
                                                                    ? "Unfollow"
                                                                    : "Follow"
                                                            } @${
                                                                post.author.username
                                                            }`}
                                                            onClick={async () => {
                                                                const response = await handleFollowUser(post.authorId, post.author.username, origin, follow ? true : false)
                                                            
                                                                addToast(response);
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
                                                            text={`${follow
                                                                    ? "Unfollow"
                                                                    : "Follow"} 
                                                                @
                                                                ${
                                                                    post.author
                                                                        .username
                                                                }`}
                                                        />
                                                    )}
                                                    {!affiliation && (
                                                        <OptionComponent
                                                            title={`${blockedByMe ? "Unblock" : "Block"} ${post.author.username}`}
                                                            onClick={async () => {
                                                                const response = await handleBlockUser(post.authorId, post.author.username, origin, blockedByMe ? true : false)
                                                            
                                                                addToast(response);
                                                            }}
                                                            icon={<Block />}
                                                            text={`${blockedByMe ? "Unblock" : "Block"} @${post.author.username}`}
                                                        />
                                                    )}
                                                </>
                                            )}
                                        </>
                                    )}
                                </>
                            }
                        />
                    </PostRightContainer>
                </PostHeader>
                <PostContentContainer>
                    <PostTextContainer>
                        <TextContainerRender
                            content={post.content}
                            mentions={post.mentions}
                        />
                    </PostTextContainer>
                    {post.media && post.media.length > 0 && (
                        <PostMediaContainer>
                            {post.media.map((media) => (
                                <PostMediaItem key={media.id}>
                                    {media.type.includes("image") ? (
                                        <img src={media.src} alt={media.alt} />
                                    ) : (
                                        <video controls>
                                            <source
                                                src={media.src}
                                                type={media.type}
                                            />
                                        </video>
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
                        disabled={(blockedMe && !like) ? true : false}
                        onClick={async (e) => {
                            e.stopPropagation();

                            if (me) {
                                const response = await handleLikePost(post.itemId, post.type, like ? true : false, origin, false);

                                if (!response) {
                                    addToast(`An error occurred while trying to ${like ? "remove the like from" : "like"} this post.`);
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
                        disabled={(blockedMe && !repost) ? true : false}
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
                            toggleOptions={() => handleOptionsClick(-2)}
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
                                                const response = await handleRepost(post.itemId, post.id, repost);

                                                if (!response) {
                                                    addToast(`An error occurred while trying to ${repost ? "remove the repost from" : "repost"} this post.`);
                                                }
                                            } else {
                                                addToast("You're not authenticated.");
                                            }
                                        }}
                                        icon={<RepostIcon size={24} />}
                                        text={repost ? "Remove repost" : "Repost this post"}
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

                            navigate(`/create_post/reply/post/${post.itemId}`, {
                                state: {
                                    backgroundLocation: location,
                                },
                            });
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
                            disabled={(blockedMe && !bookmark) ? true : false}
                            onClick={async (e) => {
                                e.stopPropagation();

                                if (me) {
                                    const response = await handleBookmark(post.itemId, post.type, post.id, origin, bookmark ? true : false);

                                    if (!response) {
                                        addToast(`An error occurred while trying to ${bookmark ? "remove the bookmark from" : "bookmark"} this post.`);
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
                                        <OptionComponent
                                            title="Send this post"
                                            onClick={() => {}}
                                            icon={<Mail type="options" />}
                                            text="Send this post"
                                        />
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
