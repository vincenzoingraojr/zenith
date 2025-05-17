import { useTheme } from "../../styles/theme";
import { StandardIcon } from "./common";

function Repost() {
    const theme = useTheme();
    
    return (
        <StandardIcon isFilled={theme.color}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 4C18.2091 4 20 5.79086 20 8V16.5859L22.293 14.293L23.707 15.707L19.7071 19.707C19.3166 20.0975 18.6834 20.0975 18.2929 19.707L14.293 15.707L15.707 14.293L18 16.5859V8C18 6.89543 17.1046 6 16 6H9.5V4H16Z" />
                <path d="M9.70703 8.29297L8.29297 9.70703L6 7.41406V16C6 17.1046 6.89543 18 8 18H14.5V20H8C5.79086 20 4 18.2091 4 16V7.41406L1.70703 9.70703L0.292969 8.29297L4.29289 4.29304C4.68342 3.90252 5.31658 3.90252 5.70711 4.29304L9.70703 8.29297Z" />
            </svg>
        </StandardIcon>
    );
}

export default Repost;