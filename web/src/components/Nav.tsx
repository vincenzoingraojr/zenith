import { FunctionComponent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { devices } from "../styles/devices";
import { mediaQuery } from "../utils/mediaQuery";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "./icons/Logo";
import Home from "./icons/Home";
import Magnifier from "./icons/Magnifier";
import Bell from "./icons/Bell";
import Profile from "./icons/Profile";
import Mail from "./icons/Mail";
import NavOptions from "./utils/NavOptions";
import {
    ControlContainer,
    NotificationsCount,
    OptionBaseIcon,
} from "../styles/global";
import Menu from "./icons/Menu";
import { useNavOptions } from "./utils/hooks";
import { useMeData } from "../utils/user/userQueries";
import Wallet from "./icons/Wallet";
import Add from "./icons/Add";
import { COLORS } from "../styles/colors";
import { useNotificationsContext } from "../utils/NotificationsProvider";
import { scrollToTop } from "../utils/scrollToTop";

interface NavProps {
    noNav?: boolean;
    activityIcon?: JSX.Element;
    activityType: "reply" | "new_conversation" | "default";
    activity?: () => void;
}

const NavWrapper = styled.nav.attrs((props: { hidden: boolean }) => props)`
    display: ${(props) => (props.hidden ? "none" : "block")};
    position: relative;
    top: unset;
    height: auto;
    z-index: unset;

    ${mediaQuery(
        "(min-width: 600px) and (min-height: 480px)",
        devices.laptopM
    )} {
        display: flex;
        position: sticky;
        top: 0;
        height: 100vh;
        z-index: 11;
        width: 100%;
        gap: 16px;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding-top: 16px;
        padding-bottom: 16px;
        overflow: auto;
    }
`;

const NavItemLink = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        border-radius: 9999px;
        background-color: transparent;
        text-decoration: none;
        transition: background-color ease 0.2s;
    }

    a:hover,
    a:active {
        text-decoration: none;
        background-color: ${({ theme }) => theme.overlayGrey};
    }
`;

const BrandLink = styled(NavItemLink)`
    display: none;

    ${mediaQuery(
        "(min-width: 600px) and (min-height: 480px)",
        devices.laptopM
    )} {
        display: flex;

        a {
            width: 60px;
            height: 60px;
        }
    }
`;

const NavContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    gap: 0px;
    position: fixed;
    background-color: ${({ theme }) => theme.background};
    height: 60px;
    z-index: 10;
    top: unset;
    left: 0;
    right: 0;
    bottom: 0;
    border-top: 1px solid ${({ theme }) => theme.inputText};

    ${mediaQuery(
        "(min-width: 600px) and (min-height: 480px)",
        devices.laptopM
    )} {
        position: relative;
        flex-direction: column;
        align-items: unset;
        gap: 12px;
        background-color: transparent;
        height: auto;
        z-index: unset;
        left: unset;
        right: unset;
        bottom: unset;
        justify-content: unset;
        border-top: none;
    }
`;

const CustomNavItemLink = styled(NavItemLink).attrs(
    (props: { type: "nav" | "header" }) => props
)`
    display: ${(props) => (props.type === "nav" ? "none" : "flex")};

    ${mediaQuery(
        "(min-width: 600px) and (min-height: 480px)",
        devices.laptopM
    )} {
        display: ${(props) => (props.type === "nav" ? "flex" : "none")};
    }
`;

const NavOptionsContainer = styled.div`
    display: none;

    ${mediaQuery(
        "(min-width: 600px) and (min-height: 480px)",
        devices.laptopM
    )} {
        display: block;
    }
`;

const CustomNavContainer = styled.div.attrs(
    (props: { type: "nav" | "header" }) => props
)`
    display: ${(props) => (props.type === "nav" ? "none" : "flex")};

    ${mediaQuery(
        "(min-width: 600px) and (min-height: 480px)",
        devices.laptopM
    )} {
        display: ${(props) => (props.type === "nav" ? "flex" : "none")};
    }
`;

const ActivityButtonContainer = styled.div`
    display: block;
    position: fixed;
    top: unset;
    left: unset;
    right: 16px;
    bottom: 80px;

    ${mediaQuery(
        "(min-width: 600px) and (min-height: 480px)",
        devices.laptopM
    )} {
        position: unset;
    }
`;

const ActivityButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 54px;
    height: 54px;
    border: none;
    background-color: ${COLORS.blue};
    color: inherit;
    border-radius: 9999px;
    cursor: pointer;
    box-shadow: 0px 0px 2px ${({ theme }) => theme.overlayGrey};

    ${mediaQuery(
        "(min-width: 600px) and (min-height: 480px)",
        devices.laptopM
    )} {
        box-shadow: none;
    }
`;

const NavIconWithBadge = styled(OptionBaseIcon)`
    position: relative;
`;

const Nav: FunctionComponent<NavProps> = ({ noNav, activityIcon, activityType, activity }) => {
    const { me } = useMeData();
    const { showOptions, toggleOptions, closeOptions } = useNavOptions();
    const {
        showOptions: showBottomNavOptions,
        toggleOptions: toggleBottomNavOptions,
        closeOptions: closeBottomNavOptions,
    } = useNavOptions();

    const [position, setPosition] = useState<DOMRect | null>(null);
    const [bottomNavPosition, setBottomNavPosition] = useState<DOMRect | null>(
        null
    );
    const divRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let navRefVar = navRef.current;

        const handleOptions = () => {
            if (divRef.current) {
                const rect = divRef.current.getBoundingClientRect();

                setPosition(rect);
            }

            if (buttonRef.current) {
                const bottomNavRect = buttonRef.current.getBoundingClientRect();

                setBottomNavPosition(bottomNavRect);
            }
        };

        handleOptions();

        navRefVar?.addEventListener("scroll", handleOptions);
        window.addEventListener("scroll", handleOptions);
        window.addEventListener("resize", handleOptions);

        return () => {
            navRefVar?.removeEventListener("scroll", handleOptions);
            window.removeEventListener("scroll", handleOptions);
            window.removeEventListener("resize", handleOptions);

            navRefVar = null;
        };
    }, []);

    const navigate = useNavigate();
    const location = useLocation();

    const { notificationsCount } = useNotificationsContext();

    return (
        <NavWrapper hidden={noNav || false} ref={navRef}>
            <BrandLink>
                <Link to="/home" title="Zenith" aria-label="Zenith">
                    <Logo type="inline" />
                </Link>
            </BrandLink>
            <NavContainer role="menu">
                {!me && (
                    <CustomNavContainer type="header" role="menuitem">
                        <ControlContainer
                            ref={buttonRef}
                            size={48}
                            role="button"
                            title="Options"
                            aria-label="Options"
                            onClick={() => {
                                toggleBottomNavOptions();
                            }}
                        >
                            <Menu />
                        </ControlContainer>
                        {showBottomNavOptions && (
                            <NavOptions
                                key={"bottom-nav"}
                                position={bottomNavPosition}
                                closeOptions={closeBottomNavOptions}
                                buttonRef={buttonRef}
                            />
                        )}
                    </CustomNavContainer>
                )}
                <NavItemLink role="menuitem">
                    <NavLink
                        to="/home"
                        title="Home"
                        aria-label="Home"
                        onClick={() => scrollToTop("/home")}
                    >
                        {({ isActive }) => <Home isActive={isActive} />}
                    </NavLink>
                </NavItemLink>
                <NavItemLink role="menuitem">
                    <NavLink
                        to="/search"
                        title="Search"
                        aria-label="Search"
                        onClick={() => scrollToTop("/search")}
                    >
                        {({ isActive }) => (
                            <Magnifier type="normal" isActive={isActive} />
                        )}
                    </NavLink>
                </NavItemLink>
                {me && (
                    <>
                        <CustomNavItemLink type="nav" role="menuitem">
                            <NavLink
                                to={`/${me.username}`}
                                title={me.name}
                                aria-label={me.name}
                                end
                                onClick={() => scrollToTop(`/${me.username}`)}
                            >
                                {({ isActive }) => (
                                    <Profile isActive={isActive} />
                                )}
                            </NavLink>
                        </CustomNavItemLink>
                        <ActivityButtonContainer role="menuitem">
                            <ActivityButton
                                title={
                                    activityType === "new_conversation"
                                        ? "Create a new chat or group" : (activityType === "reply" ? "Reply to this post"
                                        : "Create a new post")
                                }
                                aria-label={
                                    activityType === "new_conversation"
                                        ? "Create a new chat or group" : (activityType === "reply" ? "Reply to this post"
                                        : "Create a new post")
                                }
                                role="link"
                                onClick={() => {
                                    if (activityType === "default") {
                                        navigate("/create_post/new/post/from_modal", {
                                            state: {
                                                backgroundLocation: location,
                                            },
                                        });
                                    } else {
                                        activity && activity();
                                    }
                                }}
                            >
                                {activityIcon ? (
                                    <>
                                        {activityIcon}
                                    </>
                                ) : (
                                    <Add color={COLORS.white} />
                                )}
                            </ActivityButton>
                        </ActivityButtonContainer>
                        <NavItemLink role="menuitem">
                            <NavLink
                                to="/notifications"
                                title="Notifications"
                                aria-label="Notifications"
                                onClick={() => scrollToTop("/notifications")}
                            >
                                {({ isActive }) => (
                                    <NavIconWithBadge>
                                        <Bell isActive={isActive} />
                                        {notificationsCount > 0 &&
                                            window.location.pathname !==
                                                "/notifications" && (
                                                <NotificationsCount>
                                                    {notificationsCount > 9
                                                        ? "9+"
                                                        : notificationsCount}
                                                </NotificationsCount>
                                            )}
                                    </NavIconWithBadge>
                                )}
                            </NavLink>
                        </NavItemLink>
                        <NavItemLink role="menuitem">
                            <NavLink
                                to="/messages"
                                title="Messages"
                                aria-label="Messages"
                                onClick={() => scrollToTop("/messages")}
                            >
                                {({ isActive }) => (
                                    <Mail type="nav" isActive={isActive} />
                                )}
                            </NavLink>
                        </NavItemLink>
                        <NavItemLink role="menuitem">
                            <NavLink
                                to="/payments"
                                title="Payments"
                                aria-label="Payments"
                                onClick={() => scrollToTop("/payments")}
                            >
                                {({ isActive }) => (
                                    <Wallet isActive={isActive} />
                                )}
                            </NavLink>
                        </NavItemLink>
                    </>
                )}
            </NavContainer>
            <NavOptionsContainer>
                <ControlContainer
                    ref={divRef}
                    size={48}
                    role="button"
                    title="Options"
                    aria-label="Options"
                    onClick={() => {
                        toggleOptions();
                    }}
                >
                    <Menu />
                </ControlContainer>
                {showOptions && (
                    <NavOptions
                        key={"nav"}
                        position={position}
                        closeOptions={closeOptions}
                        buttonRef={divRef}
                    />
                )}
            </NavOptionsContainer>
        </NavWrapper>
    );
};

export default Nav;
