import { Text, View } from "react-native";
import { globalStyles } from "../constants/global";
import { useState } from "react";
import Button from "../components/ui/Button";
import InputField from "../components/ui/InputField";
import { textColorProp, theme } from "../constants/theme";
import { useReactivateAccountMutation } from "../generated/graphql";
import Toast from "react-native-root-toast";
import { toastProps } from "../constants/toast";
import { toErrorMap } from "../utils/toErrorMap";
import { Layout } from "../components/Layout";
import AuthLayout from "../components/layouts/AuthLayout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
    ReactivateAccount: any | undefined;
    FindUserBeforeLogIn: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "ReactivateAccount">;

const ReactivateAccountScreen = ({ navigation }: Props) => {
    const styles = theme();
    const [input, setInput] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const color = textColorProp();
    
    const [reactivateAccount] = useReactivateAccountMutation();

    const handleReactivateAccount = async () => {
        const response = await reactivateAccount({
            variables: {
                input,
                password,
            },
        });

        setErrors({});

        if (response.data) {
            if (response.data.reactivateAccount.errors && response.data.reactivateAccount.errors.length > 0) {
                setErrors(
                    toErrorMap(
                        response.data.reactivateAccount.errors
                    )
                );
            } else {
                Toast.show(response.data.reactivateAccount.status as string, toastProps);
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
                                Reactivate your account
                            </Text>
                            <View style={globalStyles.authForm}>
                                <InputField field="input" errors={errors} placeholder="Username or email" value={input} onUpdateValue={(text) => setInput(text)} />
                                <InputField field="password" errors={errors} placeholder="Password" value={password} onUpdateValue={(text) => setPassword(text)} type="password" />
                            </View>
                        </View>
                    }
                    bottomNav={
                        <View style={globalStyles.authBottomNav}>
                            <Button buttonStyle={{ backgroundColor: globalStyles.smallButton.backgroundColor, borderRadius: globalStyles.smallButton.borderRadius, borderWidth: globalStyles.smallButton.borderWidth, color, borderColor: color }} smallButton={true} text="Log in" onPress={() => { navigation.navigate("FindUserBeforeLogIn") }} />
                            <Button buttonStyle={globalStyles.standardButton} text="Reactivate account" onPress={handleReactivateAccount} disabled={input.length <= 2 || password.length <= 2} />
                        </View>
                    }
                />
            }
        />
    );
}

export default ReactivateAccountScreen;