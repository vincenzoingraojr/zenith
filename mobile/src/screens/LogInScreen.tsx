import { Platform, Text, View } from "react-native";
import { globalStyles } from "../constants/global";
import { useEffect, useState } from "react";
import Button from "../components/ui/Button";
import InputField from "../components/ui/InputField";
import { textColorProp, theme } from "../constants/theme";
import { MeDocument, MeQuery, User, useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { toastProps } from "../constants/toast";
import Toast from "react-native-root-toast";
import { useAuth } from "../navigation/AuthContext";
import { Layout } from "../components/Layout";
import AuthLayout from "../components/layouts/AuthLayout";
import { getUserLocationFromAPI } from "../utils/getLocation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import * as Device from "expo-device";

type RootStackParamList = {
    LogIn: { input: string | null };
    OTPVerification: { 
        from: string, 
        isLogin: boolean, 
        input: string, 
        password: string,
        clientName: string,
        clientOS: string,
        clientType: string,
        deviceLocation: string,
        country: string,
    };
    RecoverPassword: undefined;
};

type LogInRouteProp = RouteProp<RootStackParamList, "LogIn">;

type Props = NativeStackScreenProps<RootStackParamList, "LogIn">;

const LogInScreen = () => {
    const route = useRoute<LogInRouteProp>();
    const navigation = useNavigation<Props["navigation"]>();
    const styles = theme();
    const [input, setInput] = useState(route.params.input || "");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [loginMutation] = useLoginMutation();
    const { login } = useAuth();
    const color = textColorProp();

    const [userLocation, setUserLocation] = useState("");
    const [country, setCountry] = useState("");

    useEffect(() => {
        const response = getUserLocationFromAPI();

        response.then((response) => {
            setUserLocation(`${response.data.city}, ${response.data.country}`);
            setCountry(response.data.country);
        });
    }, []);

    const handleLogin = async () => {
        const response = await loginMutation({
            variables: {
                input,
                password,
                clientName: Device.modelName || "Unknown",
                clientOS: Platform.OS,
                clientType: Platform.OS === "web" ? "browser" : "native",
                deviceLocation: userLocation,
                country,
            },
            update: (store, { data }) => {
                if (data && data.login && data.login.user) {
                    store.writeQuery<MeQuery>({
                        query: MeDocument,
                        data: {
                            me: data.login.user as User,
                        },
                    });
                }
            },
        });

        setErrors({});

        if (response.data) {
            if (response.data.login.ok && response.data.login.accessToken && response.data.login.user) {
                Toast.show(response.data.login.status as string, toastProps);
                await login(response.data.login.accessToken);
            } else if (response.data.login.user && response.data.login.user.userSettings.twoFactorAuth && response.data.login.status === "otp_sent") {
                navigation.navigate("OTPVerification", { 
                    from:
                        route.name,
                    isLogin: true,
                    input,
                    password,
                    clientName: Device.modelName || "Unknown",
                    clientOS: Platform.OS,
                    clientType: Platform.OS === "web" ? "browser" : "native",
                    deviceLocation: userLocation,
                    country,
                });
            } else if (response.data.login.user && response.data.login.status === "account_deactivated") {
                console.log("Recover your account.");
            } else {
                if (response.data.login.errors && response.data.login.errors.length > 0) {
                    setErrors(
                        toErrorMap(response.data.login.errors)
                    );
                } else {
                    Toast.show(response.data.login.status as string, toastProps);
                }
            }
        } else {
            Toast.show("An error has occurred, please try again later.", toastProps);
        }       
    };

    return (
        <Layout
            content={
                <AuthLayout 
                    content={
                        <View style={globalStyles.authPageContainer}>
                            <Text style={[styles.text, globalStyles.authTitle]}>
                                Enter your password
                            </Text>
                            <View style={globalStyles.authForm}>
                                <InputField field="input" errors={errors} placeholder="Username or email" value={input} onUpdateValue={(text) => setInput(text)} />
                                <InputField field="password" errors={errors} placeholder="Password" value={password} onUpdateValue={(text) => setPassword(text)} type="password" />
                            </View>
                        </View>
                    }
                    bottomNav={
                        <View style={globalStyles.authBottomNav}>
                            <Button buttonStyle={{ backgroundColor: globalStyles.smallButton.backgroundColor, borderRadius: globalStyles.smallButton.borderRadius, borderWidth: globalStyles.smallButton.borderWidth, color, borderColor: color }} smallButton={true} text="Forgot password?" onPress={() => { navigation.navigate("RecoverPassword") }} />
                            <Button buttonStyle={globalStyles.standardButton} text="Log in" onPress={handleLogin} disabled={input.length <= 2 || password.length <= 2} />
                        </View>
                    }
                />
            }
        />
    );
}

export default LogInScreen;