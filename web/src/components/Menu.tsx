import { FunctionComponent, useState } from "react";
import styled from "styled-components";
import { mediaQuery } from "../utils/mediaQuery";
import { devices } from "../styles/devices";
import { ControlContainer, CustomSpanOption, PageText } from "../styles/global";
import Close from "./icons/Close";
import { useMeData } from "../utils/userQueries";
import profilePicture from "../images/profile-picture.png";
import { Link } from "react-router-dom";
import Profile from "./icons/Profile";
import Settings from "./icons/Settings";
import Exit from "./icons/Exit";
import { COLORS } from "../styles/colors";
import { USER_TYPES } from "../utils/constants";
import { useThemeContext } from "../styles/ThemeContext";
import ThemeIcon from "./icons/ThemeIcon";

interface MenuProps {
    closeMenu: () => void;
}

const MenuWrapper = styled.div`
    position: fixed;
    display: grid;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    align-items: center;
    background-color: transparent;
    justify-content: left;
    z-index: 1000;

    ${mediaQuery(
        "(min-width: 600px) and (min-height: 480px)",
        devices.laptopM
    )} {
        display: none;
    }
`;

const MenuOverlay = styled.div.attrs((props: { visible: boolean }) => props)`
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background-color: ${({ theme }) => theme.opaqueGrey};
    opacity: ${(props) => (props.visible ? "1" : "0")};
    transition: opacity ease 0.2s;
`;

const MenuContainer = styled.div.attrs((props: { visible: boolean }) => props)`
    display: grid;
    grid-template-rows: 60px auto;
    grid-template-columns: auto;
    position: relative;
    z-index: 9999;
    overflow: hidden;
    background-color: ${({ theme }) => theme.background};
    width: 260px;
    height: 100vh;
    animation: ${(props) => (props.visible ? `slideIn` : `slideOut`)} 0.2s;

    @media ${devices.mobileM} {
        width: 320px;
    }

    @media ${devices.mobileL} {
        width: 360px;
    }

    @keyframes slideIn {
        from {
            transform: translateX(-100%);
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
            transform: translateX(-100%);
        }
    }
`;

const MenuHeader = styled.div`
    display: flex;
    padding-left: 16px;
    padding-right: 16px;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    min-height: 60px;
    gap: 12px;
    width: 100%;
    overflow: hidden;
`;

const MenuTitle = styled.div`
    display: block;
    font-weight: 700;
    color: ${({ theme }) => theme.color};
    font-size: inherit;
    width: auto;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const MenuContent = styled.div`
    display: block;
    width: 100%;
    max-height: calc(100vh + 60px);
    overflow-y: auto;
`;

const ProfileMenuContainer = styled.div`
    display: block;
    width: 100%;
    overflow: hidden;
    padding-top: 12px;
    padding-bottom: 12px;

    a {
        display: flex;
        flex-direction: column;
        gap: 16px;
        width: 100%;
        padding-left: 16px;
        padding-right: 16px;
        overflow: hidden;
        text-decoration: none;
    }

    a:hover,
    a:active {
        text-decoration: none;
    }
`;

const ProfileMenuImageContainer = styled.div.attrs((props: { type: string }) => props)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border-radius: ${(props) => (props.type === USER_TYPES.ORGANIZATION ? "6px" : "21px")};

    img {
        width: inherit;
        height: inherit;
        border-radius: inherit;
        object-fit: cover;
        object-position: center;
    }
`;

const ProfileMenuInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
    overflow: hidden;
`;

const ProfileMenuInfoFullName = styled(PageText)`
    font-weight: 700;
    font-size: 20px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-decoration: none;
    color: ${({ theme }) => theme.color};

    &:hover,
    &:active {
        text-decoration: underline;
        text-decoration-color: ${({ theme }) => theme.color};
    }
`;

const ProfileMenuInfoUsername = styled(PageText)`
    font-size: 16px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: ${({ theme }) => theme.inputText};
`;

const MenuNav = styled.nav`
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: hidden;
`;

const MenuNavEntry = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 60px;

    a, span {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        color: ${({ theme }) => theme.color};
        font-weight: 500;
        gap: 16px;
        padding-left: 16px;
        padding-right: 16px;
        background-color: transparent;
        transition: background-color ease 0.2s;
        width: 100%;
        height: 60px;
        overflow: hidden;
    }

    a, a:hover, a:active {
        text-decoration: none;
    }

    a:hover, span:hover,
    a:active, span:focus {
        background-color: ${({ theme }) => theme.opaqueGrey};
    }
`;

const MenuNavEntryIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const MenuNavEntryText = styled(PageText).attrs(
    (props: { color?: string }) => props
)`
    display: block;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: ${props => props.color ? props.color : "inherit"};
`;

const Menu: FunctionComponent<MenuProps> = ({ closeMenu }) => {
    const [visible, setVisible] = useState(true);
    const { me, loading } = useMeData();
    const { toggleTheme, isDarkMode } = useThemeContext();

    return (
        <MenuWrapper>
            <MenuOverlay
                role="link"
                visible={visible}
                aria-label="Close menu"
                title="Close menu"
                onClick={() => {
                    setVisible(false);
                    setTimeout(() => {
                        closeMenu();
                    }, 200);
                }}
            ></MenuOverlay>
            <MenuContainer visible={visible}>
                <MenuHeader>
                    <MenuTitle>Account info</MenuTitle>
                    <ControlContainer
                        title="Close menu"
                        role="button"
                        aria-label="Close menu"
                        onClick={() => {
                            setVisible(false);
                            setTimeout(() => {
                                closeMenu();
                            }, 200);
                        }}
                    >
                        <Close type="normal" />
                    </ControlContainer>
                </MenuHeader>
                {me && (
                    <MenuContent>
                        <ProfileMenuContainer>
                            <Link
                                to={`/${me.username}`}
                                title={me.name}
                                aria-label={me.name}
                            >
                                <ProfileMenuImageContainer type={me.type}>
                                    <img
                                        src={
                                            (loading || me.profile.profilePicture.length === 0) ? 
                                                profilePicture : 
                                                me.profile.profilePicture
                                        }
                                        title={me.name}
                                        alt={me.name}
                                    />
                                </ProfileMenuImageContainer>
                                <ProfileMenuInfo>
                                    <ProfileMenuInfoFullName>
                                        {me.name}
                                    </ProfileMenuInfoFullName>
                                    <ProfileMenuInfoUsername>
                                        @{me.username}
                                    </ProfileMenuInfoUsername>
                                </ProfileMenuInfo>
                            </Link>
                        </ProfileMenuContainer>
                        <MenuNav>
                            <MenuNavEntry>
                                <CustomSpanOption
                                    role="button"
                                    title={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
                                    aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
                                    onClick={() => toggleTheme()}
                                >
                                    <MenuNavEntryIcon>
                                        <ThemeIcon type="nav" />
                                    </MenuNavEntryIcon>
                                    <MenuNavEntryText>Switch to {isDarkMode ? "light" : "dark"}</MenuNavEntryText>
                                </CustomSpanOption>
                            </MenuNavEntry>
                            <MenuNavEntry>
                                <Link
                                    to={`/${me.username}`}
                                    title={me.name}
                                    aria-label={me.name}
                                >
                                    <MenuNavEntryIcon>
                                        <Profile isActive={false} />
                                    </MenuNavEntryIcon>
                                    <MenuNavEntryText>Profile</MenuNavEntryText>
                                </Link>
                            </MenuNavEntry>
                            <MenuNavEntry>
                                <Link
                                    to="/settings"
                                    title={"Settings page"}
                                    aria-label={"Settings page"}
                                >
                                    <MenuNavEntryIcon>
                                        <Settings type="nav" />
                                    </MenuNavEntryIcon>
                                    <MenuNavEntryText>Settings</MenuNavEntryText>
                                </Link>
                            </MenuNavEntry>
                            <MenuNavEntry>
                                <Link
                                    to="/logout"
                                    title={`Log out from @${me.username}`}
                                    aria-label={`Log out from @${me.username}`}
                                >
                                    <MenuNavEntryIcon>
                                        <Exit type="nav" isRed={true} />
                                    </MenuNavEntryIcon>
                                    <MenuNavEntryText color={COLORS.red}>
                                        Log out
                                    </MenuNavEntryText>
                                </Link>
                            </MenuNavEntry>
                        </MenuNav>
                    </MenuContent>
                )}
            </MenuContainer>
        </MenuWrapper>
    );
}

export default Menu;