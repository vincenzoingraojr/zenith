import styled from "styled-components";
import { SvgIcon } from "../../styles/global";

export const BaseIcon = styled(SvgIcon)`
    width: 24px;
    height: 24px;
`;

export const StandardIcon = styled(BaseIcon)`
    fill:  ${(props) => (props.isFilled ? props.isFilled : `none`)};
    stroke:  ${(props) => (props.hasStroke ? props.hasStroke : `none`)};
`;

export const DynamicSizeIcon = styled(StandardIcon)`
    width: ${(props) => (props.size ? `${props.size}px` : `24px`)};
    height: ${(props) => (props.size ? `${props.size}px` : `24px`)};
`;