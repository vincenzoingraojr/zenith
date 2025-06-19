import { WatchQueryFetchPolicy } from "@apollo/client";
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

export const useComments = (type: string, fetchPolicy: WatchQueryFetchPolicy | undefined, id?: number) => {
    const { data, loading, error, fetchMore } = usePostCommentsQuery({
        fetchPolicy,
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
