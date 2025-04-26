import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { FunctionComponent, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { theme } from "../constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { Image } from "expo-image";
import { globalStyles } from "../constants/global";
import { COLORS } from "../constants/colors";
import Profile from "../components/icons/Profile";
import Settings from "../components/icons/Settings";
import { useAuth } from "./AuthContext";
import Exit from "../components/icons/Exit";

const DrawerContent: FunctionComponent<DrawerContentComponentProps> = (props) => {
    const styles = theme();
    const colorScheme = useColorScheme();

    const { data } = useMeQuery({ fetchPolicy: "cache-and-network" });

    const [imageUrl, setImageUrl] = useState<string>(require("../images/profile-picture.png"));

    useEffect(() => {
        if (data && data.me && data.me.profile.profilePicture.length > 0) {
            setImageUrl(data.me.profile.profilePicture);
        } else {
            setImageUrl(require("../images/profile-picture.png"));
        }
    }, [data]);

    const { logout } = useAuth();

    const [logoutMutation, { client }] = useLogoutMutation();
    
    return (
        <SafeAreaView style={styles.container}>
            <View
                style={styles.container}
            >
                {data && data.me && (
                    <TouchableOpacity
                        style={drawerStyles.profileContainer}
                        onPress={() => props.navigation.navigate("Profile")}
                    >
                        <View style={drawerStyles.profile}>
                            <Image source={imageUrl} style={drawerStyles.profileImage} />
                            <View style={drawerStyles.profileInfo}>
                                <Text style={[styles.text, globalStyles.boldText]}>{data.me.name}</Text>
                                <Text style={[styles.text, drawerStyles.username, { color: colorScheme === "dark" ? COLORS.lightGrey : COLORS.grey }]}>@{data.me.username}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                <ScrollView style={styles.contentContainer}>
                    <TouchableOpacity 
                        style={[drawerStyles.drawerButton, drawerStyles.drawerBox]}
                        onPress={() => props.navigation.navigate("Profile")}    
                    >
                        <Profile />
                        <Text style={[styles.text, globalStyles.boldText]}>Your profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[drawerStyles.drawerButton, drawerStyles.drawerBox]}
                        onPress={() => props.navigation.navigate("Settings")}    
                    >
                        <Settings />
                        <Text style={[styles.text, globalStyles.boldText]}>Settings</Text>
                    </TouchableOpacity>
                    {data && data.me && (
                        <TouchableOpacity 
                            style={[drawerStyles.drawerButton, drawerStyles.drawerBox]}
                            onPress={async () => {
                                await logoutMutation();
                                await client.resetStore();

                                await logout();

                                props.navigation.navigate("Index");
                            }}    
                        >
                            <Exit />
                            <Text style={[styles.text, globalStyles.boldText]}>Log out</Text>
                        </TouchableOpacity>
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const drawerStyles = StyleSheet.create({
    profileContainer: {
        paddingTop: 24,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 24,
    },
    profile: {
        flexDirection: "column",
        gap: 12,
    },
    profileImage: {
        width: 56,
        height: 56,
        borderRadius: 28,
    },
    profileInfo: {
        flexDirection: "column",
        gap: 2,
    },
    username: {
        fontSize: 16,
    },
    drawerBox: {
        paddingTop: 12,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 12,
    },
    drawerButton: {
        flex: 0,
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
    },
});

export default DrawerContent;