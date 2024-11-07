import { Route, Routes, useLocation } from "react-router-dom";
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
    );
}

export default App;