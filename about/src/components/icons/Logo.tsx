import { useEffect, useState } from "react";
import { DynamicSizeIcon } from "./common";

export interface LogoProps {
    type?: "index-logo" | "nav";
}

const Logo: React.FC<LogoProps> = ({ type }) => {
    const [size, setSize] = useState(type === "index-logo" ? 48 : 36);

    useEffect(() => {
        if (type === "index-logo") {
            setSize(48);
        } else {
            setSize(36);
        }
    }, [type]);

    return (
        <DynamicSizeIcon size={size}>
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16Z" fill="#386BD9" />
                <path fillRule="evenodd" clipRule="evenodd" d="M6 16C11.5228 16 16 11.5228 16 6C16 11.5228 20.4772 16 26 16C20.4772 16 16 20.4772 16 26C16 20.4772 11.5228 16 6 16Z" fill="#FFFFFF" />
            </svg>
        </DynamicSizeIcon>
    );
};

export default Logo;
