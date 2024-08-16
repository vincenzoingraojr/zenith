import { FunctionComponent } from "react";
import { theme } from "../constants/theme";
import { ScrollView, View } from "react-native";

interface LayoutProps {
    content: JSX.Element;
}

export const ScrollableLayout: FunctionComponent<LayoutProps> = ({ content }) => {
    const styles = theme();
    
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {content}
            </ScrollView>
        </View>
    );
}