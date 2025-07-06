import { createContext, useContext, useRef, useCallback, ReactNode, FunctionComponent } from "react";

interface VideoManagerContextType {
    activeVideoId: number | null;
    setActiveVideo: (videoId: number | null) => void;
    registerVideo: (videoId: number, element: HTMLVideoElement) => void;
    unregisterVideo: (videoId: number) => void;
    pauseAllVideos: () => void;
    playVideo: (videoId: number) => void;
    pauseVideo: (videoId: number) => void;
}

const VideoManagerContext = createContext<VideoManagerContextType | null>(null);

export const VideoManagerProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
    const videoElements = useRef<Map<number, HTMLVideoElement>>(new Map());
    const activeVideoId = useRef<number | null>(null);

    const setActiveVideo = useCallback((videoId: number | null) => {
        if (activeVideoId.current && activeVideoId.current !== videoId) {
            const prevVideo = videoElements.current.get(activeVideoId.current);
            if (prevVideo) {
                prevVideo.pause();
            }
        }
        activeVideoId.current = videoId;
    }, []);

    const registerVideo = useCallback((videoId: number, element: HTMLVideoElement) => {
        videoElements.current.set(videoId, element);
    }, []);

    const unregisterVideo = useCallback((videoId: number) => {
        videoElements.current.delete(videoId);
        if (activeVideoId.current === videoId) {
            activeVideoId.current = null;
        }
    }, []);

    const pauseAllVideos = useCallback(() => {
        videoElements.current.forEach((video) => {
            video.pause();
        });
        activeVideoId.current = null;
    }, []);

    const playVideo = useCallback((videoId: number) => {
        const video = videoElements.current.get(videoId);
        if (video) {
            setActiveVideo(videoId);
            video.play().catch(console.error);
        }
    }, [setActiveVideo]);

    const pauseVideo = useCallback((videoId: number) => {
        const video = videoElements.current.get(videoId);
        if (video) {
            video.pause();
            if (activeVideoId.current === videoId) {
                activeVideoId.current = null;
            }
        }
    }, []);

    return (
        <VideoManagerContext.Provider
            value={{
                activeVideoId: activeVideoId.current,
                setActiveVideo,
                registerVideo,
                unregisterVideo,
                pauseAllVideos,
                playVideo,
                pauseVideo,
            }}
        >
        {children}
        </VideoManagerContext.Provider>
    );
};

export const useVideoManager = () => {
    const context = useContext(VideoManagerContext);
    if (!context) {
        throw new Error("useVideoManager must be used within VideoManagerProvider");
    }
    return context;
};