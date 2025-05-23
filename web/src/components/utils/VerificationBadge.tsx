import { FunctionComponent } from "react";
import Checkmark from "../icons/Checkmark";
import { COLORS } from "../../styles/colors";
import styled from "styled-components";
import { USER_TYPES } from "../../utils/constants";
import { PageBlock } from "../../styles/global";

interface VerificationBadgeProps {
    verifiedSince: string;
    type: string;
    size?: number;
}

const VerificationBadgeContainer = styled.div.attrs(
    (props: { type: string; size?: number }) => props
)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${(props) => (props.size ? `${props.size}px` : "24px")};
    height: ${(props) => (props.size ? `${props.size}px` : "24px")};
    background-color: ${(props) => (props.type === USER_TYPES.ORGANIZATION ? COLORS.gold : COLORS.blue)};
    border-radius: 50%;
`;

const VerificationBadge: FunctionComponent<VerificationBadgeProps> = ({ verifiedSince, type, size }) => {
    const iconSize = size ? size - 8 : 16;

    return (
        <PageBlock>
            <VerificationBadgeContainer type={type} size={size} title={"Verified since " + verifiedSince} aria-label={"Verified since " + verifiedSince}>
                <Checkmark size={iconSize} color={COLORS.white} />
            </VerificationBadgeContainer>
        </PageBlock>
    );
}

export default VerificationBadge;