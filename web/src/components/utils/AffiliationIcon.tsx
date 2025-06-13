import { FunctionComponent } from "react";
import { PageBlock } from "../../styles/global";
import { useNavigate } from "react-router-dom";
import profilePicture from "../../images/profile-picture.png";
import styled from "styled-components";
import { useIsAffiliatedTo } from "../../utils/userQueries";

interface AffiliationIconProps {
    userId: number;
    size: number;
    noAction?: boolean;
}

const AffiliationIconContainer = styled.div.attrs(
    (props: { size: number }) => props
)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${(props) => `${props.size}px`};
    height: ${(props) => `${props.size}px`};
    border-radius: ${(props) => `${props.size / 8}px`};
    cursor: pointer;

    img {
        width: inherit;
        height: inherit;
        border-radius: inherit;
    }
`;

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
            <AffiliationIconContainer
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
                size={size}
            >
                <img
                    src={
                        loading ||
                        isAffiliatedData.profile.profilePicture.length === 0
                            ? profilePicture
                            : isAffiliatedData.profile.profilePicture
                    }
                    title={isAffiliatedData.name}
                    alt={isAffiliatedData.name}
                />
            </AffiliationIconContainer>
        </PageBlock>
    );
};

export default AffiliationIcon;
