import {
    useFindPostByIdQuery,
    useFindPostQuery,
    useGetFeedItemStatsQuery,
    useGetPostLikesQuery,
    useGetPostMentionsQuery,
    useGetRepostsQuery,
    useIsBookmarkedQuery,
    useIsPostLikedByMeQuery,
    useIsRepostedByUserQuery,
    usePostCommentsQuery,
    usePostMediaQuery,
} from "../generated/graphql";

export const useFindPost = (postId: string, username?: string) => {
    const { data, loading, error } = useFindPostQuery({
        variables: { postId, username },
        fetchPolicy: "cache-first",
    });

    return {
        post: data && data?.findPost ? data.findPost : null,
        loading,
        error,
    };
};

export const useFindPostById = (id?: number | null) => {
    const { data, loading, error } = useFindPostByIdQuery({
        variables: { id },
        fetchPolicy: "cache-first",
    });

    return {
        post: data && data.findPostById ? data.findPostById : null,
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
    const { data, loading, error, fetchMore } = useGetPostLikesQuery({
        fetchPolicy: "cache-and-network",
        variables: { itemId, type, limit: 3, cursor: null },
        notifyOnNetworkStatusChange: true,
    });

    return {
        postLikes: data?.getPostLikes,
        loading,
        error,
        fetchMore,
    };
};

export const useComments = (type: string, id?: number) => {
    const { data, loading, error, fetchMore } = usePostCommentsQuery({
        fetchPolicy: "cache-and-network",
        variables: { id, type, limit: 3, cursor: null },
        notifyOnNetworkStatusChange: true,
    });

    return {
        postComments: data?.postComments,
        loading,
        error,
        fetchMore,
    };
};

export const useRepostData = (id?: number, userId?: number) => {
    const { data } = useIsRepostedByUserQuery({
        fetchPolicy: "cache-first",
        variables: { postId: id, userId },
    });

    return data && data.isRepostedByUser ? data.isRepostedByUser : null;
};

export const useReposts = (id?: number) => {
    const { data, loading, error, fetchMore } = useGetRepostsQuery({
        fetchPolicy: "cache-and-network",
        variables: { postId: id, limit: 3, cursor: null },
        notifyOnNetworkStatusChange: true,
    });

    return {
        userReposts: data?.getReposts,
        loading,
        error,
        fetchMore,
    };
};

export const useBookmarkData = (type: string, id?: number) => {
    const { data } = useIsBookmarkedQuery({
        variables: {
            itemId: id,
            type,
        },
        fetchPolicy: "cache-first",
    });

    return data && data.isBookmarked ? data.isBookmarked : null;
};

export const useFeedItemStats = (itemId: string, type: string) => {
    const { data } = useGetFeedItemStatsQuery({
        fetchPolicy: "cache-and-network",
        variables: { itemId, type },
    });

    return data && data.getFeedItemStats ? data.getFeedItemStats : null;
};

export const useGetPostMentions = (postId: string) => {
    const { data } = useGetPostMentionsQuery({
        fetchPolicy: "cache-and-network",
        variables: { postId },
    });

    return data && data.getPostMentions ? data.getPostMentions : null;
};

export const usePostMedia = (postId: string) => {
    const { data, loading, error } = usePostMediaQuery({
        variables: { postId },
        fetchPolicy: "cache-and-network",
    }); 

    return {
        postMedia: data && data.postMedia ? data.postMedia : null,
        loading,
        error,
    }
}