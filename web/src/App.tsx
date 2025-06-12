import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import IsNotAuthenticated from "./components/routes/IsNotAuthenticated";
import Authentication from "./pages/auth/Authentication";
import Preloader from "./components/utils/Preloader";
import Modal from "./components/layouts/modal/Modal";
import LogIn from "./pages/auth/LogIn";
import IsAuthenticated from "./components/routes/IsAuthenticated";
import HomePage from "./pages/HomePage";
import VerifyOTP from "./pages/auth/VerifyOTP";
import RecoverPassword from "./pages/auth/RecoverPassword";
import ModifyPassword from "./pages/auth/ModifyPassword";
import VerifyAccount from "./pages/auth/VerifyAccount";
import SignUp from "./pages/auth/SignUp";
import ReactivateAccount from "./pages/auth/ReactivateAccount";
import LogOut from "./pages/auth/LogOut";
import { useAuth } from "./utils/AuthContext";
import {
    AppErrorContainer,
    AppErrorWrapper,
    PageBlock,
    PageText,
    StandardButton,
} from "./styles/global";
import SearchPage from "./pages/search/SearchPage";
import Notifications from "./pages/Notifications";
import Messages from "./pages/messages/Messages";
import ReportPage from "./pages/ReportPage";
import SettingsPage from "./pages/settings/Index";
import Payments from "./pages/payments/Payments";
import CreatePost from "./pages/post/CreatePost";
import EditPost from "./pages/post/EditPost";
import PostPage from "./pages/post/PostPage";
import NotificationSettings from "./pages/settings/notifications/NotificationSettings";
import { NotificationsProvider } from "./utils/NotificationsProvider";
import ScrollManager from "./utils/ScrollManager";

function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuth, loading, error } = useAuth();

    if (loading && !error) {
        return <Preloader />;
    }

    if (error) {
        return (
            <AppErrorWrapper>
                <AppErrorContainer>
                    <PageText>{error.message}</PageText>
                    <PageBlock>
                        <StandardButton
                            type="button"
                            role="button"
                            title="Refresh page"
                            aria-label="Refresh page"
                            onClick={() => {
                                navigate(0);
                            }}
                        >
                            Refresh page
                        </StandardButton>
                    </PageBlock>
                </AppErrorContainer>
            </AppErrorWrapper>
        );
    }

    document.body.classList.remove("not-scrolling");

    let state = location.state as { backgroundLocation: Location };

    return (
        <NotificationsProvider>
            <ScrollManager />
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
                            children={<LogIn />}
                        />
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <IsNotAuthenticated
                            isAuth={isAuth}
                            children={<SignUp />}
                        />
                    }
                />
                <Route
                    path="/recover_password"
                    element={
                        <IsNotAuthenticated
                            isAuth={isAuth}
                            children={<RecoverPassword />}
                        />
                    }
                />
                <Route
                    path="/reactivate_account"
                    element={
                        <IsNotAuthenticated
                            isAuth={isAuth}
                            children={<ReactivateAccount />}
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
                <Route
                    path="/logout"
                    element={
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={<LogOut />}
                        />
                    }
                />
                <Route path="/search" element={<SearchPage />} />
                <Route
                    path="/notifications"
                    element={
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={<Notifications />}
                        />
                    }
                />
                <Route
                    path="/messages"
                    element={
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={<Messages />}
                        />
                    }
                />
                <Route
                    path="/payments"
                    element={
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={<Payments />}
                        />
                    }
                />
                <Route
                    path="/settings"
                    element={
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={<SettingsPage />}
                        />
                    }
                />
                <Route
                    path="/report/:type/:contentId"
                    element={
                        <Modal headerText="Report" children={<ReportPage />} />
                    }
                />
                <Route
                    path="/create_post/:operation/:itemType/:itemIdOrLocation"
                    element={
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={
                                <Modal
                                    hasLogo={true}
                                    isBack={true}
                                    children={<CreatePost />}
                                />
                            }
                        />
                    }
                />
                <Route
                    path="/edit_post/:itemId"
                    element={
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={
                                <Modal
                                    headerText="Edit post"
                                    isBack={true}
                                    children={<EditPost />}
                                />
                            }
                        />
                    }
                />
                <Route path="/:username/post/:itemId" element={<PostPage />} />
                <Route
                    path="/settings/notifications"
                    element={
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={<NotificationSettings />}
                        />
                    }
                />
            </Routes>
            {state && state.backgroundLocation && (
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
                    <Route
                        path="/report/:type/:contentId"
                        element={
                            <Modal
                                headerText="Report"
                                children={<ReportPage />}
                            />
                        }
                    />
                    <Route
                        path="/create_post/:operation/:itemType/:itemIdOrLocation"
                        element={
                            <IsAuthenticated
                                isAuth={isAuth}
                                children={
                                    <Modal
                                        hasLogo={true}
                                        isBack={true}
                                        children={<CreatePost />}
                                    />
                                }
                            />
                        }
                    />
                    <Route
                        path="/edit_post/:itemId"
                        element={
                            <IsAuthenticated
                                isAuth={isAuth}
                                children={
                                    <Modal
                                        headerText="Edit post"
                                        isBack={true}
                                        children={<EditPost />}
                                    />
                                }
                            />
                        }
                    />
                </Routes>
            )}
        </NotificationsProvider>
    );
}

export default App;
