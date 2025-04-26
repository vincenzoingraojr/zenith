import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import { theme } from "../constants/theme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "./DrawerContent";
import Home from "../components/icons/Home";
import { Image } from "expo-image";
import { useMeQuery } from "../generated/graphql";
import { useEffect, useState } from "react";
import { globalStyles } from "../constants/global";
import { TouchableOpacity } from "react-native";
import Logo from "../components/icons/Logo";
import Bell from "../components/icons/Bell";
import NotificationScreen from "../screens/NotificationScreen";
import ProfileScreen from "../screens/ProfileScreen";
import IndexScreen from "../screens/IndexScreen";
import FindUserBeforeLogInScreen from "../screens/FindUserBeforeLogInScreen";
import LogInScreen from "../screens/LogInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import RecoverPasswordScreen from "../screens/RecoverPasswordScreen";
import ReactivateAccountScreen from "../screens/ReactivateAccountScreen";
import OTPVerificationScreen from "../screens/OTPVerificationScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const TabStack = () => {
    const styles = theme();

    const { data } = useMeQuery({ fetchPolicy: "cache-and-network" });

    const [imageUrl, setImageUrl] = useState<string>(require("../images/profile-picture.png"));

    useEffect(() => {
        if (data && data.me && data.me.profile.profilePicture.length > 0) {
            setImageUrl(data.me.profile.profilePicture);
        } else {
            setImageUrl(require("../images/profile-picture.png"));
        }
    }, [data]);

    return (
        <Tab.Navigator
            initialRouteName="Home"
            backBehavior="history"
            screenOptions={({ navigation }) => ({
                tabBarStyle: {
                    backgroundColor: styles.tabBar.backgroundColor,
                    height: 60,
                    alignItems: "center",
                },
                headerTintColor: styles.text.color,
                headerStyle: { backgroundColor: styles.header.backgroundColor },
                headerShadowVisible: false,
                headerTitleStyle: { fontFamily: styles.header.fontFamily, fontSize: styles.header.fontSize },
                headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{ marginLeft: 16 }}>
                        <Image source={imageUrl} style={globalStyles.drawerUserButton}  />
                    </TouchableOpacity>
                ),
                tabBarShowLabel: false,
            })}
        >
            <Tab.Screen 
                name="Home" 
                component={HomeScreen}
                options={{
                    headerTitle: () => <Logo />,
                    headerTitleAlign: "center",
                    tabBarIcon: ({ focused }) => (
                        <Home isActive={focused} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Notifications" 
                component={NotificationScreen}
                options={{
                    title: "Notifications",
                    headerTitleAlign: "left",
                    tabBarIcon: ({ focused }) => (
                        <Bell isActive={focused} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const DrawerTabStack = () => {
    return (
        <Drawer.Navigator
            initialRouteName="TabStack"
            screenOptions={{
                drawerType: "front",
                headerShown: false,
            }}
            backBehavior="history"
            drawerContent={(props) => <DrawerContent {...props} />}
        >
            <Drawer.Screen 
                name="TabStack"
                component={TabStack}
            />
        </Drawer.Navigator>
    );
}

const AppStack = ({ isAuth }: { isAuth: boolean }) => {
    const styles = theme();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                headerStyle: { backgroundColor: styles.header.backgroundColor },
                headerTintColor: styles.text.color,
                headerShadowVisible: false,
                headerTitleStyle: { fontFamily: styles.header.fontFamily, fontSize: styles.header.fontSize },
                animation: "simple_push",
                headerBackTitle: "Back",
            }}
            initialRouteName={isAuth ? "DrawerTabStack": "Index"}
        >
            {isAuth ? (
                <Stack.Group>
                    <Stack.Screen 
                        name="DrawerTabStack"
                        component={DrawerTabStack}
                    />
                    <Stack.Screen 
                        name="Profile"
                        component={ProfileScreen}
                        options={{
                            headerShown: true,
                            title: "Your profile",
                        }}
                    />
                </Stack.Group>
            ) : (
                <Stack.Group
                    screenOptions={{
                        headerShown: true,
                        headerTitleAlign: "center",
                        headerTitle: () => <Logo />,
                    }}
                >
                    <Stack.Screen 
                        name="Index" 
                        component={IndexScreen}
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
                    <Stack.Screen 
                        name="ReactivateAccount" 
                        component={ReactivateAccountScreen}

                    />
                </Stack.Group>
            )}
            <Stack.Screen 
                name="OTPVerification" 
                component={OTPVerificationScreen}
                initialParams={{ 
                    from: "", 
                    isLogin: false,
                    input: "", 
                    password: "",
                    clientName: "",
                    clientOS: "",
                    clientType: "",
                    deviceLocation: "",
                    country: "",
                }}
                options={{
                    headerShown: true,
                    title: "Enter the OTP",
                }}
            />
        </Stack.Navigator>
    );
}

export default AppStack;