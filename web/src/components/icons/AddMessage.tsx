import { useTheme } from "../../styles/theme";
import { StandardIcon } from "./common";

function AddMessage() {
    const theme = useTheme();
    
    return (
        <StandardIcon isFilled={theme.color}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 16.5C19.5523 16.5 20 16.9477 20 17.5V19H21.5C22.0523 19 22.5 19.4477 22.5 20C22.5 20.5523 22.0523 21 21.5 21H20V22.5C20 23.0523 19.5523 23.5 19 23.5C18.4477 23.5 18 23.0523 18 22.5V21H16.5C15.9477 21 15.5 20.5523 15.5 20C15.5 19.4477 15.9477 19 16.5 19H18V17.5C18 16.9477 18.4477 16.5 19 16.5Z" />
                <path fillRule="evenodd" clipRule="evenodd" d="M20 1C21.6569 1 23 2.34315 23 4V17C22.4843 16.3136 21.7964 15.764 21 15.416V7.61816L12.8945 11.6709C12.3315 11.9524 11.6685 11.9524 11.1055 11.6709L3 7.61816V18C3 18.5523 3.44772 19 4 19H14.1006C14.035 19.3231 14 19.6575 14 20C14 20.3425 14.035 20.6769 14.1006 21H4C2.34315 21 1 19.6569 1 18V4C1 2.34315 2.34315 1 4 1H20ZM4 3C3.44771 3 3 3.44772 3 4V5.38184L12 9.88184L21 5.38184V4C21 3.44771 20.5523 3 20 3H4Z" />
            </svg>
        </StandardIcon>
    );
}

export default AddMessage;