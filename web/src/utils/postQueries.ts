import {
    useFindPostByIdQuery,
    useFindPostQuery,
    useGetPostLikesQuery,
    useGetRepostsQuery,
    useIsBookmarkedQuery,
    useIsPostLikedByMeQuery,
    useIsRepostedByUserQuery,
    usePostCommentsQuery,
} from "../generated/graphql";

export const useFindPost = (postId: string) => {
    const { data, loading, error } = useFindPostQuery({
        variables: { postId },
        fetchPolicy: "cache-first",
    });

    return {
        post: data && data?.findPost ? data.findPost : null,
        loading,
        error,
    };
};

export const useFindPostById = (id?: number) => {
    const { data, loading, error } = useFindPostByIdQuery({
        variables: { id },
        fetchPolicy: "cache-first",
    });

    return {
        post: data && data?.findPostById ? data.findPostById : null,
        loading,
        error,
    };
};

export const useLikeData = (itemId: string, type: string) => {
    const { data } = useIsPostLikedByMeQuery({
        fetchPolicy: "cache-first",
        variables: { itemId, type },
    });

    return data && data.isPostLikedByMe ? data.isPostLikedByMe : null;
};

export const usePostLikes = (itemId: string, type: string) => {
    const { data, loading, error } = useGetPostLikesQuery({
        fetchPolicy: "cache-and-network",
        variables: { itemId, type, limit: 3 },
    });

    return {
        postLikes: data?.getPostLikes,
        loading,
        error,
    };
};

export const useComments = (id: number, type: string) => {
    const { data, loading, error } = usePostCommentsQuery({
        fetchPolicy: "cache-and-network",
        variables: { id, type, limit: 3 },
    });

    return {
        postComments: data?.postComments,
        loading,
        error,
    };
};

export const useRepostData = (id: number, userId: number | null) => {
    const { data } = useIsRepostedByUserQuery({
        fetchPolicy: "cache-first",
        variables: { postId: id, userId },
    });

    return data && data.isRepostedByUser ? data.isRepostedByUser : null;
};

export const useReposts = (id: number) => {
    const { data, loading, error } = useGetRepostsQuery({
        fetchPolicy: "cache-and-network",
        variables: { postId: id, limit: 3 },
    });

    return {
        userReposts: data?.getReposts,
        loading,
        error,
    };
};

export const useBookmarkData = (id: number, type: string) => {
    const { data } = useIsBookmarkedQuery({
        variables: {
            itemId: id,
            type,
        },
        fetchPolicy: "cache-first",
    });

    return data && data.isBookmarked ? data.isBookmarked : null;
};
