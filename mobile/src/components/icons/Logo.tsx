import { FunctionComponent, useEffect, useState } from "react";
import { Path, Svg } from "react-native-svg";
import { COLORS } from "../../constants/colors";

interface LogoProps {
    type?: "index-logo" | "default";
}

const Logo: FunctionComponent<LogoProps> = ({ type }) => {
    const [size, setSize] = useState(type === "index-logo" ? 128 : 36);

    useEffect(() => {
        if (type === "index-logo") {
            setSize(128);
        } else {
            setSize(36);
        }
    }, [type]);

    return (
        <Svg width={size} height={size} viewBox="0 0 32 32" fill={"none"} stroke={"none"}>
            <Path d="M32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16Z" fill={COLORS.blue} />
            <Path fillRule="evenodd" clipRule="evenodd" d="M6 16C11.5228 16 16 11.5228 16 6C16 11.5228 20.4772 16 26 16C20.4772 16 16 20.4772 16 26C16 20.4772 11.5228 16 6 16Z" fill={COLORS.white} />
        </Svg>
    );
};

export default Logo;