import { useEffect, useRef, useCallback } from "react";

interface UseVideoVisibilityOptions {
    threshold?: number;
    rootMargin?: string;
    onVisible?: (videoId: number) => void;
    onHidden?: (videoId: number) => void;
}

export const useVideoVisibility = (
    videoId: number,
    options: UseVideoVisibilityOptions = {}
) => {
    const {
        threshold = 0.5,
        rootMargin = "0px",
        onVisible,
        onHidden,
    } = options;
    
    const elementRef = useRef<HTMLDivElement>(null);
    const isVisible = useRef(false);
    const observerRef = useRef<IntersectionObserver | null>(null);

    const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !isVisible.current) {
                isVisible.current = true;
                onVisible?.(videoId);
            } else if (!entry.isIntersecting && isVisible.current) {
                isVisible.current = false;
                onHidden?.(videoId);
            }
        });
    }, [videoId, onVisible, onHidden]);

    useEffect(() => {
        if (!elementRef.current) return;

        observerRef.current = new IntersectionObserver(handleIntersection, {
            threshold,
            rootMargin,
        });

        observerRef.current.observe(elementRef.current);

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [handleIntersection, threshold, rootMargin]);

    return { elementRef, isVisible: isVisible.current };
};