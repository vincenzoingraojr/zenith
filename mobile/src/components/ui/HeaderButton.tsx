import { FunctionComponent } from "react";
import { TouchableOpacity } from "react-native";
import { globalStyles } from "../../constants/global";

interface HeaderButtonProps {
    children: JSX.Element;
    onPress?: () => void;
}

const HeaderButton: FunctionComponent<HeaderButtonProps> = ({ children, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={globalStyles.headerButton}
        >
            {children}
        </TouchableOpacity>
    );
}

export default HeaderButton;