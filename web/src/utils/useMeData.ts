import { useMeQuery } from "../generated/graphql";

export const useMeData = () => {
    const { data, loading, error } = useMeQuery({ fetchPolicy: "cache-and-network" });

    return {
        me: data && data.me ? data.me : null,
        loading,
        error,
    };
}