import { createContext, useContext, useState, useEffect, FunctionComponent, ReactNode } from "react";
import { setToken } from "../utils/token";
import { REACT_APP_SERVER_ORIGIN } from "@env";

interface AuthProvideProps {
    children: ReactNode;
}

interface AuthContextProps {
    loading: boolean;
    isAuth: boolean;
    login: (accessToken: string) => Promise<void>;
    logout: () => Promise<void>;
}
  
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    
    return context;
};

export const AuthProvider: FunctionComponent<AuthProvideProps> = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        fetch(REACT_APP_SERVER_ORIGIN, {
            method: "POST",
            credentials: "include",
        }).then(async (x) => {
            const { accessToken } = await x.json();
            await setToken(accessToken);

            if (accessToken && accessToken.length > 0) {
                setIsAuth(true);
            } else {
                setIsAuth(false);
            }

            setLoading(false);
        });
    }, []);

    const login = async (accessToken: string) => {
        await setToken(accessToken);
        setIsAuth(true);
    };

    const logout = async () => {
        await setToken("");
        setIsAuth(false);
    };

    const value = {
        loading,
        isAuth,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};