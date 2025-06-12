import {
    useFindUserByIdQuery,
    useFindUserQuery,
    useIsFollowedByMeQuery,
    useMeQuery,
} from "../generated/graphql";

export const useMeData = () => {
    const { data, loading, error } = useMeQuery({ fetchPolicy: "cache-first" });

    return {
        me: data && data.me ? data.me : null,
        loading,
        error,
    };
};

export const useFindUserById = (id?: number) => {
    const { data, loading, error } = useFindUserByIdQuery({
        variables: { id },
        fetchPolicy: "cache-first",
    });

    return {
        user: data && data.findUserById ? data.findUserById : null,
        loading,
        error,
    };
};

export const useFindUser = (username: string) => {
    const { data, loading, error } = useFindUserQuery({
        variables: { username },
        fetchPolicy: "cache-first",
    });

    return {
        user: data && data.findUser ? data.findUser : null,
        loading,
        error,
    };
};

export const useFollowData = (id: number) => {
    const { data } = useIsFollowedByMeQuery({
        variables: {
            id,
        },
        fetchPolicy: "cache-first",
    });

    return data && data.isFollowedByMe ? data.isFollowedByMe : null;
};
