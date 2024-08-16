import { Text, StyleSheet, View, useColorScheme } from "react-native";
import { Layout } from "../components/Layout";
import { textColorProp, theme } from "../constants/theme";
import Button from "../components/ui/Button";
import { COLORS } from "../constants/colors";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import AuthLayout from "../components/layouts/AuthLayout";
import { globalStyles } from "../constants/global";

type RootStackParamList = {
    Index: any | undefined;
    FindUserBeforeLogIn: undefined;
    SignUp: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Index">;

const IndexScreen = ({ navigation }: Props) => {
    const styles = theme();
    const colorScheme = useColorScheme();

    return (
        <Layout
            content={
                <AuthLayout 
                    content={
                        <View style={index.innerContainer}>
                            <Text style={[styles.text, globalStyles.authTitle]}>
                                The everything app.
                            </Text>
                            <Text style={[styles.text, index.description]}>
                                Find out what's happening in the world in real time,
                                chat and make video calls with whoever you want.
                                Send and receive money.
                            </Text>
                            <View style={index.buttonsContainer}>
                                <Button buttonStyle={index.loginButton} text="Log in" onPress={() => { navigation.navigate("FindUserBeforeLogIn") }} />
                                <Button buttonStyle={{ 
                                    backgroundColor: textColorProp(),
                                    color: colorScheme === "dark" ? COLORS.black : COLORS.white,
                                }} text="Sign up" onPress={() => { navigation.navigate("SignUp") }} />
                            </View>
                        </View>
                    }
                    bottomNav={
                        <View style={index.footerContainer}>
                            <Text style={[styles.text, index.footer]}>&copy; {new Date().getFullYear()} Zenith</Text>
                        </View>
                    }
                />
            }
        />
    );
}

const index = StyleSheet.create({
    innerContainer: {
        marginTop: 64,
        paddingLeft: 32,
        paddingRight: 32,
        marginBottom: 48,
    },
    buttonsContainer: {
        flexDirection: "column",
        maxWidth: 400,
        gap: 24,
    },
    loginButton: {
        backgroundColor: COLORS.blue,
        color: COLORS.white,
    },
    description: {
        fontSize: 18,
        marginBottom: 48,
    },
    footerContainer: {
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        paddingLeft: 32,
        paddingRight: 32,
        height: 100,
        rowGap: 4,
        columnGap: 12,
    },
    footer: {
        fontSize: 14,
    }
});

export default IndexScreen;