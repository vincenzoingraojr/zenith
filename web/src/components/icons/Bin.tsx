import { FunctionComponent } from "react";
import { useTheme } from "../../styles/theme";
import { IconProps, StandardIcon } from "./common";

const Bin: FunctionComponent<IconProps> = ({ color }) => {
    const theme = useTheme();

    return (
        <StandardIcon isFilled={color ? color : theme.color}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 17.5H9V10.5H11V17.5Z" />
                <path d="M15 17.5H13V10.5H15V17.5Z" />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14 2C15.1046 2 16 2.89543 16 4V6H21C21.5523 6 22 6.44772 22 7C22 7.55228 21.5523 8 21 8H19.8672L18.1123 20.2832C17.9714 21.2683 17.1279 21.9999 16.1328 22H7.86719C6.93425 21.9999 6.13431 21.3569 5.92188 20.4648L5.8877 20.2832L4.13281 8H3C2.44772 8 2 7.55228 2 7C2 6.44772 2.44772 6 3 6H8V4C8 2.89543 8.89543 2 10 2H14ZM7.86719 20H16.1328L17.8467 8H6.15332L7.86719 20ZM10 6H14V4H10V6Z"
                />
            </svg>
        </StandardIcon>
    );
};

export default Bin;
