import { FunctionComponent } from "react";
import styled from "styled-components";
import { COLORS } from "../../styles/colors";
import { PageText, SmallButton } from "../../styles/global";

interface CircularProgressProps {
    progress: number;
    statusText?: string;
    statusFlag: "ok" | "error";
    onError?: () => void;
}

const CircularProgressWrapper = styled.div`
    position: relative;

    svg {
        transform: rotate(-90deg);
    }
`;

const ProgressContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.overlayGrey};
    border-radius: 12px 12px 0px 0px;
    gap: 8px;
`;

const ProgressText = styled(PageText)`
    font-size: 16px;
    color: ${({ theme }) => theme.inputText};
`;

const RetryButton = styled(SmallButton)`
    border: none;
    background-color: ${COLORS.blue};
    color: ${COLORS.white};
`;

const CircularProgress: FunctionComponent<CircularProgressProps> = ({
    progress,
    statusFlag,
    onError,
    statusText = "Uploading...",
}) => {
    const size = 26;
    const trackWidth = 2;
    const trackColor = COLORS.blue;
    const trackOpacity = 0.3;
    const indicatorWidth = 2;
    const indicatorColor = COLORS.blue;
    const indicatorCap = `round`;

    const center = size / 2,
        radius =
            center -
            (trackWidth > indicatorWidth ? trackWidth : indicatorWidth),
        dashArray = 2 * Math.PI * radius,
        dashOffset = dashArray * ((100 - progress) / 100);

    return (
        <ProgressContainer>
            <CircularProgressWrapper>
                {statusFlag === "ok" ? (
                    <svg style={{ width: size, height: size }}>
                        <circle
                            cx={center}
                            cy={center}
                            fill="transparent"
                            r={radius}
                            stroke={trackColor}
                            strokeWidth={trackWidth}
                            strokeOpacity={trackOpacity}
                        />
                        <circle
                            cx={center}
                            cy={center}
                            fill="transparent"
                            r={radius}
                            stroke={indicatorColor}
                            strokeWidth={indicatorWidth}
                            strokeDasharray={dashArray}
                            strokeDashoffset={dashOffset}
                            strokeLinecap={indicatorCap}
                        />
                    </svg>
                ) : (
                    <RetryButton
                        type="button"
                        title="Retry upload"
                        aria-label="Retry upload"
                        onClick={onError}
                    >
                        Retry
                    </RetryButton>
                )}
            </CircularProgressWrapper>
            <ProgressText>{statusFlag === "ok" && progress === 100 ? "Upload completed" : statusText}</ProgressText>
        </ProgressContainer>
    );
}

export default CircularProgress;