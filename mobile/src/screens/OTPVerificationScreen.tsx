import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Layout } from "../components/Layout";
import AuthLayout from "../components/layouts/AuthLayout";
import { textColorProp, theme } from "../constants/theme";
import { Text, View } from "react-native";
import { globalStyles } from "../constants/global";
import InputField from "../components/ui/InputField";
import { useEffect, useState } from "react";
import Button from "../components/ui/Button";
import { MeDocument, MeQuery, User, useResendOtpMutation, useVerifyOtpMutation } from "../generated/graphql";
import { useAuth } from "../navigation/AuthContext";
import Toast from "react-native-root-toast";
import { toastProps } from "../constants/toast";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
    OTPVerification: { 
        from: string, 
        isLogin: boolean,
        input?: string, 
        password?: string,
        clientName?: string,
        clientOS?: string,
        clientType?: string,
    };
    DrawerTabStack: undefined;
};

type OTPVerificationRouteProp = RouteProp<RootStackParamList, "OTPVerification">;

type Props = NativeStackScreenProps<RootStackParamList, "OTPVerification">;

const OTPVerificationScreen = () => {
    const route = useRoute<OTPVerificationRouteProp>();
    const navigation = useNavigation<Props["navigation"]>();
    const styles = theme();
    const [otp, setOtp] = useState("");
    const color = textColorProp();

    const [verifyOTP] = useVerifyOtpMutation();
    const { login } = useAuth();

    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }

            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                } else {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [minutes, seconds]);

    const [resendOTP] = useResendOtpMutation();

    const handleOTPVerification = async () => {
        const response = await verifyOTP({
            variables: {
                otp,
                input: route.params.input || "",
                password: route.params.password || "",
                isLogin: route.params.isLogin,
                clientOS: route.params.clientOS || "",
                clientType: route.params.clientType || "",
                clientName: route.params.clientName || "",
            },
            update: (store, { data }) => {
                if (data && data.verifyOTP.user && data.verifyOTP.ok) {
                    store.writeQuery<MeQuery>({
                        query: MeDocument,
                        data: {
                            me: data.verifyOTP
                                .user as User,
                        },
                    });
                }
            },
        });

        if (response.data) {
            Toast.show(response.data.verifyOTP.status as string, toastProps);

            if (response.data.verifyOTP.user && response.data.verifyOTP.ok) {
                if (response.data.verifyOTP.accessToken && route.params.isLogin) {
                    await login(response.data.verifyOTP.accessToken);

                    navigation.navigate("DrawerTabStack");
                }
            }
        } else {
            Toast.show("An error has occurred, please try again later.", toastProps);
        } 
    }

    return (
        <Layout
            content={
                <AuthLayout 
                    content={
                        <View style={globalStyles.authPageContainer}>
                            <Text style={[styles.text, globalStyles.authTitle]}>
                                Enter the OTP
                            </Text>
                            <View style={globalStyles.authForm}>
                                <InputField field="otp" placeholder="One-time password" value={otp} onUpdateValue={(text) => setOtp(text)} />
                            </View>
                        </View>
                    }
                    bottomNav={
                        <View style={globalStyles.authBottomNav}>
                            <Button buttonStyle={{ backgroundColor: globalStyles.smallButton.backgroundColor, borderRadius: globalStyles.smallButton.borderRadius, borderWidth: globalStyles.smallButton.borderWidth, color, borderColor: color }} smallButton={true} text={(seconds > 0 || minutes > 0) ? `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}` : "Resend OTP"} disabled={seconds > 0 || minutes > 0} onPress={async () => {
                                const response = await resendOTP({
                                    variables: {
                                        input: route.params.input || "",
                                        password: route.params.password || "",
                                    },
                                });

                                if (response.data && response.data.resendOTP) {
                                    setMinutes(2);
                                    setSeconds(59);
                                }
                            }} />
                            <Button buttonStyle={globalStyles.standardButton} text="Verify OTP" onPress={handleOTPVerification} disabled={otp.length < 6} />
                        </View>
                    }
                />
            }
        />
    );
}

export default OTPVerificationScreen;