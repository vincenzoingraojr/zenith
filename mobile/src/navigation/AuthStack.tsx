import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Index from "../screens/IndexScreen";
import { theme } from "../constants/theme";
import FindUserBeforeLogInScreen from "../screens/FindUserBeforeLogInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import RecoverPasswordScreen from "../screens/RecoverPasswordScreen";
import Logo from "../components/icons/Logo";
import LogInScreen from "../screens/LogInScreen";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    const styles = theme();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
                headerStyle: { backgroundColor: styles.header.backgroundColor },
                headerTintColor: styles.text.color,
                headerShadowVisible: false,
                headerTitleAlign: "center",
                animation: "simple_push",
                headerTitle: () => <Logo />,
            }}
            initialRouteName="Index"
        >
            <Stack.Screen 
                name="Index" 
                component={Index}
            />
            <Stack.Screen 
                name="FindUserBeforeLogIn" 
                component={FindUserBeforeLogInScreen}
            />
            <Stack.Screen 
                name="LogIn" 
                component={LogInScreen} 
                initialParams={{ input: null }}
            />
            <Stack.Screen 
                name="SignUp" 
                component={SignUpScreen} 
            />
            <Stack.Screen 
                name="RecoverPassword" 
                component={RecoverPasswordScreen}
            />
        </Stack.Navigator>
    );
}

export default AuthStack;