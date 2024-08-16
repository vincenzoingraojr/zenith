import { FunctionComponent } from "react";
import { Path, Svg } from "react-native-svg";
import { IconProps } from "./common";
import { COLORS } from "../../constants/colors";
import { textColorProp } from "../../constants/theme";

const Home: FunctionComponent<IconProps> = ({ isActive }) => {
    const color = textColorProp();

    return (
        <Svg width="30" height="30" viewBox="0 0 24 24" fill={isActive ? COLORS.blue : "none"} stroke={isActive ? COLORS.blue : color}>
            {isActive ? (
                <Path
                    d="M10.7506 3.99951C11.481 3.41516 12.519 3.41516 13.2494 3.99951L21.2494 10.3995C21.7238 10.7791 22 11.3537 22 11.9612V19C22 20.1046 21.1046 21 20 21H15.5V15.5C15.5 14.3954 14.6046 13.5 13.5 13.5H10.5C9.39543 13.5 8.5 14.3954 8.5 15.5V21H4C2.89543 21 2 20.1046 2 19V11.9612C2 11.3537 2.27618 10.7791 2.75061 10.3995L10.7506 3.99951Z"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
            ) : (
                <Path
                    d="M21.2494 10.3995L13.2494 3.99951C12.519 3.41516 11.481 3.41516 10.7506 3.99951L2.75061 10.3995C2.27618 10.7791 2 11.3537 2 11.9612V19C2 20.1046 2.89543 21 4 21H9V16C9 14.8954 9.89543 14 11 14H13C14.1046 14 15 14.8954 15 16V21H20C21.1046 21 22 20.1046 22 19V11.9612C22 11.3537 21.7238 10.7791 21.2494 10.3995Z"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
            )}
        </Svg>
    );
};

export default Home;
