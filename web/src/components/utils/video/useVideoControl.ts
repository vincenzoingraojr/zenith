import { useState, useRef, useCallback, useEffect } from "react";
import { useVideoManager } from "../../../utils/VideoManagerProvider";

export interface VideoState {
    isPlaying: boolean;
    hasUserInteracted: boolean;
    userWantsToPlay: boolean;
    currentTime: number;
    duration: number;
}

export const useVideoControl = (videoId: number) => {
    const [videoState, setVideoState] = useState<VideoState>({
        isPlaying: false,
        hasUserInteracted: false,
        currentTime: 0,
        userWantsToPlay: false,
        duration: 0,
    });

    const {
        activeVideoId,
        setActiveVideo,
        registerVideo,
        unregisterVideo,
    } = useVideoManager();

    const videoRef = useRef<HTMLVideoElement>(null);
    const isVisible = useRef(false);

    useEffect(() => {
        if (videoRef.current) {
            registerVideo(videoId, videoRef.current);
        }
        
        return () => {
            unregisterVideo(videoId);
        };
    }, [videoId, registerVideo, unregisterVideo]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handlePlay = () => {
            setVideoState(prev => ({ ...prev, isPlaying: true }));
        };

        const handlePause = () => {
            setVideoState(prev => ({ ...prev, isPlaying: false }));
        };

        const handleTimeUpdate = () => {
            setVideoState(prev => ({ 
                ...prev, 
                currentTime: video.currentTime 
            }));
        };

        const handleLoadedMetadata = () => {
            setVideoState(prev => ({ 
                ...prev, 
                duration: video.duration 
            }));
        };

        video.addEventListener("play", handlePlay);
        video.addEventListener("pause", handlePause);
        video.addEventListener("timeupdate", handleTimeUpdate);
        video.addEventListener("loadedmetadata", handleLoadedMetadata);

        return () => {
            video.removeEventListener("play", handlePlay);
            video.removeEventListener("pause", handlePause);
            video.removeEventListener("timeupdate", handleTimeUpdate);
            video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        };
    }, []);

    const togglePlayPause = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;

        const newUserWantsToPlay = video.paused;

        setVideoState(prev => ({ 
            ...prev, 
            hasUserInteracted: true,
            userWantsToPlay: newUserWantsToPlay
        }));

        if (newUserWantsToPlay) {
            // L'utente vuole fare play
            setActiveVideo(videoId);
            video.play().catch(console.error);
        } else {
            // L'utente vuole fare pause
            video.pause();
        }
    }, [videoId, setActiveVideo]);

    const handleVisibilityChange = useCallback((visible: boolean) => {
        isVisible.current = visible;
        const video = videoRef.current;
        if (!video) return;

        if (visible) {
            // Il video è diventato visibile
            if (videoState.hasUserInteracted) {
                // L'utente ha interagito: riproduci solo se vuole che sia in play
                if (videoState.userWantsToPlay && activeVideoId !== videoId) {
                    setActiveVideo(videoId);
                    video.play().catch(console.error);
                }
            } else {
                // L'utente non ha mai interagito: autoplay se nessun altro video è attivo
                if (!activeVideoId || activeVideoId === videoId) {
                    setActiveVideo(videoId);
                    video.play().catch(console.error);
                }
            }
        } else {
            // Il video non è più visibile
            if (videoState.hasUserInteracted) {
                // L'utente ha interagito: pausa sempre quando non visibile
                video.pause();
            } else {
                // L'utente non ha interagito: pausa solo se era in autoplay
                video.pause();
            }
        }
    }, [videoId, videoState.hasUserInteracted, videoState.userWantsToPlay, activeVideoId, setActiveVideo]);

    // Autoplay quando diventa visibile
    const handleAutoPlay = useCallback(() => {
        handleVisibilityChange(true);
    }, [handleVisibilityChange]);

    // Pausa quando non è più visibile
    const handleAutoPause = useCallback(() => {
        handleVisibilityChange(false);
    }, [handleVisibilityChange]);

    return {
        videoRef,
        videoState,
        togglePlayPause,
        handleAutoPlay,
        handleAutoPause,
        isActive: activeVideoId === videoId,
    };
};
