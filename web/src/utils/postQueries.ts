import { useFindPostByIdQuery, useFindPostQuery } from "../generated/graphql";

export const useFindPost = (postId: string) => {
    const { data, loading, error } = useFindPostQuery({ variables: { postId }, fetchPolicy: "cache-first" });

    return {
        post: data?.findPost,
        loading,
        error,
    };
}

export const useFindPostById = (id?: number) => {
    const { data, loading, error } = useFindPostByIdQuery({ variables: { id }, fetchPolicy: "cache-first" });

    return {
        post: data?.findPostById,
        loading,
        error,
    };
}

