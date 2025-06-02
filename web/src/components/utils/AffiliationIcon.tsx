import { FunctionComponent } from "react";
import { PageBlock } from "../../styles/global";
import { useIsAffiliatedToQuery } from "../../generated/graphql";
import { useNavigate } from "react-router-dom";
import profilePicture from "../../images/profile-picture.png";
import styled from "styled-components";

interface AffiliationIconProps {
    userId: number;
    size: number;
    noAction?: boolean;
}

const AffiliationIconContainer = styled.div.attrs((props: { size: number }) => props)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${(props) => (`${props.size}px`)};
    height: ${(props) => (`${props.size}px`)};
    border-radius: ${(props) => (`${props.size / 8}px`)};
    cursor: pointer;

    img {
        width: inherit;
        height: inherit;
        border-radius: inherit;
    }
`;

const AffiliationIcon: FunctionComponent<AffiliationIconProps> = ({ userId, size, noAction }) => {
    const { data, loading, error } = useIsAffiliatedToQuery({ variables: { id: userId }, fetchPolicy: "cache-first" });

    const navigate = useNavigate();

    if (!data || !data.isAffiliatedTo || error) return null;

    return (
        <PageBlock>
            <AffiliationIconContainer 
                role="link"
                title={data.isAffiliatedTo?.name}
                aria-label={data.isAffiliatedTo?.name}
                onClick={(e) => {
                    if (!noAction) {
                        e.stopPropagation();
                        e.preventDefault();
                        
                        navigate(`/${data.isAffiliatedTo?.username}`);
                    }
                }}
                size={size}
            >
                <img
                    src={
                        (loading || data.isAffiliatedTo?.profile.profilePicture.length === 0) 
                            ? profilePicture
                            : data.isAffiliatedTo?.profile.profilePicture
                    }
                    title={data.isAffiliatedTo?.name}
                    alt={data.isAffiliatedTo?.name}
                />
            </AffiliationIconContainer>
        </PageBlock>
    );
}

export default AffiliationIcon;