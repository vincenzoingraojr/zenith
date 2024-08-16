import { FunctionComponent } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { theme } from "../../constants/theme";

interface AuthLayoutProps {
    content: JSX.Element;
    bottomNav?: JSX.Element;
}

const AuthLayout: FunctionComponent<AuthLayoutProps> = ({ content, bottomNav }) => {
    const styles = theme();

    return (
        <View style={authLayoutStyles.wrapper}>
            <View style={[authLayoutStyles.innerContainer, bottomNav && { marginBottom: 100 }]}>
                <ScrollView>
                    {content}
                </ScrollView>
            </View>
            {bottomNav && (
                <View style={[authLayoutStyles.bottomNavContainer, styles.contentContainer]}>
                    {bottomNav}
                </View>
            )}
        </View>
    );
}

const authLayoutStyles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
    },
    bottomNavContainer: {
        flex: 1,
        height: 100,
        position: "absolute",
        top: "auto",
        left: 0,
        right: 0,
        bottom: 0,
    },
});

export default AuthLayout;