import { DynamicSizeIcon } from "./common";

function Close() {
    return (
        <DynamicSizeIcon hasStroke={"#FFFFFF"} size={16}>
            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 2L14 14M2 14L14 2" strokeWidth="2" strokeLinecap="round" />
            </svg>
        </DynamicSizeIcon>
    );
}

export default Close;
