import { Text, View } from "react-native";
import { Layout } from "../../components/Layout";
import { theme } from "../../constants/theme";

const MessagesScreen = () => {
    const styles = theme();

    return (
        <Layout 
            content={
                <View style={styles.container}>
                    <Text style={styles.text}>Messages</Text>
                </View>
            }
        />
    );
}

export default MessagesScreen;