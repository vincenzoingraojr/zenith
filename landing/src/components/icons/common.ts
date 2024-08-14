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
    (props: { isFilled?: boolean, hasStroke?: boolean }) => props
)`
    fill:  ${(props) => (props.isFilled ? `#FFFFFF` : `none`)};
    stroke:  ${(props) => (props.hasStroke ? `#FFFFFF` : `none`)};
`;

export const DynamicSizeIcon = styled(StandardIcon).attrs(
    (props: { size: number }) => props
)`
    width: ${(props) => (props.size ? `${props.size}px` : `inherit`)};
    height: ${(props) => (props.size ? `${props.size}px` : `inherit`)};
`;