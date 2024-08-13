import styled from "styled-components";
import { SvgIcon } from "../../styles/global";

export interface IconProps {
    isActive: boolean;
}

export const BaseIcon = styled(SvgIcon)`
    width: 24px;
    height: 24px;
`;

export const StandardIcon = styled(BaseIcon)`
    fill: #ffffff;
    stroke: none;
`;