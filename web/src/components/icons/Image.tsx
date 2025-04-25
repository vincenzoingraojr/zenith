import { StandardIcon } from "./common";
import { useTheme } from "../../styles/theme";

function Image() {
    const theme = useTheme();

    return (
        <StandardIcon isFilled={theme.color}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.5 8C7.32843 8 8 7.32843 8 6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8Z" />
                <path fillRule="evenodd" clipRule="evenodd" d="M5 2C3.34315 2 2 3.34315 2 5V19C2 20.6569 3.34315 22 5 22H19C20.6569 22 22 20.6569 22 19V5C22 3.34315 20.6569 2 19 2H5ZM4 5C4 4.44772 4.44772 4 5 4H19C19.5523 4 20 4.44772 20 5V8.58579L18.452 7.03774C17.642 6.22783 16.3187 6.26223 15.552 7.11312L11.1616 11.9853L10.5185 11.235C9.72032 10.3038 8.27968 10.3038 7.48149 11.235L4 15.2967V5ZM17.0377 8.45196L20 11.4142V19C20 19.5523 19.5523 20 19 20H17.9684L15.7682 17.3598L15.7593 17.3492L12.4741 13.5165L17.0377 8.45196ZM14.2362 18.6455L15.365 20H5C4.44772 20 4 19.5523 4 19V18.3699L9 12.5366L14.2362 18.6455Z" />
            </svg>
        </StandardIcon>
    );
};

export default Image;