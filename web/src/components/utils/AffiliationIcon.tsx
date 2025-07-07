import { FunctionComponent } from "react";
import { PageBlock, ProfilePictureWrapper } from "../../styles/global";
import { useNavigate } from "react-router-dom";
import { useIsAffiliatedTo } from "../../utils/user/userQueries";
import ProfilePicture from "./ProfilePicture";

interface AffiliationIconProps {
    userId?: number;
    size: number;
    noAction?: boolean;
}

const AffiliationIcon: FunctionComponent<AffiliationIconProps> = ({
    userId,
    size,
    noAction,
}) => {
    const { isAffiliatedData, loading, error } = useIsAffiliatedTo(userId);

    const navigate = useNavigate();

    if (!isAffiliatedData || error) return null;

    return (
        <PageBlock>
            <ProfilePictureWrapper
                role="link"
                title={isAffiliatedData.name}
                aria-label={isAffiliatedData.name}
                onClick={(e) => {
                    if (!noAction && isAffiliatedData) {
                        e.stopPropagation();
                        e.preventDefault();

                        navigate(`/${isAffiliatedData.username}`);
                    }
                }}
            >
                <ProfilePicture
                    loading={loading}
                    pictureUrl={isAffiliatedData.profile.profilePicture}
                    type={isAffiliatedData.type}
                    size={size}
                    title={isAffiliatedData.name}
                />
            </ProfilePictureWrapper>
        </PageBlock>
    );
};

export default AffiliationIcon;
