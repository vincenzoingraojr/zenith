import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const ScrollToTop = () => {
    const location = useLocation();
    const navigationType = useNavigationType();

    useEffect(() => {
        if (!(location.state && location.state.backgroundLocation) && navigationType !== "POP") {
            window.scrollTo(0, 0);
        }
    }, [location, navigationType]);

    return null;
};

export default ScrollToTop;