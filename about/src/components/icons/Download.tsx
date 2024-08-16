import { StandardIcon } from "./common";

function Download() {
    return (
        <StandardIcon isFilled={"#FFFFFF"}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.2929 17.7071C11.6834 18.0976 12.3166 18.0976 12.7071 17.7071L19.0711 11.3431C19.4616 10.9526 19.4616 10.3195 19.0711 9.92893C18.6805 9.53841 18.0474 9.53841 17.6569 9.92893L13 14.5858V2H11V14.5858L6.34315 9.92893C5.95262 9.53841 5.31946 9.53841 4.92893 9.92893C4.53841 10.3195 4.53841 10.9526 4.92893 11.3431L11.2929 17.7071Z" />
                <path d="M4 20V15H2V20C2 21.1046 2.89543 22 4 22H20C21.1046 22 22 21.1046 22 20V15H20V20H4Z" />
            </svg>
        </StandardIcon>
    );
}

export default Download;