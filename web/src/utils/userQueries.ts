import { useFindVerificationRequestQuery, useMeQuery } from "../generated/graphql";

export const useMeData = () => {
    const { data, loading, error } = useMeQuery({ fetchPolicy: "cache-first" });

    return {
        me: data?.me,
        loading,
        error,
    };
}

export const useFindVerification = (userId: number, type: string) => {
    const { data: verificationData } = useFindVerificationRequestQuery({ variables: { id: userId, type }, fetchPolicy: "cache-first" });

    if (!verificationData || !verificationData.findVerificationRequest) {
        return {
            userVerified: false,
            verifiedSince: "",
        };
    }

    const verifiedSince = new Date(parseInt(verificationData.findVerificationRequest.verifiedSince as string)).toLocaleString(
        "en-us",
        {
            month: "long",
            year: "numeric",
        }
    );

    return {
        userVerified: verificationData.findVerificationRequest.verified === "VERIFIED",
        verifiedSince,
    }
}