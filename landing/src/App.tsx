import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import JoinWaitingList from "./pages/JoinWaitingList";
import NotFoundPage from "./pages/NotFoundPage";
import Modal from "./components/layouts/modal/Modal";
import Tracking from "./analytics/Tracking";
import { useEffect } from "react";
import { initGA } from "./analytics/analytics";

function App() {
    const location = useLocation();

    document.body.classList.remove("not-scrolling");

    let state = location.state as { backgroundLocation: Location };

    useEffect(() => {
        initGA();
    }, []);

    return (
        <>
            <Tracking />
            <Routes location={state ? state.backgroundLocation : location}>
                <Route path="/" element={<HomePage />} />
                <Route 
                    path="/join"
                    element={
                        <Modal
                            hasLogo={true}
                            modalContent={<JoinWaitingList />}
                        />
                    }
                />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            {(state && state.backgroundLocation) && (
                <Routes>
                    <Route 
                        path="/join"
                        element={
                            <Modal
                                hasLogo={true}
                                modalContent={<JoinWaitingList />}
                            />
                        }
                    />
                </Routes>
            )}
        </>
    );
}

export default App;
