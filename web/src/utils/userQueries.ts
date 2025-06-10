import { useFindUserByIdQuery, useFindUserQuery, useMeQuery } from "../generated/graphql";

export const useMeData = () => {
    const { data, loading, error } = useMeQuery({ fetchPolicy: "cache-first" });

    return {
        me: data?.me,
        loading,
        error,
    };
}

export const useFindUserById = (id?: number) => {
    const { data, loading, error } = useFindUserByIdQuery({ variables: { id }, fetchPolicy: "cache-first" });

    return {
        user: data?.findUserById,
        loading,
        error,
    };
}

export const useFindUser = (username: string) => {
    const { data, loading, error } = useFindUserQuery({ variables: { username }, fetchPolicy: "cache-first" });

    return {
        user: data?.findUser,
        loading,
        error,
    };
}
