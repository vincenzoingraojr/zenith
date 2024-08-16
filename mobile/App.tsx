import { StatusBar } from "expo-status-bar";
import {
    ApolloProvider,
} from "@apollo/client";
import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { Inter_400Regular, Inter_700Bold } from "@expo-google-fonts/inter";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./src/navigation";
import { client } from "./src/utils/apollo";
import { AuthProvider } from "./src/navigation/AuthContext";

SplashScreen.preventAutoHideAsync();

export default function App() {
    let [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_700Bold
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);
    
    if (!fontsLoaded) {
        return null;
    }

    return (
        <ApolloProvider client={client}>
            <AuthProvider>
                <SafeAreaProvider onLayout={onLayoutRootView}>
                    <StatusBar style="auto" />
                    <Navigation />
                </SafeAreaProvider>
            </AuthProvider>
        </ApolloProvider>
    );
}
