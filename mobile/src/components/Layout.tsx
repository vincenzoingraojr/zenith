import { View } from "react-native";
import { FunctionComponent } from "react";
import { theme } from "../constants/theme";

interface LayoutProps {
    content: JSX.Element;
}

export const Layout: FunctionComponent<LayoutProps> = ({ content }) => {
    const styles = theme();
    
    return (
        <View style={styles.container}>
            {content}
        </View>
    );
}