import { Text, View } from "react-native";
import { Layout } from "../components/Layout";
import AuthLayout from "../components/layouts/AuthLayout";
import { globalStyles } from "../constants/global";
import { textColorProp, theme } from "../constants/theme";
import Button from "../components/ui/Button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import InputField from "../components/ui/InputField";
import { useState } from "react";
import DatePicker from "../components/ui/DatePicker";
import { FieldError, useSignupMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import Toast from "react-native-root-toast";
import { toastProps } from "../constants/toast";
import DropDownPickerField from "../components/ui/DropDownPicker";

type RootStackParamList = {
    SignUp: any | undefined;
    FindUserBeforeLogIn: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "SignUp">;

const SignUpScreen = ({ navigation }: Props) => {
    const styles = theme();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [birthDate, setBirthDate] = useState(new Date());
    const [gender, setGender] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const color = textColorProp();

    const genderOptions = [
        { value: "Female", label: "Female" },
        { value: "Male", label: "Male" },
        { value: "Non-binary", label: "Non-binary" },
    ];

    const [signup] = useSignupMutation(); 

    const handleSignUp = async () => {
        const response = await signup({
            variables: {
                name,
                email,
                username,
                password,
                birthDate,
                gender,
            },
        });

        if (response.data && response.data.signup) {
            if (response.data.signup.status && response.data.signup.status.length > 0) {
                Toast.show(response.data.signup.status, toastProps);
            } else {
                setErrors(
                    toErrorMap(
                        response.data.signup.errors as FieldError[]
                    )
                );
            }
        } else {
            Toast.show("An unknown error has occurred, please try again later.", toastProps);
        }
    };

    return (
        <Layout
            content={
                <AuthLayout 
                    content={
                        <View style={globalStyles.authPageContainer}>
                            <Text style={[styles.text, globalStyles.authTitle]}>
                                Sign up
                            </Text>
                            <View style={globalStyles.authForm}>
                                <View style={globalStyles.birthDateWrapper}>
                                    {(errors && errors["birthDate"]) && (
                                        <Text style={[styles.text, globalStyles.error]}>{errors["birthDate"]}</Text>
                                    )}
                                    <View style={globalStyles.birthDateContainer}>
                                        <View style={globalStyles.birthDateInfo}>
                                            <Text style={[styles.text, globalStyles.birthDateLabel]}>Birthdate</Text>
                                            <Text style={[styles.text, globalStyles.birthDateString]}>{birthDate.toLocaleDateString("en-us", { month: "long", day: "numeric", year: "numeric" })}</Text>
                                        </View>
                                        <DatePicker value={birthDate} onUpdateValue={(date) => setBirthDate(date)} />
                                    </View>
                                </View>
                                <DropDownPickerField field="gender" placeholder="Gender" errors={errors} value={gender} onUpdateValue={setGender} options={genderOptions} />
                                <InputField field="name" errors={errors} placeholder="Full name" value={name} onUpdateValue={(text) => setName(text)} />
                                <InputField field="email" errors={errors} placeholder="Email" value={email} onUpdateValue={(text) => setEmail(text)} keyboardType="email-address" />
                                <InputField field="username" errors={errors} placeholder="Username" value={username} onUpdateValue={(text) => setUsername(text)} />
                                <InputField field="password" errors={errors} placeholder="Password" value={password} onUpdateValue={(text) => setPassword(text)} type="password" />
                            </View>
                        </View>
                    }
                    bottomNav={
                        <View style={globalStyles.authBottomNav}>
                            <Button buttonStyle={{ backgroundColor: globalStyles.smallButton.backgroundColor, borderRadius: globalStyles.smallButton.borderRadius, borderWidth: globalStyles.smallButton.borderWidth, color, borderColor: color }} smallButton={true} text="Log in" onPress={() => { navigation.navigate("FindUserBeforeLogIn") }} />
                            <Button buttonStyle={globalStyles.standardButton} text="Sign up" onPress={handleSignUp} disabled={email.length <= 2 || name.length === 0 || username.length <= 2 || password.length <= 2} />
                        </View>
                    }
                />
            }
        />
    );
}

export default SignUpScreen;