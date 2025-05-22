import { FunctionComponent } from "react";
import { DynamicSizeIcon, IconProps } from "./common";
import { COLORS } from "../../styles/colors";
import { useTheme } from "../../styles/theme";

const Like: FunctionComponent<IconProps> = ({ isActive }) => {
    const theme = useTheme();

    return (
        <DynamicSizeIcon size={22} isFilled={isActive ? COLORS.red : theme.color}>
            {isActive ? (
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M20.4829 4.39237C22.8261 6.73551 22.8261 10.5345 20.4829 12.8777L11.9976 21.3629L3.51236 12.8777C1.16922 10.5345 1.16922 6.73551 3.51236 4.39237C5.85551 2.04922 9.6545 2.04922 11.9976 4.39237C14.3408 2.04922 18.1398 2.04922 20.4829 4.39237Z" />
                </svg>
            ) : (
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M20.4829 4.39237C22.8261 6.73551 22.8261 10.5345 20.4829 12.8777L11.9976 21.3629L3.51236 12.8777C1.16922 10.5345 1.16922 6.73551 3.51236 4.39237C5.85551 2.04922 9.6545 2.04922 11.9976 4.39237C14.3408 2.04922 18.1398 2.04922 20.4829 4.39237ZM4.92658 11.4634C3.36448 9.90134 3.36448 7.36868 4.92658 5.80658C6.48867 4.24449 9.02133 4.24449 10.5834 5.80658L11.9976 7.2208L13.4119 5.80658C14.974 4.24449 17.5066 4.24449 19.0687 5.80658C20.6308 7.36868 20.6308 9.90134 19.0687 11.4634L17.6545 12.8777L11.9976 18.5345L6.34079 12.8777L4.92658 11.4634Z" />
                </svg>
            )}
        </DynamicSizeIcon>
    );
};

export default Like;