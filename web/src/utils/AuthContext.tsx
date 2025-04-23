import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useMeData } from "./useMeData";
import { User } from "../generated/graphql";
import { setAccessToken } from "./token";

interface AuthContextType {
    user: User | null;
    logInAndSetToken: (user: User, token: string) => void;
    logOutAndResetToken: () => void;
    isAuth: boolean;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    const { me } = useMeData();

    useEffect(() => {
        if (me && isAuth) {
            setUser(me);
        }
    }, [me, isAuth]);
    
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
        setUser(user);
        setAccessToken(token);
    }

    const logOutAndResetToken = () => {
        setUser(null);
        setAccessToken("");
    }

    return (
        <AuthContext.Provider value={{ user, logInAndSetToken, logOutAndResetToken, isAuth, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
        
    if (!context) 
        throw new Error("useTheme must be used inside ThemeProviderWrapper");
    
    return context;
};