import { useTheme } from "../../styles/theme";
import { StandardIcon } from "./common";

function Comment() {
    const theme = useTheme();
    
    return (
        <StandardIcon isFilled={theme.color}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 7.6H17V5.6H7V7.6Z" />
                <path d="M7 12.6H17V10.6H7V12.6Z" />
                <path fillRule="evenodd" clipRule="evenodd" d="M5 1.6C3.34315 1.6 2 2.94314 2 4.6V13.6C2 15.2569 3.34315 16.6 5 16.6H15.1716C15.4368 16.6 15.6911 16.7054 15.8787 16.8929L22 23.0142V4.6C22 2.94314 20.6569 1.6 19 1.6H5ZM4 4.6C4 4.04771 4.44772 3.6 5 3.6H19C19.5523 3.6 20 4.04771 20 4.6V18.1858L17.2929 15.4787C16.7303 14.9161 15.9672 14.6 15.1716 14.6H5C4.44772 14.6 4 14.1523 4 13.6V4.6Z" />
            </svg>
        </StandardIcon>
    );
}

export default Comment;