import { Text, View } from "react-native";
import { textColorProp, theme } from "../constants/theme";
import { globalStyles } from "../constants/global";
import { useState } from "react";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import { Layout } from "../components/Layout";
import AuthLayout from "../components/layouts/AuthLayout";
import { useFindUserBeforeLogInMutation } from "../generated/graphql";
import Toast from "react-native-root-toast";
import { toastProps } from "../constants/toast";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
    FindUserBeforeLogIn: any | undefined;
    RecoverPassword: undefined;
    LogIn: { input: string };
};

type Props = NativeStackScreenProps<RootStackParamList, "FindUserBeforeLogIn">;

const FindUserBeforeLogInScreen = ({ navigation }: Props) => {
    const styles = theme();
    const [input, setInput] = useState("");

    const color = textColorProp();

    const [findUser] = useFindUserBeforeLogInMutation();

    const handleFindUser = async () => {
        const response = await findUser({
            variables: {
                input,
            },
        });

        if (response.data && response.data.findUserBeforeLogIn) {
            if (response.data.findUserBeforeLogIn.status && response.data.findUserBeforeLogIn.status.length > 0) {
                Toast.show(response.data.findUserBeforeLogIn.status, toastProps);
            }

            if (response.data.findUserBeforeLogIn.user) {
                navigation.navigate("LogIn", { input });
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
                                Enter your email address or @username
                            </Text>
                            <View style={globalStyles.authForm}>
                                <InputField field="input" placeholder="Username or email" value={input} onUpdateValue={(text) => setInput(text)} />
                            </View>
                        </View>
                    }
                    bottomNav={
                        <View style={globalStyles.authBottomNav}>
                            <Button buttonStyle={{ backgroundColor: globalStyles.smallButton.backgroundColor, borderRadius: globalStyles.smallButton.borderRadius, borderWidth: globalStyles.smallButton.borderWidth, color, borderColor: color }} smallButton={true} text="Forgot password?" onPress={() => { navigation.navigate("RecoverPassword") }} />
                            <Button buttonStyle={globalStyles.standardButton} text="Next" onPress={handleFindUser} disabled={input.length <= 2} />
                        </View>
                    }
                />
            }
        />
    );
}

export default FindUserBeforeLogInScreen;
