import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { logPageView } from "./analytics";

const Tracking: React.FC = () => {
    const location = useLocation();

    useEffect(() => {
        logPageView(location.pathname);
    }, [location]);

    return null;
};

export default Tracking;
