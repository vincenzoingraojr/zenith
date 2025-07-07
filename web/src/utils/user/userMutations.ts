import {
    IsFollowedByMeDocument,
    IsFollowedByMeQuery,
    IsUserBlockedByMeDocument,
    IsUserBlockedByMeQuery,
    useBlockUserMutation,
    useFollowUserMutation,
    User,
    useUnblockUserMutation,
    useUnfollowUserMutation,
} from "../../generated/graphql";
import { STANDARD_ERROR_MESSAGE } from "../constants";
import { useMeData } from "./userQueries";

export function useUserMutations() {
    const [followUser] = useFollowUserMutation();
    const [unfollowUser] = useUnfollowUserMutation();

    const [blockUser] = useBlockUserMutation();
    const [unblockUser] = useUnblockUserMutation();

    const { me } = useMeData();

    const handleFollowUser = async (
        user: User,
        origin: string,
        following: boolean
    ) => {
        try {
            if (following) {
                await unfollowUser({
                    variables: {
                        userId: user.id,
                    },
                    optimisticResponse: {
                        __typename: "Mutation",
                        unfollowUser: true,
                    },
                    update: (cache, { data: unfollowUserData }) => {
                        if (unfollowUserData && unfollowUserData.unfollowUser) {
                            cache.writeQuery<IsFollowedByMeQuery>({
                                query: IsFollowedByMeDocument,
                                data: {
                                    isFollowedByMe: null,
                                },
                                variables: {
                                    id: user.id,
                                },
                            });
                        }
                    },
                });

                return `You unfollowed @${user.username}`;
            } else {
                await followUser({
                    variables: {
                        userId: user.id,
                        origin,
                    },
                    optimisticResponse: {
                        __typename: "Mutation",
                        followUser: {
                            __typename: "Follow",
                            id: new Date().getTime(),
                            user,
                            follower: me!,
                            origin,
                            createdAt: new Date().getTime().toString(),
                            updatedAt: "",
                        },
                    },
                    update: (cache, { data: followUserData }) => {
                        if (followUserData && followUserData.followUser) {
                            cache.writeQuery<IsFollowedByMeQuery>({
                                query: IsFollowedByMeDocument,
                                data: {
                                    isFollowedByMe: followUserData.followUser,
                                },
                                variables: {
                                    id: user.id,
                                },
                            });
                        }
                    },
                });

                return `You followed @${user.username}`;
            }
        } catch (error) {
            console.error(error);

            return STANDARD_ERROR_MESSAGE;
        }
    };

    const handleBlockUser = async (
        userId: number,
        username: string,
        origin: string,
        blocked: boolean
    ) => {
        try {
            if (blocked) {
                await unblockUser({
                    variables: {
                        blockedId: userId,
                    },
                    optimisticResponse: {
                        __typename: "Mutation",
                        unblockUser: true,
                    },
                    update: (cache, { data: unblockUserData }) => {
                        if (unblockUserData && unblockUserData.unblockUser) {
                            cache.writeQuery<IsUserBlockedByMeQuery>({
                                query: IsUserBlockedByMeDocument,
                                data: {
                                    isUserBlockedByMe: null,
                                },
                                variables: {
                                    id: userId,
                                },
                            });
                        }
                    },
                });

                return `You unblocked @${username}`;
            } else {
                await blockUser({
                    variables: {
                        userId,
                        origin,
                    },
                    optimisticResponse: {
                        __typename: "Mutation",
                        blockUser: {
                            __typename: "Block",
                            id: new Date().getTime(),
                            blockedId: userId,
                            userId: me?.id || 0,
                            origin,
                            createdAt: new Date().getTime().toString(),
                            updatedAt: "",
                        },
                    },
                    update: (cache, { data: blockUserData }) => {
                        if (blockUserData && blockUserData.blockUser) {
                            cache.writeQuery<IsUserBlockedByMeQuery>({
                                query: IsUserBlockedByMeDocument,
                                data: {
                                    isUserBlockedByMe: blockUserData.blockUser,
                                },
                                variables: {
                                    id: userId,
                                },
                            });

                            cache.writeQuery<IsFollowedByMeQuery>({
                                query: IsFollowedByMeDocument,
                                data: {
                                    isFollowedByMe: null,
                                },
                                variables: {
                                    id: userId,
                                },
                            });
                        }
                    },
                });

                return `You blocked @${username}`;
            }
        } catch (error) {
            console.error(error);

            return STANDARD_ERROR_MESSAGE;
        }
    };

    return { handleFollowUser, handleBlockUser };
}
