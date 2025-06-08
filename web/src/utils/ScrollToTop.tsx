import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const ScrollToTop = () => {
    const location = useLocation();
    const isModal = location.state && location.state.backgroundLocation;
    const navigationType = useNavigationType();

    useEffect(() => {
        if (!isModal && navigationType !== "POP") {
            window.scrollTo(0, 0);
        }
    }, [location.pathname, isModal, navigationType]);

    return null;
};

export default ScrollToTop;