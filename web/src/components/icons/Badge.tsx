import { FunctionComponent } from "react";
import { DynamicSizeIcon, IconSizeProps } from "./common";
import { COLORS } from "../../styles/colors";

const Badge: FunctionComponent<IconSizeProps> = ({ color, size }) => {
    return (
        <DynamicSizeIcon
            size={size || 16}
            isFilled={color ? color : COLORS.blue}
        >
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C13.691 0 15.185 0.840109 16.0898 2.125C17.6385 1.856 19.2894 2.31874 20.4854 3.51465C21.6811 4.71036 22.1427 6.36077 21.874 7.90918C23.1595 8.81399 24 10.3085 24 12C24 13.6913 23.1593 15.185 21.874 16.0898C22.1431 17.6385 21.6813 19.2894 20.4854 20.4854C19.2894 21.6813 17.6385 22.1431 16.0898 21.874C15.185 23.1593 13.6913 24 12 24C10.3085 24 8.81399 23.1595 7.90918 21.874C6.36077 22.1427 4.71036 21.6811 3.51465 20.4854C2.31874 19.2894 1.856 17.6385 2.125 16.0898C0.840109 15.185 0 13.691 0 12C0 10.3088 0.83985 8.81404 2.125 7.90918C1.85636 6.36082 2.31898 4.71031 3.51465 3.51465C4.71032 2.31899 6.36082 1.85636 7.90918 2.125C8.81404 0.83985 10.3088 0 12 0Z" />
                <path
                    d="M7 12L11.2857 16L17 8"
                    stroke={COLORS.white}
                    strokeWidth="2"
                    strokeLinecap="round"
                />
            </svg>
        </DynamicSizeIcon>
    );
};

export default Badge;
