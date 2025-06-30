import { FunctionComponent, useMemo } from "react";
import {
    useFindUserById,
    useFollowData,
    useHasBlockedMeData,
    useIsUserBlockedData,
    useMeData,
} from "../../../../utils/userQueries";
import { useUserMutations } from "../../../../utils/userMutations";
import styled from "styled-components";
import {
    ItemLoading,
    PageBlock,
    RightContainer,
    SmallButton,
    UserFullName,
    UserFullNameContainer,
    UserInfo,
    UsernameContainer,
} from "../../../../styles/global";
import ProfilePicture from "../../../utils/ProfilePicture";
import VerificationBadge from "../../../utils/VerificationBadge";
import AffiliationIcon from "../../../utils/AffiliationIcon";
import { useThemeContext } from "../../../../styles/ThemeProvider";
import { COLORS } from "../../../../styles/colors";
import { useToasts } from "../../../utils/ToastProvider";
import LoadingComponent from "../../../utils/LoadingComponent";
import { useNavigate } from "react-router-dom";

interface UserComponentProps {
    id: number;
    origin: string;
}

const UserContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    cursor: pointer;
    padding: 16px;
    background-color: transparent;
    transition: 0.2s background-color ease;
    width: 100%;
    overflow: hidden;

    &:hover,
    &:focus {
        background-color: ${({ theme }) => theme.overlayGrey};
    }
`;

const UserInfoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    width: 100%;
    overflow: hidden;
`;

const FollowButton = styled(SmallButton).attrs(
    (props: { dark: boolean }) => props
)`
    border: none;
    background-color: ${({ theme }) => theme.color};
    color: ${(props) => (props.dark ? COLORS.black : COLORS.white)};

    &:hover,
    &:focus {
        background-color: ${({ theme }) => theme.color};
    }
`;

const UserComponent: FunctionComponent<UserComponentProps> = ({
    id,
    origin,
}) => {
    const { user, loading } = useFindUserById(id);
    const { me } = useMeData();
    const { isDarkMode } = useThemeContext();

    const { handleFollowUser } = useUserMutations();

    const isFollowedByMe = useFollowData(user?.id);

    const follow = useMemo(() => isFollowedByMe, [isFollowedByMe]);

    const isBlockedByMe = useIsUserBlockedData(user?.id);

    const blockedByMe = useMemo(() => isBlockedByMe, [isBlockedByMe]);

    const hasBlockedMe = useHasBlockedMeData(user?.id);

    const blockedMe = useMemo(() => hasBlockedMe, [hasBlockedMe]);

    const { addToast } = useToasts();

    const navigate = useNavigate();

    return (
        <PageBlock>
            {loading ? (
                <ItemLoading>
                    <LoadingComponent />
                </ItemLoading>
            ) : !user ? null : (
                <UserContainer
                    role="link"
                    tabIndex={0}
                    title="View user page"
                    aria-label="View user page"
                    onClick={() => {
                        navigate(`/${user.username}`);
                    }}
                    onKeyDown={(e) =>
                        e.key === "Enter" && navigate(`/${user.username}`)
                    }
                >
                    <UserInfoContainer>
                        <ProfilePicture
                            loading={false}
                            pictureUrl={user.profile.profilePicture}
                            type={user.type}
                            size={40}
                            title={user.name}
                        />
                        <UserInfo>
                            <UserFullNameContainer>
                                <UserFullName>{user.name}</UserFullName>
                                {user.verification.verified === "VERIFIED" && (
                                    <VerificationBadge
                                        type={user.type}
                                        verifiedSince={
                                            user.verification.verifiedSince
                                                ? new Date(
                                                      parseInt(
                                                          user.verification
                                                              .verifiedSince
                                                      )
                                                  ).toLocaleString("en-us", {
                                                      month: "long",
                                                      year: "numeric",
                                                  })
                                                : undefined
                                        }
                                        size={18}
                                    />
                                )}
                                <AffiliationIcon userId={user.id} size={18} />
                            </UserFullNameContainer>
                            <UsernameContainer>
                                @{user.username}
                            </UsernameContainer>
                        </UserInfo>
                    </UserInfoContainer>
                    {me && me.id !== user.id && !blockedByMe && !blockedMe && (
                        <RightContainer>
                            <FollowButton
                                dark={isDarkMode}
                                type="button"
                                title={`${follow ? "Unfollow" : "Follow"} 
                                    @
                                    ${user.username}`}
                                aria-label={`${follow ? "Unfollow" : "Follow"} 
                                    @
                                    ${user.username}`}
                                onClick={async (e) => {
                                    e.stopPropagation();

                                    const response = await handleFollowUser(
                                        user.id,
                                        user.username,
                                        origin,
                                        follow ? true : false
                                    );

                                    addToast(response);
                                }}
                            >
                                {follow ? "Unfollow" : "Follow"}
                            </FollowButton>
                        </RightContainer>
                    )}
                </UserContainer>
            )}
        </PageBlock>
    );
};

export default UserComponent;
