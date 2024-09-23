import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import NotFoundPage from "./pages/404";
import AboutUs from "./pages/who-we-are/AboutUs";
import CareersPage from "./pages/who-we-are/CareersPage";
import BrandToolkit from "./pages/who-we-are/BrandToolkit";
import ContactPage from "./pages/resources/ContactPage";
import CookiePolicy from "./pages/policies/CookiePolicy";
import PrivacyPolicy from "./pages/policies/PrivacyPolicy";
import TermsOfService from "./pages/policies/TermsOfService";
import OurMission from "./pages/our-priorities/OurMission";
import SecurityAndPrivacy from "./pages/our-priorities/SecurityAndPrivacy";
import Tracking from "./analytics/Tracking";
import { initGA } from "./analytics/analytics";
import { useEffect } from "react";

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
                    path="/about-us"
                    element={
                        <AboutUs />
                    }
                />
                <Route
                    path="/careers"
                    element={
                        <CareersPage />
                    }
                />
                <Route
                    path="/brand-toolkit"
                    element={
                        <BrandToolkit />
                    }
                />
                <Route 
                    path="/our-mission"
                    element={
                        <OurMission />
                    }
                />
                <Route 
                    path="/security-and-privacy"
                    element={
                        <SecurityAndPrivacy />
                    }
                />
                <Route
                    path="/contact-us"
                    element={
                        <ContactPage />
                    }
                />
                <Route
                    path="/cookies"
                    element={
                        <CookiePolicy />
                    }
                />
                <Route
                    path="/privacy-policy"
                    element={
                        <PrivacyPolicy />
                    }
                />
                <Route
                    path="/tos"
                    element={
                        <TermsOfService />
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