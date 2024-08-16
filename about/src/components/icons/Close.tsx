import { useEffect, useState, FunctionComponent } from "react";
import { DynamicSizeIcon } from "./common";

interface CloseProps {
    type: "normal" | "small";
}

const Close: FunctionComponent<CloseProps> = ({ type }) => {
    const [size, setSize] = useState(16);

    useEffect(() => {
        if (type === "normal") {
            setSize(16);
        } else {
            setSize(12);
        }
    }, [type]);

    return (
        <DynamicSizeIcon hasStroke={"#000000"} size={size}>
            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 2L14 14M2 14L14 2" strokeWidth="2" strokeLinecap="round" />
            </svg>
        </DynamicSizeIcon>
    );
}

export default Close;