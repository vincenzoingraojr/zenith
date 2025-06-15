import { GetPostLikesDocument, GetRepostsDocument, IsBookmarkedDocument, IsBookmarkedQuery, IsPostLikedByMeDocument, IsPostLikedByMeQuery, IsRepostedByUserDocument, IsRepostedByUserQuery, Repost, useCreateBookmarkMutation, useCreateRepostMutation, useDeletePostMutation, useDeleteRepostMutation, useLikePostMutation, useRemoveBookmarkMutation, useRemoveLikeMutation } from "../generated/graphql";
import { useMeData } from "./userQueries";

export function usePostMutations() {
    const [deletePost, { client }] = useDeletePostMutation();
    const [likePost] = useLikePostMutation();
    const [removeLike] = useRemoveLikeMutation();
    const { me } = useMeData();
    const [createRepost] = useCreateRepostMutation();
    const [deleteRepost] = useDeleteRepostMutation();
    const [createBookmark] = useCreateBookmarkMutation();
    const [removeBookmark] = useRemoveBookmarkMutation();

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
                const removeLikeResponse = await removeLike({
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

                return removeLikeResponse.data && removeLikeResponse.data.removeLike;
            } else {
                const likePostResponse = await likePost({
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

                return likePostResponse.data && likePostResponse.data.likePost;
            }
        } catch (error) {
            console.error(error);

            return false;
        }
    }

    const handleRepost = async (itemId: string, id: number, repost: Repost | null) => {
        try {
            if (repost) {
                const deleteRepostResponse = await deleteRepost({
                    variables: {
                        postId: id,
                    },
                    update: (
                        cache,
                        {
                            data: deleteRepostData,
                        }
                    ) => {
                        if (
                            deleteRepostData &&
                            deleteRepostData.deleteRepost &&
                            repost && me
                        ) {
                            const existing =
                                cache.readQuery(
                                    {
                                        query: GetRepostsDocument,
                                        variables:
                                            {
                                                postId: id,
                                                userId: me.id,
                                                limit: 3,
                                            },
                                    }
                                );

                            const {
                                reposts:
                                    oldReposts,
                                totalCount:
                                    oldCount,
                                hasMore,
                            } = (
                                existing as {
                                    getReposts: {
                                        reposts: any[];
                                        totalCount: number;
                                        hasMore: boolean;
                                    };
                                }
                            ).getReposts;

                            cache.writeQuery(
                                {
                                    query: GetRepostsDocument,
                                    variables:
                                        {
                                            postId: id,
                                            userId: me.id,
                                            limit: 3,
                                        },
                                    data: {
                                        getReposts:
                                            {
                                                reposts:
                                                    oldReposts.filter(
                                                        (
                                                            r
                                                        ) =>
                                                            r.id !==
                                                            repost.id
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
                                }
                            );

                            cache.writeQuery<IsRepostedByUserQuery>(
                                {
                                    query: IsRepostedByUserDocument,
                                    data: {
                                        isRepostedByUser:
                                            null,
                                    },
                                    variables:
                                        {
                                            postId: id,
                                            userId: me.id,
                                        },
                                }
                            );
                        }
                    },
                });

                return deleteRepostResponse.data && deleteRepostResponse.data.deleteRepost;
            } else {
                const createRepostResponse = await createRepost({
                    variables: {
                        postId: itemId,
                    },
                    update: (
                        cache,
                        {
                            data: createRepostData,
                        }
                    ) => {
                        if (
                            createRepostData &&
                            createRepostData.createRepost &&
                            !repost && me
                        ) {
                            const existing =
                                cache.readQuery(
                                    {
                                        query: GetRepostsDocument,
                                        variables:
                                            {
                                                postId: id,
                                                userId: me.id,
                                                limit: 3,
                                            },
                                    }
                                );

                            const {
                                totalCount:
                                    oldCount,
                                hasMore,
                            } = (
                                existing as {
                                    getReposts: {
                                        totalCount: number;
                                        hasMore: boolean;
                                    };
                                }
                            ).getReposts;

                            cache.writeQuery(
                                {
                                    query: GetRepostsDocument,
                                    variables:
                                        {
                                            postId: id,
                                            userId: me.id,
                                            limit: 3,
                                        },
                                    data: {
                                        getReposts:
                                            {
                                                reposts:
                                                    [
                                                        createRepostData.createRepost,
                                                    ],
                                                totalCount:
                                                    oldCount +
                                                    1,
                                                hasMore,
                                            },
                                    },
                                }
                            );

                            cache.writeQuery<IsRepostedByUserQuery>(
                                {
                                    query: IsRepostedByUserDocument,
                                    data: {
                                        isRepostedByUser:
                                            createRepostData.createRepost,
                                    },
                                    variables:
                                        {
                                            postId: id,
                                            userId: me.id,
                                        },
                                }
                            );
                        }
                    },
                });

                return createRepostResponse.data && createRepostResponse.data.createRepost;
            }
        } catch (error) {
            console.error(error);

            return false;
        }
    }

    const handleBookmark = async (itemId: string, type: string, id: number, origin: string, bookmarked: boolean) => {
        try {
            if (bookmarked) {
                const removeBookmarkResponse = await removeBookmark({
                    variables: {
                        itemId,
                        type,
                    },
                    update: (
                        cache,
                        { data: removeBookmarkData }
                    ) => {
                        if (
                            removeBookmarkData &&
                            removeBookmarkData.removeBookmark
                        ) {
                            cache.writeQuery<IsBookmarkedQuery>(
                                {
                                    query: IsBookmarkedDocument,
                                    data: {
                                        isBookmarked: null,
                                    },
                                    variables: {
                                        itemId: id,
                                        type,
                                    },
                                }
                            );
                        }
                    },
                });

                return removeBookmarkResponse.data && removeBookmarkResponse.data.removeBookmark;
            } else {
                const createBookmarkResponse = await createBookmark({
                    variables: {
                        itemId,
                        type,
                        origin,
                    },
                    update: (
                        cache,
                        { data: createBookmarkData }
                    ) => {
                        if (
                            createBookmarkData &&
                            createBookmarkData.createBookmark
                        ) {
                            cache.writeQuery<IsBookmarkedQuery>(
                                {
                                    query: IsBookmarkedDocument,
                                    data: {
                                        isBookmarked:
                                            createBookmarkData.createBookmark,
                                    },
                                    variables: {
                                        itemId: id,
                                        type,
                                    },
                                }
                            );
                        }
                    },
                });

                return createBookmarkResponse.data && createBookmarkResponse.data.createBookmark;
            }
        } catch (error) {
            console.error(error);

            return false;
        }
    }

    return { handleDeletePost, handleLikePost, handleRepost, handleBookmark };
}