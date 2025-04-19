import { FunctionComponent } from "react";
import styled from "styled-components";
import { devices } from "../styles/devices";
import { mediaQuery } from "../utils/mediaQuery";
import { Link, NavLink } from "react-router-dom";
import Logo from "./icons/Logo";
import Home from "./icons/Home";
import { ControlContainer } from "../styles/global";
import Menu from "./icons/Menu";
import Magnifier from "./icons/Magnifier";
import Bell from "./icons/Bell";
import { useMeData } from "../utils/useMeData";
import Profile from "./icons/Profile";
import Mail from "./icons/Mail";

interface NavProps {
    noNav?: boolean;
}

const NavWrapper = styled.nav.attrs(
    (props: { hidden: boolean }) => props
)`
    display: ${props => props.hidden ? "none" : "block"};
    position: relative;
    top: unset;
    height: auto;
    z-index: 100;

    ${mediaQuery(
        "(min-width: 600px) and (min-height: 480px)",
        devices.laptopM
    )} {
        display: flex;
        position: sticky;
        top: 0;
        height: 100vh;
        z-index: 100;
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
        padding: 12px;
        border-radius: 9999px;
        background-color: transparent;
        text-decoration: none;
        transition: background-color ease 0.2s;
    }

    a:hover,
    a:active {
        text-decoration: none;
        background-color: ${({ theme }) => theme.opaqueGrey};
    }
`;

const BrandLink = styled(NavItemLink)`
    display: none;

    ${mediaQuery(
        "(min-width: 600px) and (min-height: 480px)",
        devices.laptopM
    )} {
        display: flex;
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
    z-index: 100;
    top: unset;
    left: 0;
    right: 0;
    bottom: 0;
    border-top: 1px solid ${({ theme }) => theme.color};

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

const NavOptionsContainer = styled.div`
    display: none;

    ${mediaQuery(
        "(min-width: 600px) and (min-height: 480px)",
        devices.laptopM
    )} {
        display: block;
    }
`;

const ProfileNavItemLink = styled(NavItemLink)`
    display: none;

    ${mediaQuery(
        "(min-width: 600px) and (min-height: 480px)",
        devices.laptopM
    )} {
        display: flex;
    }
`;

const Nav: FunctionComponent<NavProps> = ({ noNav }) => {
    const meData = useMeData();

    return (
        <NavWrapper hidden={noNav || false}>
            <BrandLink>
                <Link to="/home" title="Zenith" aria-label="Zenith">
                    <Logo type="inline" />
                </Link>
            </BrandLink>
            <NavContainer>
                <NavItemLink>
                    <NavLink
                        to="/home"
                        title="Home"
                        aria-label="Home"
                    >
                        {({ isActive }) => (
                            <Home isActive={isActive} />
                        )}
                    </NavLink>
                </NavItemLink>
                <NavItemLink>
                    <NavLink
                        to="/search"
                        title="Search"
                        aria-label="Search"
                    >
                        {({ isActive }) => (
                            <Magnifier type="normal" isActive={isActive} />
                        )}
                    </NavLink>
                </NavItemLink>
                {(meData.me && !meData.error) && (
                    <>
                        <ProfileNavItemLink>
                            <NavLink
                                to={`/${meData.me.username}`}
                                title={meData.me.name}
                                aria-label={meData.me.name}
                                end
                            >
                                {({ isActive }) => (
                                    <Profile isActive={isActive} />
                                )}
                            </NavLink>
                        </ProfileNavItemLink>
                        <NavItemLink>
                            <NavLink
                                to="/notifications"
                                title="Notifications"
                                aria-label="Notifications"
                            >
                                {({ isActive }) => (
                                    <Bell isActive={isActive} />
                                )}
                            </NavLink>
                        </NavItemLink>
                        <NavItemLink>
                            <NavLink
                                to="/messages"
                                title="Messages"
                                aria-label="Messages"
                            >
                                {({ isActive }) => (
                                    <Mail isActive={isActive} />
                                )}
                            </NavLink>
                        </NavItemLink>
                    </>
                )}
            </NavContainer>
            <NavOptionsContainer>
                <ControlContainer
                    size={48}
                >
                    <Menu />
                </ControlContainer>
            </NavOptionsContainer>
        </NavWrapper>
    );
}

export default Nav;