import { Text, View } from "react-native";
import { useMeQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import { theme } from "../constants/theme";

const ProfileScreen = () => {
    const { data } = useMeQuery({ fetchPolicy: "cache-and-network" });
    const styles = theme();

    return (
        <Layout 
            content={
                <View style={styles.container}>
                    <Text style={styles.text}>@{data?.me?.username}</Text>
                </View>
            }
        />
    );
}

export default ProfileScreen;