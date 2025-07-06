import { FunctionComponent, useState } from "react";
import { useVideoControl } from "./useVideoControl";
import { useVideoVisibility } from "./useVideoVisibility";

interface VideoPlayerProps {
    videoId: number;
    src: string;
    controls?: boolean;
    autoplay?: boolean;
}

export const VideoPlayer: FunctionComponent<VideoPlayerProps> = ({
    videoId,
    src,
    controls = true,
    autoplay = true,
}) => {
    const {
        videoRef,
        videoState,
        togglePlayPause,
        handleAutoPlay,
        handleAutoPause,
        isActive,
    } = useVideoControl(videoId);

    const { elementRef } = useVideoVisibility(videoId, {
        threshold: 0.6,
        onVisible: autoplay ? handleAutoPlay : undefined,
        onHidden: autoplay ? handleAutoPause : undefined,
    });

    const [progress, setProgress] = useState(0);

    const handleTimeUpdate = () => {
        const video = videoRef.current;
        if (!video || !video.duration) return;

        const currentProgress = (video.currentTime / video.duration) * 100;
        setProgress(currentProgress);
    };

    const handleProgressChange = (e: any) => {
        const video = videoRef.current;
        if (!video || !video.duration) return;
        
        const newTime = (e.target.value * video.duration) / 100;
        video.currentTime = newTime;
        setProgress(e.target.value);
    };

    return (
        <div ref={elementRef} className="relative" onClick={(e) => e.stopPropagation()}>
            <video
                ref={videoRef}
                src={src}
                muted
                playsInline
                preload="metadata"
                onTimeUpdate={handleTimeUpdate}
            />
            {controls && (
                <>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <button
                            type="button"
                            onClick={togglePlayPause}
                            className="bg-black bg-opacity-50 text-white p-4 rounded-full hover:bg-opacity-75 transition-opacity"
                        >
                            {videoState.isPlaying ? '⏸️' : '▶️'}
                        </button>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={progress}
                        onChange={handleProgressChange}
                    />
                </>
            )}
            <div className="absolute top-2 left-2 space-y-1">
                {isActive && (
                    <div className="bg-red-500 text-white px-2 py-1 rounded text-xs">
                        ATTIVO
                    </div>
                )}
                {videoState.hasUserInteracted && (
                    <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs">
                        INTERAGITO
                    </div>
                )}
                {videoState.userWantsToPlay && (
                    <div className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                        VUOLE PLAY
                    </div>
                )}
            </div>
        </div>
    );
};