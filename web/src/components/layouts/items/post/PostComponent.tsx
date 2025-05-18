import { FunctionComponent, useEffect, useRef, useState } from "react";
import { GetPostLikesDocument, GetPostLikesQuery, GetRepostsDocument, GetRepostsQuery, Post, useCreateRepostMutation, useDeleteRepostMutation, useGetPostLikesQuery, useGetRepostsQuery, useIncrementPostViewsMutation, useIsPostLikedByMeQuery, useIsRepostedByUserQuery, useLikePostMutation, usePostCommentsQuery, useRemoveLikeMutation } from "../../../../generated/graphql";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ControlContainer, OptionBaseIcon, PageBlock, PageText } from "../../../../styles/global";
import profilePicture from "../../../../images/profile-picture.png";
import TextContainerRender from "../../../utils/TextContainerRender";
import { USER_TYPES } from "../../../../utils/constants";
import Like from "../../../icons/Like";
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
import Repost from "../../../icons/Repost";
import Mail from "../../../icons/Mail";

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

const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: transparent;
    transition: 0.2s background-color ease;
    cursor: pointer;

    &:hover,
    &:focus {
        background-color: ${({ theme }) => theme.overlayGrey};
    }
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
    width: 100%;
    overflow: hidden;
    cursor: pointer;
    text-decoration: none;

    &:hover,
    &:active {
        text-decoration: none;
    }
`;

const AuthorImageContainer = styled.div.attrs((props: { type: string }) => props)`
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

const AuthorInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
    overflow: hidden;
`;

const AuthorFullName = styled(PageText)`
    font-weight: 700;
    font-size: 16px;
    width: 100%;
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

const AuthorUsername = styled(PageText)`
    font-size: 14px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: ${({ theme }) => theme.inputText};
`;

const PostRightContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;
`;

const PostDate = styled(PageText)`
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

const PostMediaItem = styled.div`
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
    font-size: 16px;
    color: inherit;
    background-color: transparent;
`;

const PostComponent: FunctionComponent<PostComponentProps> = ({ post, showReplying, origin }) => {
    const navigate = useNavigate();
    const [like, setLike] = useState(false);
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
            setLike(likeData.isPostLikedByMe);
        }
    }, [likeData]);

    const { data: postLikesData } = useGetPostLikesQuery({
        fetchPolicy: "cache-and-network",
        variables: { itemId: post.itemId, type: post.type },
    });

    const [postLikes, setPostLikes] = useState(
        (postLikesData && postLikesData.getPostLikes) ? postLikesData.getPostLikes.length : 0
    );
    useEffect(() => {
        if (postLikesData && postLikesData.getPostLikes) {
            setPostLikes(postLikesData.getPostLikes.length);
        }
    }, [postLikesData]);

    const { data: commentsData } = usePostCommentsQuery({
        fetchPolicy: "cache-and-network",
        variables: { id: post.id, type: post.type },
    });

    const { addToast } = useToasts();

    const [createRepost] = useCreateRepostMutation();
    const [deleteRepost] = useDeleteRepostMutation();

    const [repost, setRepost] = useState(false);

    const { data: repostData } = useIsRepostedByUserQuery({
        fetchPolicy: "cache-and-network",
        variables: { postId: post.id, userId: me ? me.id : null },
    });

    useEffect(() => {
        if (repostData) {
            setRepost(repostData.isRepostedByUser);
        }
    }, [repostData]);

    const { data: repostsData } = useGetRepostsQuery({
        fetchPolicy: "cache-and-network",
        variables: { postId: post.id },
    });

    const [reposts, setReposts] = useState(
        (repostsData && repostsData.getReposts) ? repostsData.getReposts.length : 0
    );
    useEffect(() => {
        if (repostsData && repostsData.getReposts) {
            setReposts(repostsData.getReposts.length);
        }
    }, [repostsData]);

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
            >
                <PostHeader>
                    <PostAuthorContainer
                        role="link"
                        aria-label={`${post.author.name}'s profile`}
                        title={`${post.author.name}'s profile`}
                        to={`/${post.author.username}`}
                        onClick={(e) => e.stopPropagation()}
                        type={post.author.type}
                    >
                        <AuthorImageContainer>
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
                            <AuthorFullName>
                                {post.author.name}
                            </AuthorFullName>
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
                                    {me && (
                                        <>
                                            {post.authorId === me.id ? (
                                                <>
                                                    <OptionItem
                                                        role="menuitem"
                                                        title="Edit this post"
                                                        aria-label="Edit this post"
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
                                        update: (
                                            store,
                                            { data: removeLikeData }
                                        ) => {
                                            if (
                                                removeLikeData &&
                                                removeLikeData.removeLike &&
                                                postLikesData && postLikesData.getPostLikes
                                            ) {
                                                const postLikes =
                                                    postLikesData.getPostLikes.filter((item) => item.id !== me.id);

                                                store.writeQuery<GetPostLikesQuery>(
                                                    {
                                                        query: GetPostLikesDocument,
                                                        data: {
                                                            getPostLikes:
                                                                postLikes,
                                                        },
                                                        variables: {
                                                            itemId: post.itemId,
                                                            type: post.type,
                                                        },
                                                    }
                                                );
                                            }
                                        },
                                    }).then(() => {
                                        setLike(false);
                                    });
                                } else {
                                    await likePost({
                                        variables: {
                                            itemId: post.itemId,
                                            origin,
                                            itemOpened: false,
                                            itemType: post.type,
                                        },
                                        update: (
                                            store,
                                            { data: likePostData }
                                        ) => {
                                            if (
                                                likePostData &&
                                                likePostData.likePost &&
                                                postLikesData && postLikesData.getPostLikes
                                            ) {
                                                store.writeQuery<GetPostLikesQuery>(
                                                    {
                                                        query: GetPostLikesDocument,
                                                        data: {
                                                            getPostLikes: [
                                                                me,
                                                                ...postLikesData.getPostLikes,
                                                            ],
                                                        },
                                                        variables: {
                                                            itemId: post.itemId,
                                                            type: post.type,
                                                        },
                                                    }
                                                );
                                            }
                                        },
                                    }).then(() => {
                                        setLike(true);
                                    });
                                }
                            }
                        }}
                        isActive={like}
                    >
                        <ControlContainer>
                            <Like isActive={like} />
                        </ControlContainer>
                        <PostActionInfo>
                            {formatter.format(postLikes)}
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
                        isActive={repost}
                    >
                        <Options
                            key={`repost-options-${post.id}`}
                            title="Repost options" 
                            icon={<Repost isActive={repost} />}
                            isOpen={activeOptions === -2}
                            toggleOptions={() =>
                                handleOptionsClick(-2)
                            }
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
                                                        update: (
                                                            store,
                                                            { data: deleteRepostData }
                                                        ) => {
                                                            if (
                                                                deleteRepostData &&
                                                                deleteRepostData.deleteRepost &&
                                                                repostsData && repostsData.getReposts
                                                            ) {
                                                                const reposts =
                                                                    repostsData.getReposts.filter((item) => item.authorId !== me.id);

                                                                store.writeQuery<GetRepostsQuery>(
                                                                    {
                                                                        query: GetRepostsDocument,
                                                                        data: {
                                                                            getReposts:
                                                                                reposts,
                                                                        },
                                                                        variables: {
                                                                            postId: post.id,
                                                                        },
                                                                    }
                                                                );
                                                            }
                                                        },
                                                    }).then(() => {
                                                        setRepost(false);
                                                    });
                                                } else {
                                                    await createRepost({
                                                        variables: {
                                                            postId: post.itemId
                                                        },
                                                        update: (
                                                            store,
                                                            { data: createRepostData }
                                                        ) => {
                                                            if (
                                                                createRepostData &&
                                                                createRepostData.createRepost &&
                                                                repostsData && repostsData.getReposts
                                                            ) {
                                                                store.writeQuery<GetRepostsQuery>(
                                                                    {
                                                                        query: GetRepostsDocument,
                                                                        data: {
                                                                            getReposts: [
                                                                                createRepostData.createRepost,
                                                                                ...repostsData.getReposts,
                                                                            ],
                                                                        },
                                                                        variables: {
                                                                            postId: post.id,
                                                                        },
                                                                    }
                                                                );
                                                            }
                                                        },
                                                    }).then(() => {
                                                        setRepost(true);
                                                    });
                                                }
                                            }
                                        }}
                                    >
                                        <OptionBaseIcon>
                                            <Repost />
                                        </OptionBaseIcon>
                                        <OptionItemText>
                                            {repost ? "Remove repost" : "Repost this post"}
                                        </OptionItemText>
                                    </OptionItem>
                                    <OptionItem
                                        role="menuitem"
                                        title="Quote this post"
                                        aria-label="Quote this post"
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
                            {formatter.format(reposts)}
                        </PostActionInfo>
                    </PostActionContainer>
                    <PostActionContainer
                        role="button"
                        aria-label={"Comment this post"}
                        title={"Comment this post"}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <ControlContainer>
                            <Comment />
                        </ControlContainer>
                        <PostActionInfo>
                            {formatter.format((commentsData && commentsData.postComments) ? commentsData.postComments.length : 0)}
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
                        <ControlContainer>
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