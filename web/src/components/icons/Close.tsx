import { FunctionComponent, useEffect, useState } from "react";
import { DynamicSizeIcon } from "./common";
import { getTheme } from "../../styles/theme";

interface CloseProps {
    type?: "normal" | "small";
}

const Close: FunctionComponent<CloseProps> = ({ type }) => {
    const [size, setSize] = useState(type === "normal" ? 16 : 12);
    const theme = getTheme();

    useEffect(() => {
        if (type === "normal") {
            setSize(16);
        } else {
            setSize(12);
        }
    }, [type]);

    return (
        <DynamicSizeIcon hasStroke={theme.color} size={size}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M5 5L19 19M5 19L19 5"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
            </svg>
        </DynamicSizeIcon>
    );
};

export default Close;
