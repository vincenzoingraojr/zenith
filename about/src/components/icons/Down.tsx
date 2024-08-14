import styled from "styled-components";
import { SvgIcon } from "../../styles/global";
import { FunctionComponent } from "react";

interface DownIconProps {
    mode: boolean;
}

const DownArrow = styled(SvgIcon).attrs(
    (props: { mode: boolean }) => props
)`
    width: 13px;
    height: 13px;
    stroke: #000000;
    fill: none;
    transform: ${props => props.mode ? "rotate(180deg)" : "none"};
    transform-origin: center;
`;

const Down: FunctionComponent<DownIconProps> = ({ mode }) => {
    return (
        <DownArrow mode={mode}>
            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 4L7.24742 11.1399C7.64584 11.5952 8.35417 11.5952 8.75258 11.1399L15 4" strokeWidth="2" />
            </svg>
        </DownArrow>
    );
}

export default Down;
