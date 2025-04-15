import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { setAccessToken } from "./utils/token";
import IsNotAuthenticated from "./components/routes/IsNotAuthenticated";
import Authentication from "./pages/Authentication";
import Preloader from "./components/utils/Preloader";
import Modal from "./components/layouts/modal/Modal";
import LogIn from "./pages/LogIn";
import IsAuthenticated from "./components/routes/IsAuthenticated";
import HomePage from "./pages/HomePage";
import VerifyOTP from "./pages/VerifyOTP";
import RecoverPassword from "./pages/RecoverPassword";
import ModifyPassword from "./pages/ModifyPassword";
import VerifyAccount from "./pages/VerifyAccount";

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
                <Route 
                    path="/login"
                    element={
                        <IsNotAuthenticated
                            isAuth={isAuth}
                            children={
                                <LogIn />
                            }
                        />
                    }
                />
                <Route 
                    path="/recover_password"
                    element={
                        <IsNotAuthenticated
                            isAuth={isAuth}
                            children={
                                <RecoverPassword />
                            }
                        />
                    }
                />
                <Route
                    path="/modify_password/:token"
                    element={
                        <IsNotAuthenticated
                            isAuth={isAuth}
                            children={<ModifyPassword />}
                        />
                    }
                />
                <Route
                    path="/verify/:token"
                    element={
                        <IsNotAuthenticated
                            isAuth={isAuth}
                            children={<VerifyAccount />}
                        />
                    }
                />
                <Route 
                    path="/verify/otp"
                    element={
                        <Modal
                            headerText="Verify OTP"
                            children={<VerifyOTP />}
                        />
                    }
                />
                <Route
                    path="/home"
                    element={
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={<HomePage />}
                        />
                    }
                />
            </Routes>
            {(state && state.backgroundLocation) && (
                <Routes>
                    <Route 
                        path="/verify/otp"
                        element={
                            <Modal
                                headerText="Verify OTP"
                                children={<VerifyOTP />}
                            />
                        }
                    />
                </Routes>
            )}
        </>
    );
}

export default App;