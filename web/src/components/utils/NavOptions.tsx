import { FunctionComponent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Settings from "../icons/Settings";
import Exit from "../icons/Exit";
import { PageText } from "../../styles/global";
import { COLORS } from "../../styles/colors";
import { useMeData } from "../../utils/useMeData";
import Profile from "../icons/Profile";

interface NavOptionsProps {
    type: "nav" | "header";
    position: DOMRect | null;
    closeOptions: () => void;
    buttonRef: React.MutableRefObject<HTMLDivElement | null>;
}

const NavOptionsContainer = styled.div.attrs(
    (props: { optionsType: string, position: { top: number; left: number }, ready: boolean }) => props
)`
    display: ${props => props.ready ? "flex" : "none"};
    position: fixed;
    flex-direction: column;
    background-color: ${({ theme }) => theme.background};
    box-shadow: 0px 0px 2px ${({ theme }) => theme.opaqueGrey};
    z-index: 999;
    border-radius: 16px;
    top: ${props => props.optionsType === "header" ? `${props.position.top + 44}px` : `${props.position.top}px`};
    left: ${props => `${props.position.left}px`};
    transform: ${props => props.optionsType === "nav" ? "translateY(-100%)" : "none"};
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

const NavOptions: FunctionComponent<NavOptionsProps> = ({ type, position, closeOptions, buttonRef }) => {
    const { me, error } = useMeData();
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
        <NavOptionsContainer ref={ref} optionsType={type} position={buttonPosition} ready={ready}>
            {(me && !error && type === "header") && (
                <NavOption>
                    <Link
                        to={`/${me.username}`}
                        title={me.name}
                        aria-label={me.name}
                    >
                        <NavOptionIcon>
                            <Profile isActive={false} />
                        </NavOptionIcon>
                        <NavOptionText>
                            Profile
                        </NavOptionText>
                    </Link>
                </NavOption>
            )}
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