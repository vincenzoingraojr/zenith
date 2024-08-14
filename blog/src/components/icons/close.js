import * as React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { SvgIcon } from "../../styles/global";

const CrossContainer = styled(SvgIcon)`
    width: ${props => props.isNormal ? "16px" : "12px"};
    height: ${props => props.isNormal ? "16px" : "12px"};
    stroke: ${(props) => props.color || "#000000"};
    fill: none;
`;

const Close = ({ type, color }) => {
    const [isNormal, setIsNormal] = useState(false);

    useEffect(() => {
        if (type === "normal") {
            setIsNormal(true);
        } else {
            setIsNormal(false);
        }
    }, [type]);

    return (
        <CrossContainer isNormal={isNormal} color={color}>
            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 2L14 14M2 14L14 2" strokeWidth="2" strokeLinecap="round" />
            </svg>
        </CrossContainer>
    );
};

export default Close;
