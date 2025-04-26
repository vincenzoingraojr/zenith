import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./AppStack";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { COLORS } from "../constants/colors";
import { theme } from "../constants/theme";
import { RootSiblingParent } from "react-native-root-siblings";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { useAuth } from "./AuthContext";
import { loadingComponentStyle } from "../constants/loadingComponentStyles";

function Navigation() {
    const { loading, isAuth } = useAuth();

    const styles = theme();

    if (loading) {
        return (
            <View style={[styles.container, loadingComponentStyle.container, loadingComponentStyle.horizontal]}>
                <ActivityIndicator size="large" color={COLORS.blue} />
            </View>
        );
    }

    return (
        <RootSiblingParent>
            <ActionSheetProvider useCustomActionSheet={true}>
                <NavigationContainer>
                    <AppStack isAuth={isAuth} />
                </NavigationContainer>
            </ActionSheetProvider>
        </RootSiblingParent>
    );
}

export default Navigation;