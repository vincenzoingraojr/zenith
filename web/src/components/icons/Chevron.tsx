import { FunctionComponent } from "react";
import { DynamicSizeIcon, IconProps } from "./common";
import { useTheme } from "../../styles/theme";
import styled from "styled-components";

interface ChevronProps extends IconProps {
    direction: "up" | "down" | "left" | "right";
}

const ChevronIcon = styled(DynamicSizeIcon).attrs(
    (props: ChevronProps) => props
)`
    transform: ${({ direction }: ChevronProps) => {
        switch (direction) {
            case "up":
                return "rotate(180deg)";
            case "down":
                return "rotate(0deg)";
            case "left":
                return "rotate(90deg)";
            case "right":
                return "rotate(270deg)";
            default:
                return "rotate(0deg)";
        }
    }};
`;

const Chevron: FunctionComponent<ChevronProps> = ({ direction, color }) => {
    const theme = useTheme();

    return (
        <ChevronIcon
            direction={direction}
            size={16}
            hasStroke={color ? color : theme.inputText}
        >
            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M1 4L7.24742 11.1399C7.64584 11.5952 8.35417 11.5952 8.75258 11.1399L15 4"
                    strokeWidth="2"
                />
            </svg>
        </ChevronIcon>
    );
};

export default Chevron;
