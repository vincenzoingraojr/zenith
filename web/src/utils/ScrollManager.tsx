import { useLayoutEffect, useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

function debounce(fn: () => void, delay: number) {
    let timeout: NodeJS.Timeout;
    const debouncedFn = () => {
        clearTimeout(timeout);
        timeout = setTimeout(fn, delay);
    };
    debouncedFn.cancel = () => clearTimeout(timeout);
    return debouncedFn;
}

const scrollPositions = new Map<string, number>();

function useFeedScroll(feedKey: string | null, debounceMs = 200) {
    useEffect(() => {
        if (!feedKey) return;

        const saved = scrollPositions.get(`scroll-${feedKey}`);
        if (saved !== undefined) {
            window.scrollTo(0, saved);
        } else {
            window.scrollTo(0, 0);
        }
    }, [feedKey]);

    useEffect(() => {
        if (!feedKey) return;

        const handleScroll = debounce(() => {
            scrollPositions.set(`scroll-${feedKey}`, window.scrollY);
        }, debounceMs);

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);

            if (handleScroll.cancel) {
                handleScroll.cancel();
            }
        };
    }, [feedKey, debounceMs]);

    useEffect(() => {
        return () => {
            if (feedKey && window.scrollY > 0) {
                scrollPositions.set(`scroll-${feedKey}`, window.scrollY);
            }
        };
    }, [feedKey]);
}

const ScrollManager = () => {
    const location = useLocation();
    const navigationType = useNavigationType();

    const isModal = location.state?.backgroundLocation;
    const isPop = navigationType === "POP";

    const feedPaths = ["/home", "/notifications"];
    const matchingFeed =
        feedPaths.find((path) => location.pathname.startsWith(path)) || null;

    useFeedScroll(matchingFeed);

    useLayoutEffect(() => {
        const isIgnored = matchingFeed !== null;
        if (!isModal && !isPop && !isIgnored) {
            window.scrollTo(0, 0);
        }
    }, [location.pathname, navigationType, matchingFeed, isModal, isPop]);

    return null;
};

export default ScrollManager;
