import { FunctionComponent } from "react";
import { COLORS } from "../../styles/colors";
import { USER_TYPES } from "../../utils/constants";
import { OptionBaseIcon, PageBlock } from "../../styles/global";
import Badge from "../icons/Badge";

interface VerificationBadgeProps {
    type: string;
    size?: number;
    verifiedSince?: string;
}

const VerificationBadge: FunctionComponent<VerificationBadgeProps> = ({
    type,
    size,
    verifiedSince,
}) => {
    return (
        <PageBlock>
            <OptionBaseIcon
                title={verifiedSince ? "Verified since " + verifiedSince : ""}
                aria-label={
                    verifiedSince ? "Verified since " + verifiedSince : ""
                }
            >
                <Badge
                    size={size}
                    color={
                        type === USER_TYPES.ORGANIZATION
                            ? COLORS.gold
                            : COLORS.blue
                    }
                />
            </OptionBaseIcon>
        </PageBlock>
    );
};

export default VerificationBadge;
