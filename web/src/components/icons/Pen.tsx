import { FunctionComponent } from "react";
import { useTheme } from "../../styles/theme";
import { IconProps, StandardIcon } from "./common";

const Pen: FunctionComponent<IconProps> = ({ color }) => {
    const theme = useTheme();
    
    return (
        <StandardIcon hasStroke={color ? color : theme.color}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.0208 5.82843L18.2635 10.0711M4.12132 19.9706L4.4465 15.7432C4.46481 15.5052 4.56766 15.2816 4.73645 15.1128L16.1421 3.70711C16.5327 3.31658 17.1658 3.31658 17.5563 3.70711L20.3848 6.53553C20.7753 6.92606 20.7753 7.55922 20.3848 7.94975L8.97909 19.3554C8.8103 19.5242 8.58669 19.6271 8.34868 19.6454L4.12132 19.9706Z" strokeWidth="2" strokeLinecap="round" />
            </svg>
        </StandardIcon>
    );
};

export default Pen;