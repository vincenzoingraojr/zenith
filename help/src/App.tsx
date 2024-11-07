import { Route, Routes, useLocation } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import NotFoundPage from "./pages/404";
import { useEffect } from "react";
import { analytics } from "./firebaseConfig";
import { logEvent } from "firebase/analytics";

function App() {
    const location = useLocation();

    useEffect(() => {
        if (process.env.REACT_APP_ENV === "production") {
            logEvent(analytics, "page_view", {
                page_path: location.pathname,
                page_title: document.title,
                page_location: window.location.href
            });
        }
    }, [location]);

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <IndexPage />
                }
            />
            <Route
                path="*"
                element={
                    <NotFoundPage />
                }
            />
        </Routes>
    );
}

export default App;