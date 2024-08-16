import { Text, View } from "react-native";
import { Layout } from "../components/Layout";
import { theme } from "../constants/theme";

const NotificationScreen = () => {
    const styles = theme();

    return (
        <Layout 
            content={
                <View style={styles.container}>
                    <Text style={styles.text}>Notifications</Text>
                </View>
            }
        />
    );
}

export default NotificationScreen;