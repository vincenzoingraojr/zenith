import { GetPostLikesDocument, IsPostLikedByMeDocument, IsPostLikedByMeQuery, useDeletePostMutation, useLikePostMutation, useRemoveLikeMutation } from "../generated/graphql";
import { useMeData } from "./userQueries";

export function usePostMutations() {
    const [deletePost, { client }] = useDeletePostMutation();
    const [likePost] = useLikePostMutation();
    const [removeLike] = useRemoveLikeMutation();
    const { me } = useMeData();

    const handleDeletePost = async (itemId: string, postId: number) => {
        try {
            const response = await deletePost({
                variables: { postId: itemId },
            });

            if (response.data && response.data.deletePost) {
                const refId = `Post:${postId}`;

                client.cache.modify({
                    fields: {
                        postFeed(existing = { posts: [], hasMore: true, totalCount: 0 }) {
                            const filteredPosts = existing.posts.filter(
                                (p: any) => p.__ref !== refId
                            );

                            return {
                                ...existing,
                                posts: filteredPosts,
                                totalCount: existing.totalCount - 1,
                            };
                        },
                    },
                });

                client.cache.evict({ id: refId });
                client.cache.gc();

                return "Your post has been deleted.";
            } else {
                return "An error occurred while deleting the post.";
            }
        } catch (error) {
            console.error(error);

            return "Unexpected error while deleting the post.";
        }
    };

    const handleLikePost = async (itemId: string, type: string, liked: boolean, origin: string, itemOpened: boolean) => {
        try {
            if (liked) {
                await removeLike({
                    variables: {
                        itemId,
                        itemType: type,
                    },
                    update: (
                        cache,
                        { data: removeLikeData }
                    ) => {
                        if (
                            removeLikeData &&
                            removeLikeData.removeLike && me
                        ) {
                            const existing =
                                cache.readQuery({
                                    query: GetPostLikesDocument,
                                    variables: {
                                        itemId,
                                        type,
                                        limit: 3,
                                    },
                                });

                            const {
                                users: oldUsers,
                                totalCount: oldCount,
                                hasMore,
                            } = (
                                existing as {
                                    getPostLikes: {
                                        users: any[];
                                        totalCount: number;
                                        hasMore: boolean;
                                    };
                                }
                            ).getPostLikes;

                            cache.writeQuery({
                                query: GetPostLikesDocument,
                                variables: {
                                    itemId,
                                    type,
                                    limit: 3,
                                },
                                data: {
                                    getPostLikes: {
                                        users: oldUsers.filter(
                                            (user) =>
                                                user.id !==
                                                me.id
                                        ),
                                        totalCount:
                                            Math.max(
                                                oldCount -
                                                    1,
                                                0
                                            ),
                                        hasMore,
                                    },
                                },
                            });

                            cache.writeQuery<IsPostLikedByMeQuery>(
                                {
                                    query: IsPostLikedByMeDocument,
                                    data: {
                                        isPostLikedByMe:
                                            null,
                                    },
                                    variables: {
                                        itemId,
                                        type,
                                    },
                                }
                            );
                        }
                    },
                });
            } else {
                await likePost({
                    variables: {
                        itemId,
                        origin,
                        itemOpened,
                        itemType: type,
                    },
                    update: (
                        cache,
                        { data: likePostData }
                    ) => {
                        if (
                            likePostData &&
                            likePostData.likePost
                        ) {
                            const existing =
                                cache.readQuery({
                                    query: GetPostLikesDocument,
                                    variables: {
                                        itemId,
                                        type,
                                        limit: 3,
                                    },
                                });

                            const {
                                totalCount: oldCount,
                                hasMore,
                            } = (
                                existing as {
                                    getPostLikes: {
                                        totalCount: number;
                                        hasMore: boolean;
                                    };
                                }
                            ).getPostLikes;

                            cache.writeQuery({
                                query: GetPostLikesDocument,
                                variables: {
                                    itemId,
                                    type,
                                    limit: 3,
                                },
                                data: {
                                    getPostLikes: {
                                        users: [me],
                                        totalCount:
                                            oldCount + 1,
                                        hasMore,
                                    },
                                },
                            });

                            cache.writeQuery<IsPostLikedByMeQuery>(
                                {
                                    query: IsPostLikedByMeDocument,
                                    data: {
                                        isPostLikedByMe:
                                            likePostData.likePost,
                                    },
                                    variables: {
                                        itemId,
                                        type,
                                    },
                                }
                            );
                        }
                    },
                });
            }

            return true;
        } catch (error) {
            console.error(error);

            return false;
        }
    }

    return { handleDeletePost, handleLikePost };
}