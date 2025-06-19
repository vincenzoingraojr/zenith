import { FunctionComponent } from "react";
import { LayoutProps } from "../common";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ControlContainer, OptionBaseIcon, ProfilePictureWrapper } from "../../../styles/global";
import Back from "../../icons/Back";
import { devices } from "../../../styles/devices";
import { mediaQuery } from "../../../utils/mediaQuery";
import { useMeData } from "../../../utils/userQueries";
import { useMenu } from "../../utils/hooks";
import Menu from "../../Menu";
import Logo from "../../icons/Logo";
import { useToasts } from "../../utils/ToastProvider";
import { scrollToTop } from "../../../utils/scrollToTop";
import ProfilePicture from "../../utils/ProfilePicture";

interface PageContentLayoutProps extends LayoutProps {
    title: string;
    type: "main" | "home" | "default";
    customHeaderComponent?: React.ReactNode;
    headerIconsComponent?: React.ReactNode;
}

const MainContainer = styled.main`
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 60px auto;
`;

const MainHeader = styled.header`
    display: flex;
    align-items: center;
    height: 60px;
    position: sticky;
    top: 0;
    width: 100%;
    overflow: hidden;
    z-index: 10;
    background-color: ${({ theme }) => theme.background};
`;

const MainHeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 12px;
    padding-left: 12px;
    padding-right: 12px;
    overflow: hidden;
`;

const MainHeaderLeftContainer = styled.div.attrs(
    (props: { type: string }) => props
)`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: auto;
    flex: 1;
    gap: 12px;
    padding-left: 0;
    padding-right: 0;
    overflow: hidden;

    ${mediaQuery(
        "(min-width: 600px) and (min-height: 480px)",
        devices.laptopM
    )} {
        padding-left: ${(props) => (props.type !== "default" ? "4px" : "0px")};
        padding-right: ${(props) => (props.type !== "default" ? "4px" : "0px")};
    }
`;

const MainHeaderTitle = styled.div`
    display: flex;
    font-weight: 700;
    width: auto;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
`;

const MainHeaderIconsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;
`;

const MainContentContainer = styled.div`
    display: block;
    width: 100%;
    overflow-x: hidden;
    padding-bottom: 48px;
`;

const CustomHeaderComponentContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: auto;
    flex: 1;
    overflow: hidden;
`;

const MainHeaderProfileContainer = styled.div`
    display: block;

    ${mediaQuery(
        "(min-width: 600px) and (min-height: 480px)",
        devices.laptopM
    )} {
        display: none;
    }
`;

const HomeContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: auto;
    flex: 1;
    overflow: hidden;
`;

const HomeLogo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding-right: 44px;

    ${mediaQuery(
        "(min-width: 600px) and (min-height: 480px)",
        devices.laptopM
    )} {
        display: none;
        padding-right: 0;
    }
`;

const HomeLogoContainer = styled(OptionBaseIcon)`
    cursor: pointer;
`;

const HomeHeaderTitle = styled(MainHeaderTitle)`
    display: none;

    ${mediaQuery(
        "(min-width: 600px) and (min-height: 480px)",
        devices.laptopM
    )} {
        display: block;
    }
`;

const PageContentLayout: FunctionComponent<PageContentLayoutProps> = ({
    title,
    type,
    customHeaderComponent,
    children,
    headerIconsComponent,
}) => {
    const navigate = useNavigate();
    const { me, loading, error } = useMeData();

    const { showMenu, openMenu, closeMenu } = useMenu();

    const { addToast } = useToasts();

    return (
        <MainContainer>
            <MainHeader>
                <MainHeaderContainer>
                    <MainHeaderLeftContainer type={type}>
                        {type === "default" ? (
                            <ControlContainer
                                title="Go back"
                                role="button"
                                aria-label="Go back"
                                onClick={() => {
                                    if (window.history.length > 2) {
                                        navigate(-1);
                                    } else {
                                        navigate("/");
                                    }
                                }}
                            >
                                <Back />
                            </ControlContainer>
                        ) : (
                            <>
                                {me && !error && (
                                    <>
                                        <MainHeaderProfileContainer>
                                            <ProfilePictureWrapper
                                                role="button"
                                                title={me.name}
                                                aria-label={me.name}
                                                onClick={() => {
                                                    openMenu();
                                                }}
                                            >
                                                <ProfilePicture
                                                    loading={loading}
                                                    pictureUrl={me.profile.profilePicture}
                                                    type={me.type}
                                                    size={32}
                                                    title={me.name}
                                                />
                                            </ProfilePictureWrapper>
                                        </MainHeaderProfileContainer>
                                        {showMenu && (
                                            <Menu closeMenu={closeMenu} />
                                        )}
                                    </>
                                )}
                            </>
                        )}
                        {customHeaderComponent ? (
                            <CustomHeaderComponentContainer>
                                {customHeaderComponent}
                            </CustomHeaderComponentContainer>
                        ) : (
                            <>
                                {type === "home" ? (
                                    <HomeContainer>
                                        {error || loading ? (
                                            <MainHeaderTitle>
                                                {error
                                                    ? "An error occurred. Refresh the page."
                                                    : "Loading..."}
                                            </MainHeaderTitle>
                                        ) : (
                                            <>
                                                <HomeLogo>
                                                    <HomeLogoContainer
                                                        onClick={() => {
                                                            addToast(
                                                                "This is Zenith!"
                                                            );

                                                            scrollToTop();
                                                        }}
                                                    >
                                                        <Logo type="inline" />
                                                    </HomeLogoContainer>
                                                </HomeLogo>
                                                <HomeHeaderTitle onClick={() => scrollToTop()}>
                                                    {title}
                                                </HomeHeaderTitle>
                                            </>
                                        )}
                                    </HomeContainer>
                                ) : (
                                    <MainHeaderTitle onClick={() => scrollToTop()}>{title}</MainHeaderTitle>
                                )}
                            </>
                        )}
                    </MainHeaderLeftContainer>
                    {headerIconsComponent && (
                        <MainHeaderIconsContainer>
                            {headerIconsComponent}
                        </MainHeaderIconsContainer>
                    )}
                </MainHeaderContainer>
            </MainHeader>
            <MainContentContainer>{children}</MainContentContainer>
        </MainContainer>
    );
};

export default PageContentLayout;
