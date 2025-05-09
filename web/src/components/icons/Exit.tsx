import { FunctionComponent, useEffect, useState } from "react";
import { useTheme } from "../../styles/theme";
import { DynamicSizeIcon, LinkIconProps } from "./common";

const Exit: FunctionComponent<LinkIconProps> = ({ color, type }) => {
    const [size, setSize] = useState(type === "nav" ? 26 : 24);
    const theme = useTheme();

    useEffect(() => {
        if (type === "nav") {
            setSize(26);
        } else {
            setSize(24);
        }
    }, [type]);
    
    return (
        <DynamicSizeIcon size={size} isFilled={color ? color : theme.color}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2V4H4V20H10V22H4C2.89547 22 2 21.1045 2 20V4C2 2.89546 2.89547 2.00005 4 2H10Z" />
                <path d="M13.9287 4.92871C14.3191 4.53829 14.9522 4.53848 15.3428 4.92871L21.707 11.293C22.0976 11.6835 22.0976 12.3165 21.707 12.707L15.3428 19.0713C14.9522 19.4615 14.3191 19.4617 13.9287 19.0713C13.5383 18.6809 13.5385 18.0478 13.9287 17.6572L18.5859 13H6V11H18.5859L13.9287 6.34277C13.5385 5.95223 13.5383 5.31914 13.9287 4.92871Z" />
            </svg>
        </DynamicSizeIcon>
    );
};

export default Exit;