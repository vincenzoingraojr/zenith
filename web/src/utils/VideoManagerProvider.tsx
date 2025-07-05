import React, { createContext, useCallback, useContext, useRef, useState } from "react";

interface VideoManagerContextType {
    playingVideoId: number | null;
    registerVideo: (id: number, video: HTMLVideoElement | null) => void;
    playVideo: (id: number) => void;
    pauseVideo: (id: number) => void;
}

const VideoManagerContext = createContext<VideoManagerContextType | undefined>(undefined);

export const useVideoManager = () => {
    const context = useContext(VideoManagerContext);
    if (!context) throw new Error("useVideoManager must be used within VideoManagerProvider");
    return context;
};

export const VideoManagerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const videoRefs = useRef<Map<number, HTMLVideoElement | null>>(new Map());
    const [playingVideoId, setPlayingVideoId] = useState<number | null>(null);

    const registerVideo = useCallback((id: number, video: HTMLVideoElement | null) => {
        if (video) {
            videoRefs.current.set(id, video);
        } else {
            videoRefs.current.delete(id);
        }
    }, []);

    const playVideo = useCallback((id: number) => {
        videoRefs.current.forEach((video, videoId) => {
            if (videoId !== id && video && !video.paused) {
                video.pause();
            }
        });

        const video = videoRefs.current.get(id);
        if (video) {
            video.play().catch(error => {
                console.error(`Failed to play video with id ${id}:`, error);
            });
        }

        setPlayingVideoId(id);
    }, []);

    const pauseVideo = useCallback((id: number) => {
        const video = videoRefs.current.get(id);
        if (video && !video.paused) {
            video.pause();
        }

        setPlayingVideoId(prevId => (prevId === id ? null : prevId));
    }, []);

    return (
        <VideoManagerContext.Provider value={{ playingVideoId, registerVideo, playVideo, pauseVideo }}>
            {children}
        </VideoManagerContext.Provider>
    );
};