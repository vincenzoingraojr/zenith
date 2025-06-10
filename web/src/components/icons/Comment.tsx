import { FunctionComponent } from "react";
import { useTheme } from "../../styles/theme";
import { DynamicSizeIcon, IconSizeProps } from "./common";

const Comment: FunctionComponent<IconSizeProps> = ({ color, size }) => {
    const theme = useTheme();
    
    return (
        <DynamicSizeIcon size={size ? size : 22} isFilled={color ? color : theme.color}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 13H7V11H17V13Z" />
                <path d="M17 9H7V7H17V9Z" />
                <path fillRule="evenodd" clipRule="evenodd" d="M19 2C20.6569 2 22 3.34315 22 5V15C22 16.6569 20.6569 18 19 18H15.3516L9 23.0811V18H5C3.34315 18 2 16.6569 2 15V5C2 3.34315 3.34315 2 5 2H19ZM5 4C4.44772 4 4 4.44772 4 5V15C4 15.5523 4.44772 16 5 16H11V18.918L14.375 16.2188L14.6494 16H19C19.5523 16 20 15.5523 20 15V5C20 4.44772 19.5523 4 19 4H5Z" />
            </svg>
        </DynamicSizeIcon>
    );
}

export default Comment;