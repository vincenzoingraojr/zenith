import {
    useFindUserByIdQuery,
    useFindUserQuery,
    useHasThisUserAsAffiliateQuery,
    useHasUserBlockedMeQuery,
    useIsAffiliatedToQuery,
    useIsFollowedByMeQuery,
    useIsUserBlockedByMeQuery,
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

export const useFollowData = (id?: number) => {
    const { data } = useIsFollowedByMeQuery({
        variables: {
            id,
        },
        fetchPolicy: "cache-first",
    });

    return data && data.isFollowedByMe ? data.isFollowedByMe : null;
};

export const useIsUserBlockedData = (id?: number) => {
    const { data } = useIsUserBlockedByMeQuery({
        variables: {
            id,
        },
        fetchPolicy: "cache-first",
    });

    return data && data.isUserBlockedByMe ? data.isUserBlockedByMe : null;
};

export const useHasBlockedMeData = (id?: number) => {
    const { data } = useHasUserBlockedMeQuery({
        variables: {
            id,
        },
        fetchPolicy: "cache-and-network",
    });

    return data && data.hasUserBlockedMe ? data.hasUserBlockedMe : null;
};

export const useIsAffiliatedTo = (userId?: number) => {
    const { data, loading, error } = useIsAffiliatedToQuery({
        variables: { id: userId },
        fetchPolicy: "cache-first",
    });

    return {
        isAffiliatedData: data && data.isAffiliatedTo ? data.isAffiliatedTo : null,
        loading,
        error,
    };
};

export const useHasThisUserAsAffiliate = (id?: number, userId?: number) => {
    const { data } = useHasThisUserAsAffiliateQuery({
        variables: {
            id,
            userId,
        },
        fetchPolicy: "cache-and-network",
    });

    return data?.hasThisUserAsAffiliate || false;
}