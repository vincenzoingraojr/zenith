import { useTheme } from "../../styles/theme";
import { DynamicSizeIcon } from "./common";

function Share() {
    const theme = useTheme();
    
    return (
        <DynamicSizeIcon size={22} isFilled={theme.color}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 14V20H20V14H22V20C22 21.1046 21.1045 22 20 22H4C2.89546 22 2.00004 21.1046 2 20V14H4Z" />
                <path d="M11.293 2.29299C11.6835 1.90246 12.3165 1.90246 12.707 2.29299L19.0713 8.65724C19.4615 9.04779 19.4617 9.68089 19.0713 10.0713C18.6809 10.4617 18.0478 10.4615 17.6572 10.0713L13 5.41408V18H11V5.41408L6.34277 10.0713C5.95224 10.4615 5.31913 10.4617 4.92871 10.0713C4.5383 9.68089 4.53852 9.04779 4.92871 8.65724L11.293 2.29299Z" />
            </svg>
        </DynamicSizeIcon>
    );
}

export default Share;