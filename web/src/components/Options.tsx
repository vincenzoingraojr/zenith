import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { ControlContainer, PageBlock, SmallButton } from "../styles/global";
import PortalComponent from "../utils/PortalComponent";
import styled from "styled-components";
import { devices } from "../styles/devices";
import { COLORS } from "../styles/colors";

interface OptionsProps {
    icon: React.ReactNode;
    title: string;
    isOpen: boolean;
    toggleOptions: () => void;
    children: React.ReactNode;
    mirrored?: boolean;
}

const OptionsContainerBackground = styled.div`
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background-color: ${({ theme }) => theme.overlayGrey};

    @media ${devices.mobileL} {
        background-color: transparent;
    }
`;

const OptionsContainer = styled.div.attrs(
    (props: { isInUpperHalf: boolean; position: { top: number; side: number }, mirrored?: boolean }) => props
)`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: fixed;
    top: unset;
    left: 0;
    right: 0;
    bottom: 0;
    height: auto;
    background-color: ${({ theme }) => theme.background};;
    border-radius: 24px 24px 0px 0px;
    z-index: 100;
    max-height: 50vh;
    overflow: auto;
    width: 100%;
    padding-top: 24px;
    box-shadow: unset;

    @media ${devices.mobileL} {
        border-radius: 12px;
        background-color: ${({ theme }) => theme.background};
        top: ${(props) => props.position.top}px;
        left: ${(props) => props.mirrored ? `${props.position.side}px` : "unset"};
        right: ${(props) => props.mirrored ? "unset" : `${props.position.side}px`};
        bottom: unset;
        max-height: unset;
        overflow: hidden;
        width: max-content;
        max-width: 384px;
        min-width: 140px;
        transform: ${(props) =>
            props.isInUpperHalf
                ? "translateY(0)"
                : "translateY(calc(-100% + 36px))"};
        padding-top: 0px;
        box-shadow: 0px 0px 2px ${({ theme }) => theme.overlayGrey};
    }
`;

const OptionsContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    z-index: 999;
`;

const CloseOptionsContainer = styled.div`
    display: block;
    font-weight: 700;
    padding-top: 24px;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 30px;
    width: 100%;

    @media ${devices.mobileL} {
        display: none;
    }
`;

const CloseOptionsButton = styled(SmallButton)`
    color: ${({ theme }) => theme.color};
    border: 2px solid ${({ theme }) => theme.color};
    width: 100%;
`;

export const OptionItem = styled.div`
    display: flex;
    background-color: transparent;
    color: ${({ theme }) => theme.color};
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 16px;
    padding: 12px 16px;
    font-weight: 700;
    cursor: pointer;
    width: 100%;
    background-color: transparent;
    transition: background-color ease 0.2s;

    &:hover,
    &:focus {
        background-color: ${({ theme }) => theme.overlayGrey};
    }
`;

export const OptionItemIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const OptionItemText = styled.div.attrs(
    (props: { isRed?: boolean }) => props
)`
    display: block;
    font-weight: inherit;
    color: ${({ theme, isRed }) => (isRed ? COLORS.red : theme.color)};
`;

const Options: FunctionComponent<OptionsProps> = ({ icon, title, isOpen, toggleOptions, children, mirrored }) => {
    const buttonRef = useRef<HTMLDivElement | null>(null);

    const [position, setPosition] = useState<{ top: number; side: number }>({
        top: 0,
        side: 0,
    });

    const [isInUpperHalf, setIsInUpperHalf] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const buttonElement = buttonRef.current;
            
            if (buttonElement) {
                const rect = buttonElement.getBoundingClientRect();
                const screenHeight = document.body.clientHeight;
                const scrollY = window.scrollY;

                const topPosition = rect.top + scrollY;

                setIsInUpperHalf(topPosition < screenHeight / 2);

                setPosition({
                    top: rect.top,
                    side: mirrored ? rect.left : document.body.clientWidth - rect.right,
                });
            }
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleScroll);
        window.addEventListener("click", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
            window.removeEventListener("click", handleScroll);
        };
    }, [mirrored]);

    return (
        <PageBlock onClick={(e) => e.stopPropagation()}>
            <ControlContainer
                role="button"
                title={title}
                aria-label={title}
                onClick={(e) => {
                    e.stopPropagation();
                    toggleOptions();
                }}
                ref={buttonRef}
            >
                {icon}
            </ControlContainer>
            {isOpen && (
                <PortalComponent>
                    <OptionsContainerBackground
                        onClick={() => {
                            toggleOptions();
                        }}
                    />
                    <OptionsContainer
                        onClick={(e) => e.stopPropagation()}
                        role="menu"
                        position={position}
                        isInUpperHalf={isInUpperHalf}
                    >
                        <OptionsContent
                            onClick={() => toggleOptions()}
                        >
                            {children}
                        </OptionsContent>
                        <CloseOptionsContainer>
                            <CloseOptionsButton
                                role="button"
                                title="Close"
                                aria-label="Close"
                                onClick={() => {
                                    toggleOptions();
                                }}
                            >
                                Close
                            </CloseOptionsButton>
                        </CloseOptionsContainer>
                    </OptionsContainer>
                </PortalComponent>
            )}
        </PageBlock>
    );
}

export default Options;