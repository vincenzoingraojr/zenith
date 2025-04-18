import { FunctionComponent } from "react";
import styled from "styled-components";
import { devices } from "../styles/devices";
import { mediaQuery } from "../utils/mediaQuery";
import { Link, NavLink } from "react-router-dom";
import Logo from "./icons/Logo";
import Home from "./icons/Home";

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

const Nav: FunctionComponent<NavProps> = ({ noNav }) => {
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
            </NavContainer>
        </NavWrapper>
    );
}

export default Nav;