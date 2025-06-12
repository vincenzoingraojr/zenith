import { useTheme } from "../../styles/theme";
import { DynamicSizeIcon } from "./common";

function Views() {
    const theme = useTheme();

    return (
        <DynamicSizeIcon size={22} isFilled={theme.color}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5 3C10.5 2.44772 10.0523 2 9.5 2C8.94772 2 8.5 2.44772 8.5 3V21C8.5 21.5523 8.94772 22 9.5 22C10.0523 22 10.5 21.5523 10.5 21V3Z" />
                <path d="M5.5 13C5.5 12.4477 5.05228 12 4.5 12C3.94772 12 3.5 12.4477 3.5 13V21C3.5 21.5523 3.94772 22 4.5 22C5.05228 22 5.5 21.5523 5.5 21V13Z" />
                <path d="M19.5 8C20.0523 8 20.5 8.44772 20.5 9V21C20.5 21.5523 20.0523 22 19.5 22C18.9477 22 18.5 21.5523 18.5 21V9C18.5 8.44772 18.9477 8 19.5 8Z" />
                <path d="M15.5 13C15.5 12.4477 15.0523 12 14.5 12C13.9477 12 13.5 12.4477 13.5 13V21C13.5 21.5523 13.9477 22 14.5 22C15.0523 22 15.5 21.5523 15.5 21V13Z" />
            </svg>
        </DynamicSizeIcon>
    );
}

export default Views;
