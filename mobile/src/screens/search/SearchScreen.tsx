import { Text, View } from "react-native";
import { Layout } from "../../components/Layout";
import { theme } from "../../constants/theme";

const SearchScreen = () => {
    const styles = theme();

    return (
        <Layout 
            content={
                <View style={styles.container}>
                    <Text style={styles.text}>Search on Zenith</Text>
                </View>
            }
        />
    );
}

export default SearchScreen;