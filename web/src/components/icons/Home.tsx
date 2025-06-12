import { FunctionComponent } from "react";
import { DynamicSizeIcon, IconProps } from "./common";
import { COLORS } from "../../styles/colors";
import { useTheme } from "../../styles/theme";

const Home: FunctionComponent<IconProps> = ({ isActive }) => {
    const theme = useTheme();

    return (
        <DynamicSizeIcon
            size={26}
            isFilled={isActive ? COLORS.blue : theme.color}
        >
            {isActive ? (
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1 20C1 21.1046 1.89543 22 3 22H10V20V17C10 16.4477 10.4477 16 11 16H13C13.5523 16 14 16.4477 14 17V20V22H21C22.1046 22 23 21.1046 23 20V11.5277C23 10.5679 22.5407 9.666 21.7645 9.10147L12 2L2.23548 9.10147C1.45925 9.666 1 10.5679 1 11.5277V20Z"
                    />
                </svg>
            ) : (
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1 20C1 21.1046 1.89543 22 3 22H10V20V17C10 16.4477 10.4477 16 11 16H13C13.5523 16 14 16.4477 14 17V20V22H21C22.1046 22 23 21.1046 23 20V11.5277C23 10.5679 22.5407 9.666 21.7645 9.10147L12 2L2.23548 9.10147C1.45925 9.666 1 10.5679 1 11.5277V20ZM21 20V11.5277C21 11.2077 20.8469 10.9071 20.5882 10.7189L12 4.47299L3.41183 10.7189C3.15308 10.9071 3 11.2077 3 11.5277V20H8V17C8 15.3431 9.34315 14 11 14H13C14.6569 14 16 15.3431 16 17V20H21Z"
                    />
                </svg>
            )}
        </DynamicSizeIcon>
    );
};

export default Home;
