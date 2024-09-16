import { FunctionComponent } from "react";
import { Path, Svg } from "react-native-svg";

interface DownProps {
    mode: boolean;
    color: string;
}

const Down: FunctionComponent<DownProps> = ({ mode, color }) => {
    return (
        <Svg width="12" height="12" viewBox="0 0 16 16" fill={"none"} stroke={color} style={{ transform: [{ rotate: mode ? "180deg" : "0deg" }], transformOrigin: "center" }}>
            <Path d="M1 4L7.24742 11.1399C7.64584 11.5952 8.35417 11.5952 8.75258 11.1399L15 4" strokeWidth="2" />
        </Svg>
    );
};

export default Down;