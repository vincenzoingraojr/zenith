import { FunctionComponent, useState } from "react";
import styled from "styled-components";
import { mediaQuery } from "../utils/mediaQuery";
import { devices } from "../styles/devices";
import {
    ControlContainer,
    CustomSpanOption,
    LinkOptionBaseItem,
    OptionBaseIcon,
    PageText,
} from "../styles/global";
import Close from "./icons/Close";
import { useMeData } from "../utils/userQueries";
import { Link } from "react-router-dom";
import Profile from "./icons/Profile";
import Settings from "./icons/Settings";
import Exit from "./icons/Exit";
import { COLORS } from "../styles/colors";
import { useThemeContext } from "../styles/ThemeProvider";
import ThemeIcon from "./icons/ThemeIcon";
import VerificationBadge from "./utils/VerificationBadge";
import AffiliationIcon from "./utils/AffiliationIcon";
import ProfilePicture from "./utils/ProfilePicture";

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
    z-index: 100;

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
    z-index: 100;
    background-color: ${({ theme }) => theme.overlayGrey};
    opacity: ${(props) => (props.visible ? "1" : "0")};
    transition: opacity ease 0.2s;
`;

const MenuContainer = styled.div.attrs((props: { visible: boolean }) => props)`
    display: grid;
    grid-template-rows: 60px auto;
    grid-template-columns: auto;
    position: relative;
    z-index: 999;
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

const ProfileMenuInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
    overflow: hidden;
`;

const ProfileMenuInfoFullNameContainer = styled.div`
    display: flex;
    align-items: center;
    width: auto;
    flex: 1;
    overflow: hidden;
    text-overflow: clip;
    gap: 8px;
`;

const ProfileMenuInfoFullName = styled(PageText)`
    font-weight: 700;
    font-size: 20px;
    width: auto;
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
    width: auto;
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

const MenuNavEntry = styled(LinkOptionBaseItem)`
    height: 60px;

    a,
    span {
        font-weight: 500;
        gap: 16px;
        padding-left: 16px;
        padding-right: 16px;
        height: 60px;
        overflow: hidden;
        justify-content: flex-start;
    }
`;

const MenuNavEntryText = styled(PageText).attrs(
    (props: { color?: string }) => props
)`
    display: block;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: ${(props) => (props.color ? props.color : "inherit")};
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
                                <ProfilePicture
                                    loading={loading}
                                    pictureUrl={me.profile.profilePicture}
                                    type={me.type}
                                    size={42}
                                    title={me.name}
                                />
                                <ProfileMenuInfo>
                                    <ProfileMenuInfoFullNameContainer>
                                        <ProfileMenuInfoFullName>
                                            {me.name}
                                        </ProfileMenuInfoFullName>
                                        {me.verification.verified ===
                                            "VERIFIED" && (
                                            <VerificationBadge
                                                type={me.type}
                                                verifiedSince={
                                                    me.verification
                                                        .verifiedSince
                                                        ? new Date(
                                                              parseInt(
                                                                  me
                                                                      .verification
                                                                      .verifiedSince
                                                              )
                                                          ).toLocaleString(
                                                              "en-us",
                                                              {
                                                                  month: "long",
                                                                  year: "numeric",
                                                              }
                                                          )
                                                        : undefined
                                                }
                                                size={22}
                                            />
                                        )}
                                        <AffiliationIcon
                                            userId={me.id}
                                            size={22}
                                        />
                                    </ProfileMenuInfoFullNameContainer>
                                    <ProfileMenuInfoUsername>
                                        @{me.username}
                                    </ProfileMenuInfoUsername>
                                </ProfileMenuInfo>
                            </Link>
                        </ProfileMenuContainer>
                        <MenuNav role="menu">
                            <MenuNavEntry role="menuitem">
                                <CustomSpanOption
                                    role="button"
                                    title={`Switch to ${
                                        isDarkMode ? "light" : "dark"
                                    } mode`}
                                    aria-label={`Switch to ${
                                        isDarkMode ? "light" : "dark"
                                    } mode`}
                                    onClick={() => toggleTheme()}
                                >
                                    <OptionBaseIcon>
                                        <ThemeIcon type="nav" />
                                    </OptionBaseIcon>
                                    <MenuNavEntryText>
                                        Switch to{" "}
                                        {isDarkMode ? "light" : "dark"}
                                    </MenuNavEntryText>
                                </CustomSpanOption>
                            </MenuNavEntry>
                            <MenuNavEntry role="menuitem">
                                <Link
                                    to={`/${me.username}`}
                                    title={me.name}
                                    aria-label={me.name}
                                >
                                    <OptionBaseIcon>
                                        <Profile isActive={false} />
                                    </OptionBaseIcon>
                                    <MenuNavEntryText>Profile</MenuNavEntryText>
                                </Link>
                            </MenuNavEntry>
                            <MenuNavEntry role="menuitem">
                                <Link
                                    to="/settings"
                                    title={"Settings page"}
                                    aria-label={"Settings page"}
                                >
                                    <OptionBaseIcon>
                                        <Settings type="nav" />
                                    </OptionBaseIcon>
                                    <MenuNavEntryText>
                                        Settings
                                    </MenuNavEntryText>
                                </Link>
                            </MenuNavEntry>
                            <MenuNavEntry role="menuitem">
                                <Link
                                    to="/logout"
                                    title={`Log out from @${me.username}`}
                                    aria-label={`Log out from @${me.username}`}
                                >
                                    <OptionBaseIcon>
                                        <Exit type="nav" color={COLORS.red} />
                                    </OptionBaseIcon>
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
};

export default Menu;
