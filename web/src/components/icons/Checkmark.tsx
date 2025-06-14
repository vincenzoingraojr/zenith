import { FunctionComponent } from "react";
import { useTheme } from "../../styles/theme";
import { DynamicSizeIcon, IconSizeProps } from "./common";

const Checkmark: FunctionComponent<IconSizeProps> = ({ color, size }) => {
    const theme = useTheme();

    return (
        <DynamicSizeIcon
            size={size || 16}
            hasStroke={color ? color : theme.color}
        >
            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M1 8L7 14L15 2"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
            </svg>
        </DynamicSizeIcon>
    );
};

export default Checkmark;
