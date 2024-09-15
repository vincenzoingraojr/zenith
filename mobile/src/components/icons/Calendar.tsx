import { Path, Svg } from "react-native-svg";
import { COLORS } from "../../constants/colors";

const Calendar = () => {
    return (
        <Svg width="20" height="20" viewBox="0 0 24 24" fill={COLORS.white} stroke={"none"}>
            <Path d="M18 10C17.4477 10 17 10.4477 17 11C17 11.5523 17.4477 12 18 12C18.5523 12 19 11.5523 19 11C19 10.4477 18.5523 10 18 10Z" />
            <Path d="M14 18C13.4477 18 13 18.4477 13 19C13 19.5523 13.4477 20 14 20C14.5523 20 15 19.5523 15 19C15 18.4477 14.5523 18 14 18Z" />
            <Path d="M5 15C5 14.4477 5.44772 14 6 14C6.55228 14 7 14.4477 7 15C7 15.5523 6.55228 16 6 16C5.44772 16 5 15.5523 5 15Z" />
            <Path d="M10 14C9.44771 14 9 14.4477 9 15C9 15.5523 9.44771 16 10 16C10.5523 16 11 15.5523 11 15C11 14.4477 10.5523 14 10 14Z" />
            <Path d="M13 11C13 10.4477 13.4477 10 14 10C14.5523 10 15 10.4477 15 11C15 11.5523 14.5523 12 14 12C13.4477 12 13 11.5523 13 11Z" />
            <Path d="M14 14C13.4477 14 13 14.4477 13 15C13 15.5523 13.4477 16 14 16C14.5523 16 15 15.5523 15 15C15 14.4477 14.5523 14 14 14Z" />
            <Path d="M5 19C5 18.4477 5.44772 18 6 18C6.55228 18 7 18.4477 7 19C7 19.5523 6.55228 20 6 20C5.44772 20 5 19.5523 5 19Z" />
            <Path d="M10 18C9.44771 18 9 18.4477 9 19C9 19.5523 9.44771 20 10 20C10.5523 20 11 19.5523 11 19C11 18.4477 10.5523 18 10 18Z" />
            <Path d="M17 15C17 14.4477 17.4477 14 18 14C18.5523 14 19 14.4477 19 15C19 15.5523 18.5523 16 18 16C17.4477 16 17 15.5523 17 15Z" />
            <Path fillRule="evenodd" clipRule="evenodd" d="M8 3V1H6V3H4C2.34315 3 1 4.34315 1 6V20C1 21.6569 2.34315 23 4 23H20C21.6569 23 23 21.6569 23 20V6C23 4.34315 21.6569 3 20 3H18V1H16V3H8ZM21 7V6C21 5.44771 20.5523 5 20 5H4C3.44771 5 3 5.44772 3 6V7H21ZM3 9V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V9H3Z" />
        </Svg>
    );
};

export default Calendar;