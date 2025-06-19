import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Head from "../../components/Head";
import { useBookmarkData, useComments, useFindPost, useFindPostById, useLikeData, usePostLikes, useRepostData, useReposts } from "../../utils/postQueries";
import { truncateString } from "../../utils/truncateString";
import PageLayout from "../../components/layouts/PageLayout";
import PageContentLayout from "../../components/layouts/sublayouts/PageContentLayout";
import LoadingComponent from "../../components/utils/LoadingComponent";
import ErrorOrItemNotFound from "../../components/utils/ErrorOrItemNotFound";
import { ERROR_SOMETHING_WENT_WRONG } from "../../utils/constants";
import styled from "styled-components";
import PostComponent, { AuthorFullName, AuthorFullNameContainer, AuthorInfo, AuthorUsername, PostActionInfo, PostActionsContainer, PostActionsGroup, PostAuthorContainer, PostContentContainer, PostDate, PostHeader, PostMediaContainer, PostMediaItem, PostTextContainer, QuotedPostNotAvailable } from "../../components/layouts/items/post/PostComponent";
import ProfilePicture from "../../components/utils/ProfilePicture";
import VerificationBadge from "../../components/utils/VerificationBadge";
import AffiliationIcon from "../../components/utils/AffiliationIcon";
import Options from "../../components/layouts/options/Options";
import More from "../../components/icons/More";
import { useOptions } from "../../components/utils/hooks";
import { useFollowData, useHasBlockedMeData, useHasThisUserAsAffiliate, useIsUserBlockedData, useMeData } from "../../utils/userQueries";
import OptionComponent from "../../components/layouts/options/OptionComponent";
import Flag from "../../components/icons/Flag";
import Pen from "../../components/icons/Pen";
import { useToasts } from "../../components/utils/ToastProvider";
import Bin from "../../components/icons/Bin";
import { COLORS } from "../../styles/colors";
import { usePostMutations } from "../../utils/postMutations";
import { useUserMutations } from "../../utils/userMutations";
import { useCallback, useMemo } from "react";
import FollowIcon from "../../components/icons/FollowIcon";
import Block from "../../components/icons/Block";
import Unmention from "../../components/icons/Unmention";
import TextContainerRender from "../../components/utils/TextContainerRender";
import { ButtonControlContainer, FeedWithLumenInput, FullWidthFeedContainer, OptionBaseIcon, PageText, SignUpOrLogInText } from "../../styles/global";
import QuotedPost from "../../components/layouts/items/post/QuotedPost";
import { Post } from "../../generated/graphql";
import { formatter } from "../../utils/formatter";
import LikeIcon from "../../components/icons/Like";
import RepostIcon from "../../components/icons/Repost";
import BookmarkIcon from "../../components/icons/Bookmark";
import Share from "../../components/icons/Share";
import copy from "copy-to-clipboard";
import Chain from "../../components/icons/Chain";
import Mail from "../../components/icons/Mail";
import LumenInput from "../../components/input/lumen/LumenInput";
import FeedComponent from "../../components/utils/FeedComponent";
import { getDateToLocaleString, processDate } from "../../utils/processDate";

const PostPageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 12px;
    padding-bottom: 36px;
`;

const PostPageContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const PostPageActionsContainer = styled(PostActionsContainer)`
    border-top: 1px solid ${({ theme }) => theme.inputText};
    border-bottom: 1px solid ${({ theme }) => theme.inputText};
    margin-top: 12px;
    margin-bottom: 12px;
    padding-top: 12px;
    padding-bottom: 12px;
`;

const PostPageActionContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
`;

const PostPageActionInfo = styled(PostActionInfo)`
    font-size: 16px;
    text-decoration: none;
    cursor: pointer;

    &:hover, &:focus {
        text-decoration: underline;
    }
`;

const PostPageControlContainer = styled(ButtonControlContainer).attrs(
    (props: { color?: string }) => props
)`
    &:hover div svg,
    &:focus div svg {
        fill: ${(props) => props.color || COLORS.blue};
    }
`;

const PostPageControlWrapper = styled.div.attrs(
    (props: { color?: string }) => props
)`
    display: block;

    &:hover div div div svg,
    &:focus div div div svg {
        fill: ${(props) => props.color || COLORS.blue};
    }
`;

const PostInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 16px;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 10px;
    padding-bottom: 10px;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
`;

const PostPageInfoItem = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const PostPageInfoText = styled(PageText)`
    font-size: 16px;
`;

const PostPageDate = styled(PostDate)`
    font-size: 16px;
`;

const PostPageEditedStatus = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const PostPageEditedStatusText = styled(PostPageInfoText)`
    color: ${COLORS.blue};
    font-weight: 500;
`;

function PostPage() {
    const params = useParams();

    const { post, loading, error } = useFindPost(params.itemId as string);

    const { activeOptions, handleOptionsClick } = useOptions();

    const { me, loading: meLoading } = useMeData();

    const navigate = useNavigate();
    const location = useLocation();

    const { addToast } = useToasts();

    const { handleDeletePost, handleRevokeMention, handleLikePost, handleRepost, handleBookmark } = usePostMutations();

    const { handleFollowUser, handleBlockUser } = useUserMutations();

    const isFollowedByMe = useFollowData(post?.authorId);
    
    const follow = useMemo(() => isFollowedByMe, [isFollowedByMe]);
    
    const isBlockedByMe = useIsUserBlockedData(post?.authorId);
    
    const blockedByMe = useMemo(() => isBlockedByMe, [isBlockedByMe]);

    const hasBlockedMe = useHasBlockedMeData(post?.authorId);

    const blockedMe = useMemo(() => hasBlockedMe, [hasBlockedMe]);

    const isAffiliatedToMe = useHasThisUserAsAffiliate(me?.id, post?.authorId);
    const isAffiliatedToAuthor = useHasThisUserAsAffiliate(post?.authorId, me?.id);

    const affiliation = useMemo(() => {
        return isAffiliatedToMe || isAffiliatedToAuthor;
    }, [isAffiliatedToMe, isAffiliatedToAuthor]);

    const {
        post: quotedPost,
        loading: quotedPostLoading,
        error: quotedPostError,
    } = useFindPostById(post?.quotedPostId);

    const isPostLikedByMe = useLikeData(post?.itemId || "", post?.type || "");
    
    const like = useMemo(() => isPostLikedByMe, [isPostLikedByMe]);

    const { postLikes } = usePostLikes(post?.itemId || "", post?.type || "");

    const likes = postLikes?.totalCount || 0;

    const isRepostedByUser = useRepostData(post?.id, me?.id);
    
    const repost = useMemo(() => isRepostedByUser, [isRepostedByUser]);

    const { userReposts } = useReposts(post?.id);

    const reposts = userReposts?.totalCount || 0;

    const isBookmarked = useBookmarkData(post?.type || "", post?.id);
    
    const bookmark = useMemo(() => isBookmarked, [isBookmarked]);
    
    const { postComments, loading: postCommentsLoading, error: postCommentsError, fetchMore } = useComments(post?.type || "", post?.id);

    const loadMore = useCallback(() => {
        if (!postComments || (postComments && !postComments.hasMore) || postCommentsLoading) return;

        const lastPost = postComments.posts[postComments.posts.length - 1];

        fetchMore({
            variables: { id: post?.id, type: post?.type, limit: 3, cursor: lastPost.createdAt },
        })
        .catch((error) => {
            console.error(error);
        });
    }, [postComments, fetchMore, postCommentsLoading, post?.id, post?.type]);

    const origin = "post-page";

    const feedContent = useMemo(() => (
        <>
            {postComments?.posts.map(
                (post) => (
                    <PostComponent
                        key={
                            post.itemId
                        }
                        post={
                            post as Post
                        }
                        origin="post-comments"
                    />
                )
            )}
        </>
    ), [postComments?.posts]);

    const createdAt = getDateToLocaleString(post?.createdAt as string);

    const comments = postComments?.totalCount || 0;

    const date = useMemo(
        () => processDate(post?.updatedAt as string, true, false),
        [post?.updatedAt]
    );

    return (
        <>
            <Head
                title={
                    loading
                        ? "Loading... | Zenith"
                        : post
                        ? `@${post.author.username} on Zenith: ${truncateString(
                              post.content,
                              60
                          )} | Zenith`
                        : "Post not found | Zenith"
                }
                description={
                    loading
                        ? "Content not ready. Loading..."
                        : post
                        ? `${post.author.name} on Zenith: ${post.content} | Zenith`
                        : "Post not found."
                }
                image={
                    post && post.author.profile.profilePicture.length > 0
                        ? post.author.profile.profilePicture
                        : undefined
                }
            />
            <PageLayout
                children={
                    <PageContentLayout
                        title="Post"
                        type="default"
                        children={
                            <>
                                {loading || meLoading ? (
                                    <LoadingComponent />
                                ) : (
                                    <>
                                        {error ? (
                                            <ErrorOrItemNotFound
                                                isError={true}
                                                title={ERROR_SOMETHING_WENT_WRONG.title}
                                                content={ERROR_SOMETHING_WENT_WRONG.message}
                                            />
                                        ) : !post ? (
                                            <ErrorOrItemNotFound
                                                isError={false}
                                                title="Post not found"
                                                content="The post you are looking for does not exist."
                                            />
                                        ) : (
                                            <PostPageWrapper>
                                                <PostPageContainer>
                                                    <PostHeader>
                                                        <PostAuthorContainer
                                                            role="link"
                                                            aria-label={`${post.author.name}'s profile`}
                                                            title={`${post.author.name}'s profile`}
                                                            to={`/${post.author.username}`}
                                                        >
                                                            <ProfilePicture
                                                                loading={false}
                                                                pictureUrl={post.author.profile.profilePicture}
                                                                type={post.author.type}
                                                                size={40}
                                                                title={post.author.name}
                                                            />
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
                                                                                            const response = await handleDeletePost(post.itemId, post.id);

                                                                                            addToast(response.status);

                                                                                            if (response.ok) {
                                                                                                navigate(-1);
                                                                                            }
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
                                                                                    {(!blockedByMe && !blockedMe) && (
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
                                                                                    {post.mentions.includes(me.username) && (
                                                                                        <OptionComponent
                                                                                            title="Unmention yourself"
                                                                                            onClick={async () => {
                                                                                                const response = await handleRevokeMention(post.itemId, post.id);

                                                                                                addToast(response);
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
                                                                {quotedPostLoading || quotedPostError ? (
                                                                    <>
                                                                        {quotedPostError ? (
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
                                                    <PostInfoContainer>
                                                        <PostPageInfoItem>
                                                            <PostPageDate title={createdAt} aria-label={createdAt}>
                                                                <time dateTime={createdAt}>{createdAt}</time>
                                                            </PostPageDate>
                                                        </PostPageInfoItem>
                                                        <PostPageInfoItem>
                                                            <PostPageInfoText>
                                                                <b>{formatter.format(post.views)}</b>{" "}{post.views === 1 ? "view" : "views"}
                                                            </PostPageInfoText>
                                                            <PostPageInfoText>
                                                                ⋅
                                                            </PostPageInfoText>
                                                            <PostPageInfoText>
                                                                <b>{formatter.format(comments)}</b>{" "}{comments === 1 ? "comment" : "comments"}
                                                            </PostPageInfoText>
                                                            {post.isEdited && (
                                                                <>
                                                                    <PostPageInfoText>
                                                                        ⋅
                                                                    </PostPageInfoText>
                                                                    <PostPageEditedStatus>
                                                                        <OptionBaseIcon>
                                                                            <Pen color={COLORS.blue} />
                                                                        </OptionBaseIcon>
                                                                        <PostPageEditedStatusText>
                                                                            {date}
                                                                        </PostPageEditedStatusText>
                                                                    </PostPageEditedStatus>  
                                                                </>
                                                            )}
                                                        </PostPageInfoItem>
                                                    </PostInfoContainer>
                                                    <PostPageActionsContainer>
                                                        <PostPageActionContainer>
                                                            <PostPageControlContainer
                                                                type="button"
                                                                title={`${like ? "Remove like from" : "Like"} @${
                                                                    post.author.username
                                                                }'s post`}
                                                                aria-label={`${like ? "Remove like from" : "Like"} @${
                                                                    post.author.username
                                                                }'s post`}
                                                                color={COLORS.red}
                                                                disabled={(blockedMe && !like) ? true : false}
                                                                onClick={async () => {
                                                                    if (me) {
                                                                        const response = await handleLikePost(post.itemId, post.type, like ? true : false, origin, false);
                                        
                                                                        if (!response) {
                                                                            addToast(`An error occurred while trying to ${like ? "remove the like from" : "like"} this post.`);
                                                                        }
                                                                    } else {
                                                                        addToast("You're not authenticated.");
                                                                    }
                                                                }}
                                                            >
                                                                <LikeIcon size={24} isActive={like ? true : false} />
                                                            </PostPageControlContainer>
                                                            <PostPageActionInfo
                                                                role="link"
                                                                title="See who liked this post"
                                                                aria-label="See who liked this post"
                                                                onClick={() => {
                                                                    if (blockedMe) {
                                                                        addToast("This user blocked you, so you can't see who liked this post.");
                                                                    } else if (!me) {
                                                                        addToast("You're not authenticated.");
                                                                    } else {
                                                                        navigate(
                                                                            `/${post.author.username}/post/${post.itemId}/likes`,
                                                                            {
                                                                                state: {
                                                                                    backgroundLocation:
                                                                                        location,
                                                                                },
                                                                            }
                                                                        );
                                                                    }
                                                                }}
                                                            >
                                                                {formatter.format(likes)}{" "}{likes === 1 ? "like" : "likes"}
                                                            </PostPageActionInfo>
                                                        </PostPageActionContainer>
                                                        <PostPageActionContainer>
                                                            <PostPageControlWrapper color={COLORS.green}>
                                                                <Options
                                                                    key={`repost-options-${post.id}`}
                                                                    title="Repost options"
                                                                    icon={
                                                                        <RepostIcon
                                                                            size={24}
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
                                                                    disabled={(blockedMe && !repost) ? true : false}
                                                                    mirrored={true}
                                                                    children={
                                                                        <>
                                                                            <OptionComponent
                                                                                title={
                                                                                    repost
                                                                                        ? "Remove repost"
                                                                                        : "Repost this post"
                                                                                }
                                                                                onClick={async () => {
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
                                                            </PostPageControlWrapper>
                                                            <PostPageActionInfo
                                                                role="link"
                                                                title="See who reposted this post"
                                                                aria-label="See who reposted this post"
                                                                onClick={() => {
                                                                    if (blockedMe) {
                                                                        addToast("This user has blocked you, so you can't see who reposted this post.");
                                                                    } else if (!me) {
                                                                        addToast("You're not authenticated.");
                                                                    } else {
                                                                        navigate(
                                                                            `/${post.author.username}/post/${post.itemId}/reposts`,
                                                                            {
                                                                                state: {
                                                                                    backgroundLocation:
                                                                                        location,
                                                                                },
                                                                            }
                                                                        );
                                                                    }
                                                                }}
                                                            >
                                                                {formatter.format(reposts)}{" "}{reposts === 1 ? "repost" : "reposts"}
                                                            </PostPageActionInfo>
                                                        </PostPageActionContainer>
                                                        <PostActionsGroup>
                                                            <PostPageActionContainer>
                                                                <PostPageControlContainer
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
                                                                    onClick={async () => {
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
                                                                    <BookmarkIcon
                                                                        isActive={bookmark ? true : false}
                                                                        size={24}
                                                                    />
                                                                </PostPageControlContainer>
                                                            </PostPageActionContainer>
                                                            <PostPageActionContainer>
                                                                <PostPageControlWrapper>
                                                                    <Options
                                                                        key={`share-options-${post.id}`}
                                                                        title="Share options"
                                                                        icon={<Share size={24} />}
                                                                        isOpen={activeOptions === -1}
                                                                        toggleOptions={() => handleOptionsClick(-1)}
                                                                        disabled={blockedMe ? true : false}
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
                                                                </PostPageControlWrapper>
                                                            </PostPageActionContainer>
                                                        </PostActionsGroup>
                                                    </PostPageActionsContainer>
                                                </PostPageContainer>
                                                <FeedWithLumenInput>
                                                    {me ? (
                                                        <LumenInput
                                                            type="comment"
                                                            placeholder={`Reply to @${post.author.username}`}
                                                            buttonText="Reply"
                                                            isReplyToId={post.id}
                                                            isReplyToType={post.type}
                                                        />
                                                    ) : (
                                                        <SignUpOrLogInText>
                                                            Get the full experience. <Link to="/login" title="Log in to Zenith" aria-label="Log in to Zenith">Log in</Link> or <Link to="/signup" title="Sign up to Zenith" aria-label="Sign up to Zenith">Sign up</Link> to Zenith.
                                                        </SignUpOrLogInText>
                                                    )}
                                                    <FullWidthFeedContainer>
                                                        <FeedComponent
                                                            key="post-comments"
                                                            feedContent={feedContent}
                                                            loading={postCommentsLoading}
                                                            error={postCommentsError}
                                                            loadMore={loadMore}
                                                            noElementsText="No one has replied to this post yet."
                                                            isFeedEmpty={postComments?.totalCount === 0}
                                                        />
                                                    </FullWidthFeedContainer>
                                                </FeedWithLumenInput>
                                            </PostPageWrapper>
                                        )}
                                    </>
                                )}
                            </>
                        }
                    />
                }
            />
        </>
    );
}

export default PostPage;
