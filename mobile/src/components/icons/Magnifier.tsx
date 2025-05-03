import { FunctionComponent, useEffect, useState } from "react";
import { Path, Svg } from "react-native-svg";
import { IconProps } from "./common";
import { COLORS } from "../../constants/colors";
import { textColorProp } from "../../constants/theme";

interface MagnifierProps extends IconProps {
    type?: "normal" | "small";
}

const Magnifier: FunctionComponent<MagnifierProps> = ({ isActive, type }) => {
    const color = textColorProp();
    const [size, setSize] = useState<number>(26);

    useEffect(() => {
        if (type === "normal") {
            setSize(26);
        } else {
            setSize(18);
        }
    }, [type]);

    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill={"none"} stroke={isActive ? COLORS.blue : color}>
            {isActive ? (
                <Path d="M14.8593 14.8593L20 20M14.8593 14.8593C17.3435 12.3751 17.3435 8.34739 14.8593 5.86317C12.3751 3.37894 8.34739 3.37894 5.86317 5.86317C3.37894 8.34739 3.37894 12.3751 5.86317 14.8593C8.34739 17.3435 12.3751 17.3435 14.8593 14.8593Z" strokeWidth="3" strokeLinecap="round" />
            ) : (
                <Path d="M14.8593 14.8593L20 20M14.8593 14.8593C17.3435 12.3751 17.3435 8.34739 14.8593 5.86317C12.3751 3.37894 8.34739 3.37894 5.86317 5.86317C3.37894 8.34739 3.37894 12.3751 5.86317 14.8593C8.34739 17.3435 12.3751 17.3435 14.8593 14.8593Z" strokeWidth="2" strokeLinecap="round" />
            )}
        </Svg>
    );
};

export default Magnifier;