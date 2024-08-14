import styled from "styled-components";
import { SvgIcon } from "../../styles/global";
import { useEffect, useState } from "react";

interface CloseProps {
    type: "normal" | "small";
}

const CloseIcon = styled(SvgIcon).attrs(
    (props: { isNormal: boolean }) => props
)`
    width: ${props => props.isNormal ? "16px" : "14px"};
    height: ${props => props.isNormal ? "16px" : "14px"};
    fill: none;
    stroke: #000000;
`;

const Close: React.FC<CloseProps> = ({ type }) => {
    const [isNormal, setIsNormal] = useState(false);

    useEffect(() => {
        if (type === "normal") {
            setIsNormal(true);
        } else {
            setIsNormal(false);
        }
    }, [type]);

    return (
        <CloseIcon isNormal={isNormal}>
            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 2L14 14M2 14L14 2" strokeWidth="2" strokeLinecap="round" />
            </svg>
        </CloseIcon>
    );
}

export default Close;