import { FunctionComponent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Settings from "../icons/Settings";
import Exit from "../icons/Exit";
import {
    CustomSpanOption,
    LinkOptionBaseItem,
    OptionBaseIcon,
    PageText,
} from "../../styles/global";
import { COLORS } from "../../styles/colors";
import { useMeData } from "../../utils/userQueries";
import { useThemeContext } from "../../styles/ThemeContext";
import ThemeIcon from "../icons/ThemeIcon";

interface NavOptionsProps {
    position: DOMRect | null;
    closeOptions: () => void;
    buttonRef: React.MutableRefObject<HTMLDivElement | null>;
}

const NavOptionsContainer = styled.div.attrs(
    (props: { position: { top: number; left: number }; ready: boolean }) =>
        props
)`
    display: ${(props) => (props.ready ? "flex" : "none")};
    position: fixed;
    flex-direction: column;
    background-color: ${({ theme }) => theme.background};
    box-shadow: 0px 0px 2px ${({ theme }) => theme.overlayGrey};
    z-index: 999;
    border-radius: 16px;
    top: ${(props) => `${props.position.top}px`};
    left: ${(props) => `${props.position.left}px`};
    transform: translateY(-100%);
    transform-origin: top;
`;

const NavOption = styled(LinkOptionBaseItem)`
    a,
    span {
        gap: 12px;
        font-weight: 500;
        padding: 12px 24px;
        justify-content: flex-start;
    }

    &:first-child a,
    &:first-child span {
        border-radius: 16px 16px 0px 0px;
    }

    &:last-child a,
    &:last-child span {
        border-radius: 0px 0px 16px 16px;
    }
`;

const NavOptionText = styled(PageText).attrs(
    (props: { color?: string }) => props
)`
    color: ${(props) => (props.color ? props.color : "inherit")};
`;

const NavOptions: FunctionComponent<NavOptionsProps> = ({
    position,
    closeOptions,
    buttonRef,
}) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const { me } = useMeData();

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                ref.current &&
                buttonRef.current &&
                !ref.current.contains(e.target as Node) &&
                !buttonRef.current.contains(e.target as Node) &&
                e.target instanceof HTMLElement
            ) {
                closeOptions();

                setReady(false);
            }
        };

        window.addEventListener("mousedown", handleClickOutside);

        return () =>
            window.removeEventListener("mousedown", handleClickOutside);
    }, [closeOptions, ref, buttonRef]);

    const [buttonPosition, setButtonPosition] = useState<{
        top: number;
        left: number;
    }>({
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

    const { toggleTheme, isDarkMode } = useThemeContext();

    return (
        <NavOptionsContainer ref={ref} position={buttonPosition} ready={ready}>
            <NavOption>
                <CustomSpanOption
                    role="button"
                    title={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
                    aria-label={`Switch to ${
                        isDarkMode ? "light" : "dark"
                    } mode`}
                    onClick={() => toggleTheme()}
                >
                    <OptionBaseIcon>
                        <ThemeIcon type="options" />
                    </OptionBaseIcon>
                    <NavOptionText>
                        Switch to {isDarkMode ? "light" : "dark"}
                    </NavOptionText>
                </CustomSpanOption>
            </NavOption>
            {me ? (
                <>
                    <NavOption>
                        <Link
                            to="/settings"
                            title="Settings"
                            aria-label="Settings"
                        >
                            <OptionBaseIcon>
                                <Settings type="options" />
                            </OptionBaseIcon>
                            <NavOptionText>Settings</NavOptionText>
                        </Link>
                    </NavOption>
                    <NavOption>
                        <Link to="/logout" title="Log out" aria-label="Log out">
                            <OptionBaseIcon>
                                <Exit type="options" color={COLORS.red} />
                            </OptionBaseIcon>
                            <NavOptionText color={COLORS.red}>
                                Log out
                            </NavOptionText>
                        </Link>
                    </NavOption>
                </>
            ) : (
                <>
                    <NavOption>
                        <Link
                            to="/login"
                            title="Log in to Zenith"
                            aria-label="Log in to Zenith"
                        >
                            <NavOptionText>Log in</NavOptionText>
                        </Link>
                    </NavOption>
                    <NavOption>
                        <Link
                            to="/signup"
                            title="Sign up to Zenith"
                            aria-label="Sign up to Zenith"
                        >
                            <NavOptionText color={COLORS.blue}>
                                Sign up
                            </NavOptionText>
                        </Link>
                    </NavOption>
                </>
            )}
        </NavOptionsContainer>
    );
};

export default NavOptions;
