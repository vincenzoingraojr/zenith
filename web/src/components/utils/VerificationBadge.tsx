import { FunctionComponent } from "react";
import { COLORS } from "../../styles/colors";
import { USER_TYPES } from "../../utils/constants";
import { OptionBaseIcon, PageBlock } from "../../styles/global";
import Badge from "../icons/Badge";

interface VerificationBadgeProps {
    verifiedSince: string;
    type: string;
    size?: number;
}

const VerificationBadge: FunctionComponent<VerificationBadgeProps> = ({ verifiedSince, type, size }) => {
    return (
        <PageBlock>
            <OptionBaseIcon title={"Verified since " + verifiedSince} aria-label={"Verified since " + verifiedSince}>
                <Badge size={size} color={type === USER_TYPES.ORGANIZATION ? COLORS.gold : COLORS.blue}  />
            </OptionBaseIcon>
        </PageBlock>
    );
}

export default VerificationBadge;