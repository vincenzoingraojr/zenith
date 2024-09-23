import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import NotFoundPage from "./pages/404";
import { useEffect } from "react";
import { initGA } from "./analytics/analytics";
import Tracking from "./analytics/Tracking";

function App() {
    useEffect(() => {
        initGA();
    }, []);

    return (
        <>
            <Tracking />
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
        </>
    );
}

export default App;