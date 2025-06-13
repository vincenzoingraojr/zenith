import { IsFollowedByMeDocument, IsFollowedByMeQuery, IsUserBlockedByMeDocument, IsUserBlockedByMeQuery, useBlockUserMutation, useFollowUserMutation, useUnblockUserMutation, useUnfollowUserMutation } from "../generated/graphql";
import { STANDARD_ERROR_MESSAGE } from "./constants";

export function useUserMutations() {
    const [followUser] = useFollowUserMutation();
    const [unfollowUser] = useUnfollowUserMutation();

    const [blockUser] = useBlockUserMutation();
    const [unblockUser] = useUnblockUserMutation();

    const handleFollowUser = async (userId: number, username: string, origin: string, following: boolean) => {
        try {
            if (following) {
                await unfollowUser(
                    {
                        variables:
                            {
                                userId,
                            },
                        update: (
                            cache,
                            {
                                data: unfollowUserData,
                            }
                        ) => {
                            if (
                                unfollowUserData &&
                                unfollowUserData.unfollowUser
                            ) {
                                cache.writeQuery<IsFollowedByMeQuery>(
                                    {
                                        query: IsFollowedByMeDocument,
                                        data: {
                                            isFollowedByMe:
                                                null,
                                        },
                                        variables:
                                            {
                                                id: userId,
                                            },
                                    }
                                );
                            }
                        },
                    }
                );

                return `You unfollowed @${username}`;
            } else {
                await followUser(
                    {
                        variables:
                            {
                                userId,
                                origin,
                            },
                        update: (
                            cache,
                            {
                                data: followUserData,
                            }
                        ) => {
                            if (
                                followUserData &&
                                followUserData.followUser
                            ) {
                                cache.writeQuery<IsFollowedByMeQuery>(
                                    {
                                        query: IsFollowedByMeDocument,
                                        data: {
                                            isFollowedByMe:
                                                followUserData.followUser,
                                        },
                                        variables:
                                            {
                                                id: userId,
                                            },
                                    }
                                );
                            }
                        },
                    }
                );

                return `You followed @${username}`;
            }
        } catch (error) {
            console.error(error);

            return STANDARD_ERROR_MESSAGE;
        }
    }

    const handleBlockUser = async (userId: number, username: string, origin: string, blocked: boolean) => {
        try {
            if (blocked) {
                await unblockUser({
                    variables: {
                        blockedId: userId,
                    },
                    update: (
                        cache,
                        {
                            data: unblockUserData,
                        }
                    ) => {
                        if (
                            unblockUserData &&
                            unblockUserData.unblockUser
                        ) {
                            cache.writeQuery<IsUserBlockedByMeQuery>(
                                {
                                    query: IsUserBlockedByMeDocument,
                                    data: {
                                        isUserBlockedByMe:
                                            null,
                                    },
                                    variables:
                                    {
                                        id: userId,
                                    },
                                }
                            );
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
                    update: (
                        cache,
                        {
                            data: blockUserData,
                        }
                    ) => {
                        if (
                            blockUserData &&
                            blockUserData.blockUser
                        ) {
                            cache.writeQuery<IsUserBlockedByMeQuery>(
                                {
                                    query: IsUserBlockedByMeDocument,
                                    data: {
                                        isUserBlockedByMe:
                                            blockUserData.blockUser,
                                    },
                                    variables:
                                    {
                                        id: userId,
                                    },
                                }
                            );

                            cache.writeQuery<IsFollowedByMeQuery>(
                                {
                                    query: IsFollowedByMeDocument,
                                    data: {
                                        isFollowedByMe:
                                            null,
                                    },
                                    variables:
                                        {
                                            id: userId,
                                        },
                                }
                            );
                        }
                    },
                });

                return `You blocked @${username}`;
            }
        } catch (error) {
            console.error(error);

            return STANDARD_ERROR_MESSAGE;
        }
    }

    return { handleFollowUser, handleBlockUser };
}