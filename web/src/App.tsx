import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { setAccessToken } from "./utils/token";
import IsNotAuthenticated from "./components/routes/IsNotAuthenticated";
import Authentication from "./pages/Authentication";
import Preloader from "./components/utils/Preloader";

function App() {
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);
    const location = useLocation();

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

    if (loading) {
        return <Preloader />;
    }

    document.body.classList.remove("not-scrolling");

    let state = location.state as { backgroundLocation: Location };

    return (
        <>
            <Routes location={state ? state.backgroundLocation : location}>
                <Route
                    path="/"
                    element={
                        <IsNotAuthenticated
                            isAuth={isAuth}
                            children={<Authentication />}
                        />
                    }
                />
            </Routes>
        </>
    );
}

export default App;