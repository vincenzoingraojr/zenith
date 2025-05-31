import { FunctionComponent, useEffect, useRef, useState } from "react";
import { Like, Post, Repost, useCreateRepostMutation, useDeletePostMutation, useDeleteRepostMutation, useGetPostLikesQuery, useGetRepostsQuery, useIncrementPostViewsMutation, useIsPostLikedByMeQuery, useIsRepostedByUserQuery, useLikePostMutation, usePostCommentsQuery, User, useRemoveLikeMutation } from "../../../../generated/graphql";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ControlContainer, OptionBaseIcon, PageBlock, PageText } from "../../../../styles/global";
import profilePicture from "../../../../images/profile-picture.png";
import TextContainerRender from "../../../utils/TextContainerRender";
import { USER_TYPES } from "../../../../utils/constants";
import LikeIcon from "../../../icons/Like";
import { formatter } from "../../../../utils/formatter";
import { COLORS } from "../../../../styles/colors";
import Share from "../../../icons/Share";
import Views from "../../../icons/Views";
import Options, { OptionItem, OptionItemText } from "../../../Options";
import More from "../../../icons/More";
import { useOptions } from "../../../utils/hooks";
import Flag from "../../../icons/Flag";
import Comment from "../../../icons/Comment";
import { processDate } from "../../../../utils/processDate";
import Pen from "../../../icons/Pen";
import { useMeData } from "../../../../utils/userQueries";
import Bin from "../../../icons/Bin";
import FollowIcon from "../../../icons/FollowIcon";
import Chain from "../../../icons/Chain";
import copy from "copy-to-clipboard";
import { useToasts } from "../../../utils/ToastProvider";
import RepostIcon from "../../../icons/Repost";
import Mail from "../../../icons/Mail";
import VerificationBadge from "../../../utils/VerificationBadge";
import { useFindPostById } from "../../../../utils/postQueries";
import QuotedPost from "./QuotedPost";
import { gql } from "@apollo/client";

interface PostComponentProps {
    post: Post;
    showReplying?: boolean;
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

const PostContainer = styled.div.attrs((props: { isHovered: boolean }) => props)`
    display: flex;
    flex-direction: column;
    background-color: ${(props) => props.isHovered ? props.theme.overlayGrey : "transparent"};
    transition: 0.2s background-color ease;
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

export const AuthorImageContainer = styled.div.attrs((props: { type: string }) => props)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: ${(props) => (props.type === USER_TYPES.ORGANIZATION ? "5px" : "20px")};

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

    &:has(div:nth-child(3):last-child) div:nth-child(3), &:has(div:nth-child(1):only-child) div:nth-child(1) {
        grid-column: span 2;
    }
`;

export const PostMediaItem = styled.div`
    display: flex;
    width: 100%;
    height: auto;
    border-radius: 12px;

    img, video {
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
    gap: 16px;
    padding-top: 10px;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 10px;
`;

const PostActionContainer = styled.div.attrs((props: { color?: string, isActive: boolean }) => props)`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    color: ${props => props.isActive ? props.color || COLORS.blue : "inherit"};

    &:hover, &:focus {
        color: ${props => props.color || COLORS.blue};
    }

    &:hover div div svg, &:focus div div svg, &:hover div div div svg, &:focus div div div svg {
        fill: ${props => props.color || COLORS.blue};
    }

    &:hover ${ControlContainer}, &:focus ${ControlContainer} {
        background-color: ${({ theme }) => theme.overlayGrey};
    }
`;

const PostActionInfo = styled(PageText)`
    font-size: 14px;
    color: inherit;
    background-color: transparent;
`;

const PostComponent: FunctionComponent<PostComponentProps> = ({ post, showReplying, origin }) => {
    const navigate = useNavigate();
    const [like, setLike] = useState<Like | null>(null);
    const [follow, setFollow] = useState(false);

    const { activeOptions, handleOptionsClick } = useOptions();

    const date = processDate(post.createdAt, true, true);

    const createdAt = new Date(parseInt(post.createdAt)).toLocaleString(
        "en-us",
        {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }
    );

    const { me } = useMeData();

    const location = useLocation();

    const postRef = useRef<HTMLDivElement>(null);
    const [incrementPostViews] = useIncrementPostViewsMutation();

    useEffect(() => {
        let postDivRef = postRef.current;

        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0,
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

    const [likePost] = useLikePostMutation();
    const [removeLike] = useRemoveLikeMutation();

    const { data: likeData } = useIsPostLikedByMeQuery({
        fetchPolicy: "cache-and-network",
        variables: { itemId: post.itemId, type: post.type },
    });

    useEffect(() => {
        if (likeData) {
            setLike(likeData.isPostLikedByMe as Like | null);
        }

        return () => {
            setLike(null);
        }
    }, [likeData]);

    const { data: postLikesData } = useGetPostLikesQuery({
        fetchPolicy: "cache-and-network",
        variables: { itemId: post.itemId, type: post.type, limit: 3 },
    });

    const { data: commentsData } = usePostCommentsQuery({
        fetchPolicy: "cache-and-network",
        variables: { id: post.id, type: post.type, limit: 3 },
    });

    const { addToast } = useToasts();

    const [createRepost] = useCreateRepostMutation();
    const [deleteRepost] = useDeleteRepostMutation();

    const [repost, setRepost] = useState<Repost | null>(null);

    const { data: repostData } = useIsRepostedByUserQuery({
        fetchPolicy: "cache-and-network",
        variables: { postId: post.id, userId: me ? me.id : null },
    });

    useEffect(() => {
        if (repostData) {
            setRepost(repostData.isRepostedByUser as Repost | null);
        }

        return () => {
            setRepost(null);
        }
    }, [repostData]);

    const { data: repostsData } = useGetRepostsQuery({
        fetchPolicy: "cache-and-network",
        variables: { postId: post.id, limit: 3 },
    });

    const [deletePost, { client }] = useDeletePostMutation();

    const { post: quotedPost } = useFindPostById(post.quotedPostId as number | undefined);

    const [isParentHovered, setParentHovered] = useState(false);
    const [isChildHovered, setChildHovered] = useState(false);
    const shouldHighlightParent = isParentHovered && !isChildHovered;

    return (
        <PostWrapper>
            <PostContainer
                role="link"
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
                isHovered={shouldHighlightParent}
                onMouseEnter={() => setParentHovered(true)}
                onMouseLeave={() => setParentHovered(false)}
                onTouchStart={() => setParentHovered(true)}
                onTouchEnd={() => setParentHovered(false)}
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
                                    post.author.profile.profilePicture.length > 0
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
                                {post.author.verification.verified === "VERIFIED" && (
                                    <VerificationBadge
                                        type={post.author.type}
                                        verifiedSince={post.author.verification.verifiedSince ? new Date(parseInt(post.author.verification.verifiedSince)).toLocaleString("en-us", { month: "long", year: "numeric" }) : undefined}
                                        size={18}
                                    />
                                )}
                            </AuthorFullNameContainer>
                            <AuthorUsername>
                                @{post.author.username}
                            </AuthorUsername>
                        </AuthorInfo>
                    </PostAuthorContainer>
                    <PostRightContainer>
                        <PostDate title={createdAt} aria-label={createdAt}>
                            <time
                                dateTime={createdAt}
                            >
                                {date}
                            </time>
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
                            toggleOptions={() =>
                                handleOptionsClick(post.id)
                            }
                            children={
                                <>
                                    {((me && post.authorId !== me.id) || !me) && (
                                        <OptionItem
                                            role="menuitem"
                                            title="Report this post"
                                            aria-label="Report this post"
                                            onClick={() => {
                                                navigate(`/report/post/${post.itemId}`, {
                                                    state: {
                                                        backgroundLocation:
                                                            location,
                                                    },
                                                });
                                            }}
                                        >
                                            <OptionBaseIcon>
                                                <Flag />
                                            </OptionBaseIcon>
                                            <OptionItemText>
                                                Report this post
                                            </OptionItemText>
                                        </OptionItem>
                                    )}
                                    {me && (
                                        <>
                                            {post.authorId === me.id ? (
                                                <>
                                                    <OptionItem
                                                        role="menuitem"
                                                        title="Edit this post"
                                                        aria-label="Edit this post"
                                                        onClick={() => {
                                                            navigate(`/edit_post/${post.itemId}`, {
                                                                state: {
                                                                    backgroundLocation:
                                                                        location,
                                                                },
                                                            });
                                                        }}
                                                    >
                                                        <OptionBaseIcon>
                                                            <Pen />
                                                        </OptionBaseIcon>
                                                        <OptionItemText>
                                                            Edit this post
                                                        </OptionItemText>
                                                    </OptionItem>
                                                    <OptionItem
                                                        role="menuitem"
                                                        title="Delete this post"
                                                        aria-label="Delete this post"
                                                        onClick={async () => {
                                                            const response = await deletePost({
                                                                variables: {
                                                                    postId: post.itemId,
                                                                },
                                                            });

                                                            if (response.data && response.data.deletePost) {
                                                                const refId = `Post:${post.id}`;

                                                                client.cache.modify({
                                                                    fields: {
                                                                        postFeed(existing = { posts: [], hasMore: true }) {
                                                                            const filteredPosts = existing.posts.filter((p: any) =>
                                                                                p.__ref ? p.__ref !== refId : p.id !== post.id
                                                                            );

                                                                            return {
                                                                                hasMore: existing.hasMore,
                                                                                posts: filteredPosts,
                                                                                totalCount: existing.totalCount - 1,
                                                                            };
                                                                        },
                                                                    },
                                                                });

                                                                client.cache.evict({ id: refId });
                                                                client.cache.gc();
                                                            } else {
                                                                addToast("An error occurred while deleting the post.");
                                                            }
                                                        }}
                                                    >
                                                        <OptionBaseIcon>
                                                            <Bin color={COLORS.red} />
                                                        </OptionBaseIcon>
                                                        <OptionItemText isRed={true}>
                                                            Delete this post
                                                        </OptionItemText>
                                                    </OptionItem>
                                                </>
                                            ) : (
                                                <>
                                                    <OptionItem
                                                        role="menuitem"
                                                        title="Follow this user"
                                                        aria-label="Follow this user"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setFollow(!follow);
                                                        }}
                                                    >
                                                        <OptionBaseIcon>
                                                            <FollowIcon isActive={follow} />
                                                        </OptionBaseIcon>
                                                        <OptionItemText>
                                                            {follow ? "Unfollow" : "Follow"} @{post.author.username}
                                                        </OptionItemText>
                                                    </OptionItem>
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
                        <TextContainerRender content={post.content} mentions={post.mentions} />
                    </PostTextContainer>
                    {post.media && post.media.length > 0 && (
                        <PostMediaContainer>
                            {post.media.map((media) => (
                                <PostMediaItem key={media.id}>
                                    {media.type.includes("image") ? (
                                        <img src={media.src} alt={media.alt} />
                                    ) : (
                                        <video controls>
                                            <source src={media.src} type={media.type} />
                                        </video>
                                    )}
                                </PostMediaItem>
                            ))}
                        </PostMediaContainer>
                    )}
                    {quotedPost && (
                        <QuotedPost 
                            post={quotedPost as Post}
                            origin="feed"
                            isHovered={isChildHovered}
                            onMouseEnter={() => setChildHovered(true)}
                            onMouseLeave={() => setChildHovered(false)}
                        />
                    )}
                </PostContentContainer>
                <PostActionsContainer>
                    <PostActionContainer
                        role="button"
                        title={`${like ? "Remove like from" : "Like"} @${post.author.username}'s post`}
                        aria-label={`${like ? "Remove like from" : "Like"} @${post.author.username}'s post`}
                        color={COLORS.red}
                        onClick={async (e) => {
                            e.stopPropagation();
                            
                            if (me) {
                                if (like) {
                                    await removeLike({
                                        variables: {
                                            itemId: post.itemId,
                                            itemType: post.type,
                                        },
                                        update: (cache, { data: removeLikeData }) => {
                                            if (removeLikeData && removeLikeData.removeLike) {
                                                const postId = cache.identify({ __typename: post.__typename, id: post.itemId });

                                                cache.modify({
                                                    id: postId,
                                                    fields: {
                                                        getPostLikes(existing = { users: [], hasMore: true }) {
                                                            return {
                                                                hasMore: existing.hasMore,
                                                                users: existing.users.filter((user: User) => user.id !== me.id),
                                                                totalCount: existing.totalCount - 1,
                                                            };
                                                        },
                                                    },
                                                });
                                            }
                                        }
                                    }).then(() => {
                                        setLike(null);
                                    });
                                } else {
                                    await likePost({
                                        variables: {
                                            itemId: post.itemId,
                                            origin,
                                            itemOpened: false,
                                            itemType: post.type,
                                        },
                                        update: (cache, { data: likePostData }) => {
                                            if (likePostData && likePostData.likePost) {
                                                const postId = cache.identify({ __typename: post.__typename, id: post.itemId });
                                                
                                                cache.modify({
                                                    id: postId,
                                                    fields: {
                                                        getPostLikes(existing = { users: [], hasMore: true }) {
                                                            const exists = existing.users.some((user: User) => user.id === me.id);

                                                            if (!exists) return existing;

                                                            return {
                                                                hasMore: existing.hasMore,
                                                                users: [cache.writeFragment({
                                                                    data: me,
                                                                    fragment: gql`
                                                                        fragment NewUser on User {
                                                                            id
                                                                            name
                                                                            username
                                                                            email
                                                                            type
                                                                            gender
                                                                            birthDate {
                                                                                date
                                                                                monthAndDayVisibility
                                                                                yearVisibility
                                                                            }
                                                                            emailVerified
                                                                            profile {
                                                                                profilePicture
                                                                                profileBanner
                                                                                bio
                                                                                website
                                                                            }
                                                                            userSettings {
                                                                                incomingMessages
                                                                                twoFactorAuth
                                                                            }
                                                                            searchSettings {
                                                                                hideSensitiveContent
                                                                                hideBlockedAccounts
                                                                            }
                                                                            createdAt
                                                                            updatedAt
                                                                            hiddenPosts
                                                                            identity {
                                                                                verified
                                                                                verifiedSince
                                                                            }
                                                                            verification {
                                                                                verified
                                                                                verifiedSince
                                                                            }
                                                                        }
                                                                    `
                                                                }), ...existing.users],
                                                                totalCount: existing.totalCount + 1,
                                                            }
                                                        }
                                                    }
                                                })
                                            }
                                        }
                                    }).then((response) => {
                                        if (response.data && response.data.likePost) {
                                            setLike(response.data.likePost as Like);
                                        } else {
                                            addToast("An error occurred while trying to like this post.");

                                            setLike(null);
                                        }
                                    });
                                }
                            }
                        }}
                        isActive={like ? true : false}
                    >
                        <ControlContainer size={32}>
                            <LikeIcon isActive={like ? true : false} />
                        </ControlContainer>
                        <PostActionInfo>
                            {formatter.format(postLikesData && postLikesData.getPostLikes.totalCount ? postLikesData.getPostLikes.totalCount : 0)}
                        </PostActionInfo>
                    </PostActionContainer>
                    <PostActionContainer
                        role="button"
                        aria-label={"Repost options"}
                        title={"Repost options"}
                        color={COLORS.green}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        isActive={repost ? true : false}
                    >
                        <Options
                            key={`repost-options-${post.id}`}
                            title="Repost options" 
                            icon={<RepostIcon type="nav" isActive={repost ? true : false} />}
                            isOpen={activeOptions === -2}
                            toggleOptions={() =>
                                handleOptionsClick(-2)
                            }
                            size={32}
                            mirrored={true}
                            children={
                                <>
                                    <OptionItem
                                        role="menuitem"
                                        title={repost ? "Remove repost" : "Repost this post"}
                                        aria-label={repost ? "Remove repost" : "Repost this post"}
                                        onClick={async (e) => {
                                            e.stopPropagation();
                            
                                            if (me) {
                                                if (repost) {
                                                    await deleteRepost({
                                                        variables: {
                                                            postId: post.id,
                                                        },
                                                        update: (cache, { data: deleteRepostData }) => {
                                                            if (deleteRepostData && deleteRepostData.deleteRepost && repost) {
                                                                const postId = cache.identify({ __typename: post.__typename, id: post.itemId });

                                                                cache.modify({
                                                                    id: postId,
                                                                    fields: {
                                                                        getReposts(existing = { reposts: [], hasMore: true }) {
                                                                            return {
                                                                                hasMore: existing.hasMore,
                                                                                reposts: existing.reposts.filter((r: Repost) => r.id !== repost.id),
                                                                                totalCount: existing.totalCount - 1,
                                                                            };
                                                                        }
                                                                    }
                                                                });
                                                            }
                                                        },
                                                    }).then(() => {
                                                        setRepost(null);
                                                    });
                                                } else {
                                                    await createRepost({
                                                        variables: {
                                                            postId: post.itemId
                                                        },
                                                        update: (cache, { data: createRepostData }) => {
                                                            if (createRepostData && createRepostData.createRepost && !repost) {
                                                                const postId = cache.identify({ __typename: post.__typename, id: post.itemId });

                                                                cache.modify({
                                                                    id: postId,
                                                                    fields: {
                                                                        getReposts(existing = { reposts: [], hasMore: true }, {  }) {
                                                                            return {
                                                                                hasMore: existing.hasMore,
                                                                                reposts: [cache.writeFragment({
                                                                                    data: createRepostData.createRepost,
                                                                                    fragment: gql`
                                                                                        fragment NewRepost on Repost {
                                                                                            id
                                                                                            repostId
                                                                                            postId
                                                                                            authorId
                                                                                            createdAt
                                                                                            updatedAt
                                                                                        }
                                                                                    `
                                                                                }), ...existing.reposts],
                                                                                totalCount: existing.totalCount + 1,
                                                                            }
                                                                        }
                                                                    }
                                                                });
                                                            }
                                                        },
                                                    }).then((response) => {
                                                        if (response.data && response.data.createRepost) {
                                                            setRepost(response.data.createRepost as Repost);
                                                        } else {
                                                            addToast("An error occurred while trying to repost this post.");

                                                            setRepost(null);
                                                        }
                                                    });
                                                }
                                            }
                                        }}
                                    >
                                        <OptionBaseIcon>
                                            <RepostIcon type="options" />
                                        </OptionBaseIcon>
                                        <OptionItemText>
                                            {repost ? "Remove repost" : "Repost this post"}
                                        </OptionItemText>
                                    </OptionItem>
                                    <OptionItem
                                        role="menuitem"
                                        title="Quote this post"
                                        aria-label="Quote this post"
                                        onClick={() => {
                                            navigate(`/create_post/quote/post/${post.itemId}`, {
                                                state: {
                                                    backgroundLocation:
                                                        location,
                                                },
                                            });
                                        }}
                                    >
                                        <OptionBaseIcon>
                                            <Pen />
                                        </OptionBaseIcon>
                                        <OptionItemText>
                                            Quote this post
                                        </OptionItemText>
                                    </OptionItem>
                                </>
                            }
                        />
                        <PostActionInfo>
                            {formatter.format(repostsData && repostsData.getReposts.totalCount ? repostsData.getReposts.totalCount : 0)}
                        </PostActionInfo>
                    </PostActionContainer>
                    <PostActionContainer
                        role="button"
                        aria-label={"Comment this post"}
                        title={"Comment this post"}
                        onClick={(e) => {
                            e.stopPropagation();

                            navigate(`/create_post/reply/post/${post.itemId}`, {
                                state: {
                                    backgroundLocation:
                                        location,
                                },
                            });
                        }}
                    >
                        <ControlContainer size={32}>
                            <Comment />
                        </ControlContainer>
                        <PostActionInfo>
                            {formatter.format(commentsData && commentsData.postComments.totalCount ? commentsData.postComments.totalCount : 0)}
                        </PostActionInfo>
                    </PostActionContainer>
                    <PostActionContainer
                        role="button"
                        aria-label={"Post views"}
                        title={"Post views"}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <ControlContainer size={32}>
                            <Views />
                        </ControlContainer>
                        <PostActionInfo>
                            {formatter.format(post.views)}
                        </PostActionInfo>
                    </PostActionContainer>
                    <PostActionContainer
                        role="button"
                        aria-label={"Share options"}
                        title={"Share options"}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <Options
                            key={`share-options-${post.id}`}
                            title="Share options" 
                            icon={<Share />}
                            isOpen={activeOptions === -1}
                            toggleOptions={() =>
                                handleOptionsClick(-1)
                            }
                            size={32}
                            children={
                                <>
                                    <OptionItem
                                        role="menuitem"
                                        title="Copy link to this post"
                                        aria-label="Copy link to this post"
                                        onClick={() => {
                                            const currentUrl = `${window.location.origin}/${post.author.username}/post/${post.itemId}`;

                                            const response = copy(currentUrl);

                                            if (response) {
                                                addToast("Link copied to clipboard.");
                                            } else {
                                                addToast("Failed to copy link.");
                                            }
                                        }}
                                    >
                                        <OptionBaseIcon>
                                            <Chain />
                                        </OptionBaseIcon>
                                        <OptionItemText>
                                            Copy link to this post
                                        </OptionItemText>
                                    </OptionItem>
                                    <OptionItem
                                        role="menuitem"
                                        title="Send this post"
                                        aria-label="Send this post"
                                    >
                                        <OptionBaseIcon>
                                            <Mail type="options" />
                                        </OptionBaseIcon>
                                        <OptionItemText>
                                            Send this post
                                        </OptionItemText>
                                    </OptionItem>
                                </>
                            }
                        />
                    </PostActionContainer>
                </PostActionsContainer>
            </PostContainer>
        </PostWrapper>
    );
}

export default PostComponent;