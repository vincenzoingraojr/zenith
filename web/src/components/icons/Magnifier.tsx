import { FunctionComponent } from "react";
import { DynamicSizeIcon, IconProps } from "./common";
import { COLORS } from "../../styles/colors";
import { useTheme } from "../../styles/theme";

interface MagnifierProps extends IconProps {
    type?: "normal" | "small";
}

const Magnifier: FunctionComponent<MagnifierProps> = ({ type, isActive }) => {
    const theme = useTheme();

    return (
        <DynamicSizeIcon size={type === "normal" ? 24 : 18} hasStroke={isActive ? COLORS.blue : theme.color}>
            {isActive ? (
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.8593 14.8593L20 20M14.8593 14.8593C17.3435 12.3751 17.3435 8.34739 14.8593 5.86317C12.3751 3.37894 8.34739 3.37894 5.86317 5.86317C3.37894 8.34739 3.37894 12.3751 5.86317 14.8593C8.34739 17.3435 12.3751 17.3435 14.8593 14.8593Z" strokeWidth="3" strokeLinecap="round" />
                </svg>                
            ) : (
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.8593 14.8593L20 20M14.8593 14.8593C17.3435 12.3751 17.3435 8.34739 14.8593 5.86317C12.3751 3.37894 8.34739 3.37894 5.86317 5.86317C3.37894 8.34739 3.37894 12.3751 5.86317 14.8593C8.34739 17.3435 12.3751 17.3435 14.8593 14.8593Z" strokeWidth="2" strokeLinecap="round" />
                </svg>
            )}
        </DynamicSizeIcon>
    );
};

export default Magnifier;