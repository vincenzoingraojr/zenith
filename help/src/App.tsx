import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import NotFoundPage from "./pages/404";

function App() {
    return (
        <>
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