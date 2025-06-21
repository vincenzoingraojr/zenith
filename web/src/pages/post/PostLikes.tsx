import { useParams } from "react-router-dom";
import Modal from "../../components/layouts/modal/Modal";
import { useFindPost, usePostLikes } from "../../utils/postQueries";
import ModalLoading from "../../components/layouts/modal/ModalLoading";
import ErrorOrItemNotFound from "../../components/utils/ErrorOrItemNotFound";
import { ERROR_SOMETHING_WENT_WRONG } from "../../utils/constants";
import { FullWidthFeedContainer, ModalFeedContainer } from "../../styles/global";
import FeedComponent from "../../components/utils/FeedComponent";
import { useCallback, useMemo } from "react";
import Head from "../../components/Head";
import UserComponent from "../../components/layouts/items/user/UserComponent";

function PostLikes() {
    const params = useParams();

    const { post, loading, error } = useFindPost(params.itemId as string, params.username as string);
    
    const { postLikes, loading: likesLoading, error: likesError, fetchMore } = usePostLikes(post?.itemId || "", post?.type || "");

    const loadMore = useCallback(() => {
        if (!postLikes || (postLikes && !postLikes.hasMore) || likesLoading) return;

        const lastLike = postLikes.likes[postLikes.likes.length - 1];

        fetchMore({
            variables: { itemId: post?.itemId, type: post?.type, limit: 3, cursor: lastLike.createdAt },
        })
        .catch((error) => {
            console.error(error);
        });
    }, [postLikes, fetchMore, likesLoading, post?.itemId, post?.type]);

    const origin = "post-likes";

    const feedContent = useMemo(() => (
        <>
            {postLikes?.likes.map(
                (like) => (
                    <UserComponent
                        key={like.id}
                        id={like.userId}
                        origin={origin}
                    />
                )
            )}
        </>
    ), [postLikes?.likes]);

    return (
        <>
            <Head
                title={
                    loading
                        ? "Loading... | Zenith"
                        : post
                        ? `See who liked @${post.author.username}'s ${post.type} | Zenith`
                        : "Likes not found | Zenith"
                }
                description={
                    loading
                        ? "Content not ready. Loading..."
                        : post
                        ? `See who liked ${post.author.name}'s ${post.type}.`
                        : "Post not found."
                }
            />
            <Modal
                headerText="Likes"
                isBack={true}
                children={
                    <>
                        {loading ? (
                            <ModalLoading />
                        ) : (
                            <ModalFeedContainer>
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
                                        content="The post you're looking for doesn't exist — just like the likes."
                                    />
                                ) : (
                                    <FullWidthFeedContainer>
                                        <FeedComponent
                                            key={origin}
                                            feedContent={feedContent}
                                            loading={likesLoading}
                                            error={likesError}
                                            loadMore={loadMore}
                                            noElementsText="No one has liked this post yet."
                                            isFeedEmpty={postLikes?.totalCount === 0}
                                        />
                                    </FullWidthFeedContainer>
                                )}
                            </ModalFeedContainer>
                        )}
                    </>
                }
            />
        </>
    );
}

export default PostLikes;