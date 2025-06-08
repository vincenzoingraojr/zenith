import { FunctionComponent } from "react";
import { DynamicSizeIcon, IconProps } from "./common";
import { COLORS } from "../../styles/colors";
import { useTheme } from "../../styles/theme";

const BookmarkIcon: FunctionComponent<IconProps> = ({ isActive }) => {
    const theme = useTheme();

    return (
        <DynamicSizeIcon size={22} isFilled={isActive ? COLORS.blue : theme.color}>
            {isActive ? (
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M19 1V23.4141L12 16.4141L5 23.4141V1H19Z" />
                </svg>
            ) : (
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M19 1V23.4141L12 16.4141L5 23.4141V1H19ZM7 3V18.5859L12 13.5859L17 18.5859V3H7Z" />
                </svg>
            )}
        </DynamicSizeIcon>
    );
};

export default BookmarkIcon;