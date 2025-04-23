import { FunctionComponent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Settings from "../icons/Settings";
import Exit from "../icons/Exit";
import { PageText } from "../../styles/global";
import { COLORS } from "../../styles/colors";

interface NavOptionsProps {
    position: DOMRect | null;
    closeOptions: () => void;
    buttonRef: React.MutableRefObject<HTMLDivElement | null>;
}

const NavOptionsContainer = styled.div.attrs(
    (props: { position: { top: number; left: number }, ready: boolean }) => props
)`
    display: ${props => props.ready ? "flex" : "none"};
    position: fixed;
    flex-direction: column;
    background-color: ${({ theme }) => theme.background};
    box-shadow: 0px 0px 2px ${({ theme }) => theme.opaqueGrey};
    z-index: 999;
    border-radius: 16px;
    top: ${props => `${props.position.top}px`};
    left: ${props => `${props.position.left}px`};
    transform: translateY(-100%);
    transform-origin: top;
`;

const NavOption = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;

    a {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        text-decoration: none;
        color: ${({ theme }) => theme.color};
        gap: 12px;
        font-weight: 500;
        padding: 12px 24px;
        width: 100%;
        background-color: transparent;
        text-decoration: none;
        transition: background-color ease 0.2s;
    }

    a:hover,
    a:active {
        text-decoration: none;
        background-color: ${({ theme }) => theme.opaqueGrey};
    }
    
    &:first-child a {
        border-radius: 16px 16px 0px 0px;
    }

    &:last-child a {
        border-radius: 0px 0px 16px 16px;
    }
`;

const NavOptionIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const NavOptionText = styled(PageText).attrs(
    (props: { color?: string }) => props
)`
    color: ${props => props.color ? props.color : "inherit"};
`;

const NavOptions: FunctionComponent<NavOptionsProps> = ({ position, closeOptions, buttonRef }) => {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && buttonRef.current && !ref.current.contains(e.target as Node) && !buttonRef.current.contains(e.target as Node) && e.target instanceof HTMLElement) {
                closeOptions();

                setReady(false);
            }
        };

        window.addEventListener("mousedown", handleClickOutside);

        return () => window.removeEventListener("mousedown", handleClickOutside);
    }, [closeOptions, ref, buttonRef]);

    const [buttonPosition, setButtonPosition] = useState<{ top: number; left: number }>({
        top: 0,
        left: 0,
    });

    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (position) {
            setButtonPosition({
                top: position.top,
                left: position.left,
            });

            setReady(true);
        } else {
            setReady(false);
        }
    }, [position]);

    return (
        <NavOptionsContainer ref={ref} position={buttonPosition} ready={ready}>
            <NavOption>
                <Link
                    to="/settings"
                    title="Settings"
                    aria-label="Settings"
                >
                    <NavOptionIcon>
                        <Settings />
                    </NavOptionIcon>
                    <NavOptionText>
                        Settings
                    </NavOptionText>
                </Link>
            </NavOption>
            <NavOption>
                <Link
                    to="/logout"
                    title="Log out"
                    aria-label="Log out"
                >
                    <NavOptionIcon>
                        <Exit isRed={true} />
                    </NavOptionIcon>
                    <NavOptionText color={COLORS.red}>
                        Log out
                    </NavOptionText>
                </Link>
            </NavOption>
        </NavOptionsContainer>
    );
}

export default NavOptions;