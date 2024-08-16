import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { devices } from "../styles/devices";
import { ControlContainer, LinkButton, PageBlock, PageText } from "../styles/global";
import Close from "./icons/Close";
import Down from "./icons/Down";
import Logo from "./icons/Logo";
import Menu from "./icons/Menu";
import { useEffect, useRef, useState } from "react";

const NavContainer = styled.header`
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: unset;
    height: 100px;
    background-color: #FFFFFF;
    align-items: center;
    justify-content: space-between;
    padding-left: 24px;
    padding-right: 24px;
    z-index: 100;

    @media ${devices.laptopS} {
        padding-left: 48px;
        padding-right: 48px;
    }
`;

const SiteBrand = styled.div`
    display: block;

    a {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 8.5px;
        text-decoration: none;
    }

    a:hover,
    a:active {
        text-decoration: none;
    }
`;

const SiteTitle = styled.div`
    display: block;
    font-weight: 700;
    font-size: 24px;
    color: #000000;
`;

const HeaderRightContent = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
    align-items: center;
    justify-content: flex-end;

    @media ${devices.laptopS} {
        gap: 24px;
    }
`;

const NavButtonLink = styled(LinkButton)`
    display: none;
    background-color: #386BD9;
    color: #FFFFFF;

    @media (min-width: 450px) {
        display: block;
    }
`;

const NavContent = styled.nav.attrs(
    (props: { visible: boolean }) => props
)`
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
    justify-content: flex-start;
    position: fixed;
    top: 0;
    left: unset;
    right: 0;
    bottom: 0;
    width: 100%;
    z-index: 1000;
    background-color: #FFFFFF;
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 24px;
    height: 100vh;
    overflow: auto;
    box-shadow: none;
    animation: ${(props) => (props.visible ? `slideIn` : `slideOut`)} 0.2s;

    @media ${devices.mobileL} {
        width: 64%;
        box-shadow: 0px 0px 120px 0 rgb(20 23 26 / 16%);
    }
    
    @media ${devices.tablet} {
        position: unset;
        flex-direction: row;
        top: unset;
        left: unset;
        right: unset;
        bottom: unset;
        width: auto;
        height: auto;
        z-index: unset;
        background-color: transparent;
        padding-left: 0;
        padding-right: 0;
        padding-bottom: 0;
        overflow: hidden;
        align-items: center;
        justify-content: flex-end;
        box-shadow: none;
        animation: none;
    }

    @media ${devices.laptopS} {
        gap: 24px;
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
        }

        to {
            transform: translateX(0%);
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0%);
        }

        to {
            transform: translateX(100%);
        }
    }
`;

const NavEntryButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 16px;
    gap: 6px;
    padding: 10px;
    transition: background-color ease 0.4s;
    color: #000000;
    cursor: pointer;
    background-color: transparent;
    width: max-content;
    border-radius: 10px;

    &:hover,
    &:focus,
    &.active {
        background-color: #D6CDCD;
    }
`;

const NavEntryContainer = styled.div`
    display: block;
`;

const NavDropDownMenu = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    position: relative;
    top: unset;
    padding: 16px;
    border-radius: 0px;
    background-color: transparent;
    box-shadow: none;

    @media ${devices.tablet} {
        position: absolute;
        top: 92px;
        border-radius: 12px;
        background-color: #FFFFFF;
        box-shadow: 4px 8px 24px 0 rgb(20 23 26 / 16%);
    }
`;

const NavEntry = styled.div`
    display: block;

    a {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 6px;
        font-size: 16px;
        color: #000000;
    }

    a.current-page {
        text-decoration: underline;
    }
`;

const MenuButton = styled.div`
    display: block;

    @media ${devices.tablet} {
        display: none;
    }
`;

const MobileMenuHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100px;
    min-height: 100px;

    @media ${devices.tablet} {
        display: none;
    }
`;

const MenuTitle = styled.div`
    display: block;
    font-size: 22px;
    font-weight: 700;
`;

interface DropDownProps {
    title: string;
    children: JSX.Element;
    isOpen: boolean;
    toggleDropDown: () => void;
}

const DropDown: React.FC<DropDownProps> = ({ title, children, isOpen, toggleDropDown }) => {
    return (
        <NavEntryContainer>
            <NavEntryButton
                role="button"
                title={title}
                aria-label={title}
                onClick={toggleDropDown}
            >
                <PageText>{title}</PageText>
                <Down mode={isOpen} />
            </NavEntryButton>
            {isOpen && <NavDropDownMenu id="dropdown-menu" onClick={(e) => e.preventDefault()}>{children}</NavDropDownMenu>}
        </NavEntryContainer>
    );
};

function Nav() {
    const [activeDropDown, setActiveDropDown] = useState<number | null>(null);
    const [menu, setMenu] = useState(false);
    const ref1 = useRef<HTMLDivElement>(null);
    const ref2 = useRef<HTMLDivElement>(null);
    const ref3 = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            document.body.classList.remove("not-scrolling");

            if (window.innerWidth > 768) {
                setMenu(true);
                setVisible(true);
            } else {
                setMenu(false);
                setVisible(false);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleDropDownClick = (index: number) => {
        setActiveDropDown(activeDropDown === index ? null : index);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (ref1.current && !ref1.current.contains(event.target as Node) && event.target instanceof HTMLElement && !event.target.closest("#dropdown-menu")) {
            setActiveDropDown(null);
        }
        
        if (ref2.current && !ref2.current.contains(event.target as Node) && event.target instanceof HTMLElement && !event.target.closest("#dropdown-menu")) {
            setActiveDropDown(null);
        }

        if (ref3.current && !ref3.current.contains(event.target as Node) && event.target instanceof HTMLElement && !event.target.closest("#dropdown-menu")) {
            setActiveDropDown(null);
        }

        if (menuRef.current && !menuRef.current.contains(event.target as Node) && (window.innerWidth < 768)) {
            setVisible(false);
            setTimeout(() => {
                setMenu(false);
                document.body.classList.remove("not-scrolling");
            }, 200);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <NavContainer>
            <SiteBrand>
                <NavLink
                    to="/"
                    title="Zenith Homepage"
                    aria-label="Zenith Homepage"
                >
                    <Logo type="nav" />
                    <SiteTitle>Zenith</SiteTitle>
                </NavLink>
            </SiteBrand>
            <HeaderRightContent>
                <MenuButton>
                    <ControlContainer
                        role="button"
                        title="Open menu"
                        aria-label="Open menu"
                        onClick={() => {
                            setMenu(true);
                            setVisible(true);
                            document.body.classList.add("not-scrolling");
                        }}
                    >
                        <Menu />
                    </ControlContainer>
                </MenuButton>
                {menu && (
                    <NavContent visible={visible} ref={menuRef}>
                        <MobileMenuHeader>
                            <MenuTitle>Menu</MenuTitle>
                            <ControlContainer
                                role="button"
                                title="Close menu"
                                aria-label="Close menu"
                                onClick={() => {
                                    setVisible(false);
                                    setTimeout(() => {
                                        setMenu(false);
                                        document.body.classList.remove("not-scrolling");
                                    }, 200);
                                }}
                            >
                                <Close type="normal" />
                            </ControlContainer>
                        </MobileMenuHeader>
                        <PageBlock ref={ref1}>
                            <DropDown
                                title="Who we are"
                                isOpen={activeDropDown === 0}
                                toggleDropDown={() => handleDropDownClick(0)}
                                children={
                                    <>
                                        <NavEntry>
                                            <NavLink
                                                to="/about-us"
                                                className={(navData: any) =>
                                                    navData.isActive ? "current-page" : ""
                                                }
                                                title="About us"
                                                aria-label="About us"
                                            >
                                                About us
                                            </NavLink>
                                        </NavEntry>
                                        <NavEntry>
                                            <NavLink
                                                to="/careers"
                                                className={(navData: any) =>
                                                    navData.isActive ? "current-page" : ""
                                                }
                                                title="Careers"
                                                aria-label="Careers"
                                            >
                                                Careers
                                            </NavLink>
                                        </NavEntry>
                                        <NavEntry>
                                            <NavLink
                                                to="/brand-toolkit"
                                                className={(navData: any) =>
                                                    navData.isActive ? "current-page" : ""
                                                }
                                                title="Brand toolkit"
                                                aria-label="Brand toolkit"
                                            >
                                                Brand toolkit
                                            </NavLink>
                                        </NavEntry>
                                    </>
                                }
                            />
                        </PageBlock>
                        <PageBlock ref={ref2}>
                            <DropDown
                                title="Our priorities"
                                isOpen={activeDropDown === 1}
                                toggleDropDown={() => handleDropDownClick(1)}
                                children={
                                    <>
                                        <NavEntry>
                                            <NavLink
                                                to="/our-mission"
                                                className={(navData: any) =>
                                                    navData.isActive ? "current-page" : ""
                                                }
                                                title="Our mission"
                                                aria-label="Our mission"
                                            >
                                                Our mission
                                            </NavLink>
                                        </NavEntry>
                                        <NavEntry>
                                            <NavLink
                                                to="/security-and-privacy"
                                                className={(navData: any) =>
                                                    navData.isActive ? "current-page" : ""
                                                }
                                                title="Security and privacy"
                                                aria-label="Security and privacy"
                                            >
                                                Security and privacy
                                            </NavLink>
                                        </NavEntry>
                                    </>
                                }
                            />
                        </PageBlock>
                        <PageBlock ref={ref3}>
                            <DropDown
                                title="Resources"
                                isOpen={activeDropDown === 2}
                                toggleDropDown={() => handleDropDownClick(2)}
                                children={
                                    <>
                                        <NavEntry
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <a href="https://help.zenith.to" title="Help center" aria-label="Help center" target="_blank" rel="noreferrer">Help center</a>
                                        </NavEntry>
                                        <NavEntry
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <a href="https://blog.zenith.to" title="Zenith Blog" aria-label="Zenith Blog" target="_blank" rel="noreferrer">Blog</a>
                                        </NavEntry>
                                        <NavEntry>
                                            <NavLink
                                                to="/contact-us"
                                                className={(navData: any) =>
                                                    navData.isActive ? "current-page" : ""
                                                }
                                                title="Contact us"
                                                aria-label="Contact us"
                                            >
                                                Contact us
                                            </NavLink>
                                        </NavEntry>
                                    </>
                                }
                            />
                        </PageBlock>
                    </NavContent>
                )}
                <NavButtonLink
                    title="Coming soon"
                    to="/"
                    role="button"
                    aria-label="Coming soon"
                >
                    Coming soon
                </NavButtonLink>
            </HeaderRightContent>
        </NavContainer>
    );
}

export default Nav;
