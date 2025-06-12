import { useTheme } from "../../styles/theme";
import { StandardIcon } from "./common";

function Block() {
    const theme = useTheme();

    return (
        <StandardIcon isFilled={theme.color}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM20 12C20 16.4183 16.4183 20 12 20C10.1513 20 8.44904 19.3729 7.09436 18.3199L18.3199 7.09436C19.3729 8.44904 20 10.1513 20 12ZM5.68014 16.9056L16.9056 5.68014C15.551 4.62708 13.8487 4 12 4C7.58172 4 4 7.58172 4 12C4 13.8487 4.62708 15.551 5.68014 16.9056Z" />
            </svg>
        </StandardIcon>
    );
};

export default Block;