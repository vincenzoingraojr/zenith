import { useTheme } from "../../styles/theme";
import { DynamicSizeIcon } from "./common";

function More() {
    const theme = useTheme();

    return (
        <DynamicSizeIcon isFilled={theme.color} size={16}>
            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 8C16 9.1046 15.1046 10 14 10C12.8954 10 12 9.1046 12 8C12 6.8954 12.8954 6 14 6C15.1046 6 16 6.8954 16 8Z" />
                <path d="M10 8C10 9.1046 9.1046 10 8 10C6.8954 10 6 9.1046 6 8C6 6.8954 6.8954 6 8 6C9.1046 6 10 6.8954 10 8Z" />
                <path d="M4 8C4 9.1046 3.10457 10 2 10C0.89543 10 0 9.1046 0 8C0 6.8954 0.89543 6 2 6C3.10457 6 4 6.8954 4 8Z" />
            </svg>
        </DynamicSizeIcon>
    );
}

export default More;
