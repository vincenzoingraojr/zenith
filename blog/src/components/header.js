import * as React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import Logo from "./icons/logo";
import Menu from "./icons/menu";
import { devices } from "../styles/devices";
import Close from "./icons/close";
import Magnifier from "./icons/magnifier";
import { ControlContainer } from "../styles/global";

const HeaderContainer = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: unset;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #FFFFFF;
    z-index: 1000;
    gap: 24px;
    padding-left: 24px;
    padding-right: 24px;
    height: 72px;
    overflow: auto;

    @media ${devices.laptopS} {
        padding-left: 48px;
        padding-right: 48px;
    }
`;

const BrandContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 12px; 
`;

const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    a {
        display: block;
        text-decoration: none;
    }

    a:hover, a:active {
        text-decoration: none;
    }
`;

const SiteTitle = styled.div`
    display: block;
    font-weight: 700;
    font-size: 24px;
    color: #000000;
`;

const NavContainer = styled.nav`
    display: flex;
    position: fixed;
    flex-direction: column;
    top: 72px;
    left: 0;
    right: 0;
    bottom: 0;
    gap: 24px;
    padding-top: 48px;
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 48px;
    overflow-y: auto;
    background-color: #FFFFFF;

    @media ${devices.tablet} {
        position: relative;
        top: unset;
        left: unset;
        right: unset;
        bottom: unset;
        padding: 0;
        flex-direction: row;
        overflow-y: hidden;
        gap: 12px;
        background-color: transparent;
    }

    @media ${devices.laptopL} {
        gap: 24px;
    }
`;

const NavEntry = styled.div`
    display: flex;
    align-items: center;
    text-transform: uppercase;

    a {
        display: block;
        font-weight: 700;
        font-size: 36px;
        text-decoration: none;
        color: #000000;
        padding: 0;
        text-decoration: none;
    }

    a:hover, a:active {
        text-decoration: none;
    }

    a.active, a.active:hover, a.active:active {
        text-decoration: underline;
        text-decoration-color: #386BD9;
    }

    @media ${devices.tablet} {
        a {
            font-size: 18px;
            padding: 8px 12px;
            background-color: transparent;
            border-radius: 9999px;
        }

        a:hover {
            background-color: rgba(214, 205, 205, 0.4);
        }

        a.active {
            color: #FFFFFF;
            background-color: #386BD9;
            text-decoration: none;
        }

        a.active:hover, a.active:active {
            text-decoration: none;
        }
    }
`;

const HeaderRightSide = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    justify-content: flex-end;

    @media ${devices.laptopL} {
        gap: 24px;
    }
`;

const MenuButton = styled(ControlContainer)`
    @media ${devices.tablet} {
        display: none;
    }
`;

const SearchButton = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 36px;
    height: 36px;
    border-radius: 9999px;

    &:hover, &:focus {
        background-color: rgba(214, 205, 205, 0.4);
    }
`;

const Header = () => {
    const [menu, setMenu] = React.useState(false);

    React.useEffect(() => {
        if (window.innerWidth > 768 && !menu) {
            setMenu(true);
        }

        if (menu && window.innerWidth < 768) {
            document.body.classList.add("not-scrolling");
        } else {
            document.body.classList.remove("not-scrolling");
        }

        window.addEventListener("resize", () => {
            if ((window.innerWidth > 768 && !menu) || (menu && window.innerWidth > 768)) {
                setMenu(true);
                document.body.classList.remove("not-scrolling");
            }
    
            if (window.innerWidth < 768 && menu) {
                setMenu(false);
                document.body.classList.remove("not-scrolling");
            }
        });
    }, [menu]);

    return (
        <HeaderContainer>
            <BrandContainer>
                <LogoContainer>
                    <Link to="/" title="Home">
                        <Logo />
                    </Link>
                </LogoContainer>
                <SiteTitle>Blog</SiteTitle>
            </BrandContainer>
            <HeaderRightSide>
                <SearchButton to="/search" title="Search for a blog post" aria-label="Search for a blog post">
                    <Magnifier color={"#000000"} />
                </SearchButton>
                <MenuButton role="button" tabIndex={0} title="Open menu" aria-label="Open menu" onClick={() => {
                    setMenu(!menu);
                }}>
                    {menu ? (
                        <Close type="normal" color={"#000000"} />
                    ) : (
                        <Menu color={"#000000"} />
                    )}
                </MenuButton>
                {menu && (
                    <NavContainer>
                        <NavEntry>
                            <Link
                                to="/about-us"
                                activeClassName="active"
                                title="About Zenith"
                                aria-label="About Zenith"
                            >
                                About us
                            </Link>
                        </NavEntry>
                        <NavEntry>
                            <Link
                                to="/contact-us"
                                activeClassName="active"
                                title="Contact us"
                                aria-label="Contact us"
                            >
                                Contact us
                            </Link>
                        </NavEntry>
                    </NavContainer>
                )}
            </HeaderRightSide>
        </HeaderContainer>
    );
};

export default Header;
