import * as React from "react";
import { useEffect, useState } from "react";
import { DynamicSizeIcon } from "./common";

const Close = ({ type, color }) => {
    const [size, setSize] = useState(type === "normal" ? 16 : 12);

    useEffect(() => {
        if (type === "normal") {
            setSize(16);
        } else {
            setSize(12);
        }
    }, [type]);

    return (
        <DynamicSizeIcon size={size} hasStroke={color}>
            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 2L14 14M2 14L14 2" strokeWidth="2" strokeLinecap="round" />
            </svg>
        </DynamicSizeIcon>
    );
};

export default Close;
