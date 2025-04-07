import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";
  
interface ThemeContextType {
    isDarkMode: boolean;
    toggleTheme: () => void;
}
  
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
  
const STORAGE_KEY = "isDarkMode";
  
export const ThemeProviderWrapper = ({ children }: { children: ReactNode }) => {
    const getInitialTheme = (): boolean => {
        const stored = localStorage.getItem(STORAGE_KEY);

        if (stored !== null) {
            return stored === "true";
        }

        return window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    };

    const [isDarkMode, setIsDarkMode] = useState<boolean>(getInitialTheme);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, String(isDarkMode));
    }, [isDarkMode]);

    const toggleTheme = () => setIsDarkMode((prev) => !prev);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    
    if (!context) 
        throw new Error("useTheme must be used inside ThemeProviderWrapper");
    
    return context;
};