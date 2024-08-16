import styled from "styled-components";
import { SvgIcon } from "../../styles/global";

export interface IconProps {
    isActive: boolean;
}

export const BaseIcon = styled(SvgIcon)`
    width: 24px;
    height: 24px;
`;

export const StandardIcon = styled(BaseIcon).attrs(
    (props: { isFilled?: string, hasStroke?: string }) => props
)`
    fill:  ${(props) => (props.isFilled ? props.isFilled : `none`)};
    stroke:  ${(props) => (props.hasStroke ? props.hasStroke : `none`)};
`;

export const DynamicSizeIcon = styled(StandardIcon).attrs(
    (props: { size?: number }) => props
)`
    width: ${(props) => (props.size ? `${props.size}px` : `24px`)};
    height: ${(props) => (props.size ? `${props.size}px` : `24px`)};
`;