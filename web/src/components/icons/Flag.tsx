import { useTheme } from "../../styles/theme";
import { StandardIcon } from "./common";

function Flag() {
    const theme = useTheme();

    return (
        <StandardIcon hasStroke={theme.color}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M6 21V13M6 13V3H18L14.5 8L18 13H6Z"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
            </svg>
        </StandardIcon>
    );
}

export default Flag;
