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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const TabStack = () => {
    const styles = theme();

    const { data } = useMeQuery({ fetchPolicy: "cache-and-network" });

    const [imageUrl, setImageUrl] = useState<string>(require("../images/profile-picture.png"));

    useEffect(() => {
        if (data && data.me && data.me.profile.profilePicture) {
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

const AppStack = () => {
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
            }}
            initialRouteName="DrawerTabStack"
        >
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
        </Stack.Navigator>
    );
}

export default AppStack;