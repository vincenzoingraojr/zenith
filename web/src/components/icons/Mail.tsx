import { FunctionComponent } from "react";
import { DynamicSizeIcon, IconProps } from "./common";
import { COLORS } from "../../styles/colors";
import { useTheme } from "../../styles/theme";

const Mail: FunctionComponent<IconProps> = ({ isActive }) => {
    const theme = useTheme();

    return (
        <DynamicSizeIcon size={26} isFilled={isActive ? COLORS.blue : theme.color}>
            {isActive ? (
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 2C2.34315 2 1 3.34315 1 5V5.38197L12 10.882L23 5.38197V5C23 3.34315 21.6569 2 20 2H4Z" />
                    <path d="M23 7.61803L12.8944 12.6708C12.3314 12.9523 11.6686 12.9523 11.1056 12.6708L1 7.61803V19C1 20.6569 2.34315 22 4 22H20C21.6569 22 23 20.6569 23 19V7.61803Z" />
                </svg>                
            ) : (
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M1 5C1 3.34315 2.34315 2 4 2H20C21.6569 2 23 3.34315 23 5V19C23 20.6569 21.6569 22 20 22H4C2.34315 22 1 20.6569 1 19V5ZM21 8.61803V19C21 19.5523 20.5523 20 20 20H4C3.44772 20 3 19.5523 3 19V8.61803L11.1056 12.6708C11.6686 12.9523 12.3314 12.9523 12.8944 12.6708L21 8.61803ZM21 6.38197V5C21 4.44772 20.5523 4 20 4H4C3.44771 4 3 4.44772 3 5V6.38197L12 10.882L21 6.38197Z" />
                </svg>
            )}
        </DynamicSizeIcon>
    );
};

export default Mail;