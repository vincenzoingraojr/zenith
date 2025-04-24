import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { User } from "../generated/graphql";
import { setAccessToken } from "./token";

interface AuthContextType {
    logInAndSetToken: (user: User, token: string) => void;
    logOutAndResetToken: () => void;
    isAuth: boolean;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER_ORIGIN!, {
            method: "POST",
            credentials: "include",
        }).then(async (x) => {
            const { accessToken } = await x.json();
            setAccessToken(accessToken);

            if (accessToken && accessToken.length > 0) {
                setIsAuth(true);
            } else {
                setIsAuth(false);
            }
            
            setLoading(false);
        });
    }, []);

    const logInAndSetToken = (user: User, token: string) => {
        setAccessToken(token);
        setIsAuth(true);
    }

    const logOutAndResetToken = () => {
        setAccessToken("");
        setIsAuth(false);
    }

    return (
        <AuthContext.Provider value={{ logInAndSetToken, logOutAndResetToken, isAuth, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
        
    if (!context) 
        throw new Error("useAuth must be used inside AuthProviderWrapper");
    
    return context;
};