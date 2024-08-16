import { Text, View } from "react-native";
import { globalStyles } from "../constants/global";
import { useState } from "react";
import Button from "../components/ui/Button";
import InputField from "../components/ui/InputField";
import { textColorProp, theme } from "../constants/theme";
import { useSendRecoveryEmailMutation } from "../generated/graphql";
import Toast from "react-native-root-toast";
import { toastProps } from "../constants/toast";
import { toErrorMap } from "../utils/toErrorMap";
import { Layout } from "../components/Layout";
import AuthLayout from "../components/layouts/AuthLayout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
    RecoverPassword: any | undefined;
    FindUserBeforeLogIn: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "RecoverPassword">;

const RecoverPasswordScreen = ({ navigation }: Props) => {
    const styles = theme();
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const color = textColorProp();
    
    const [sendEmail] = useSendRecoveryEmailMutation();

    const handleSendEmail = async () => {
        const response = await sendEmail({
            variables: {
                email,
            },
        });

        if (response.data && response.data.sendRecoveryEmail) {
            if (response.data.sendRecoveryEmail.status && response.data.sendRecoveryEmail.status.length > 0) {
                Toast.show(response.data.sendRecoveryEmail.status as string, toastProps);
            } else {
                setErrors(
                    toErrorMap(
                        response.data.sendRecoveryEmail.errors!
                    )
                );
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
                                Recover your password
                            </Text>
                            <View style={globalStyles.authForm}>
                                <InputField field="email" errors={errors} placeholder="Email" value={email} onUpdateValue={(text) => setEmail(text)} keyboardType="email-address" />
                            </View>
                        </View>
                    }
                    bottomNav={
                        <View style={globalStyles.authBottomNav}>
                            <Button buttonStyle={{ backgroundColor: globalStyles.smallButton.backgroundColor, borderRadius: globalStyles.smallButton.borderRadius, borderWidth: globalStyles.smallButton.borderWidth, color, borderColor: color }} smallButton={true} text="Log in" onPress={() => { navigation.navigate("FindUserBeforeLogIn") }} />
                            <Button buttonStyle={globalStyles.standardButton} text="Send email" onPress={handleSendEmail} disabled={email.length <= 2} />
                        </View>
                    }
                />
            }
        />
    );
}

export default RecoverPasswordScreen;