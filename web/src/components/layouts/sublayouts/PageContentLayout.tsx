import { FunctionComponent } from "react";
import { LayoutProps } from "../common";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ControlContainer } from "../../../styles/global";
import Back from "../../icons/Back";
import { devices } from "../../../styles/devices";
import { mediaQuery } from "../../../utils/mediaQuery";
import { useMeData } from "../../../utils/useMeData";
import profilePicture from "../../../images/profile-picture.png";
import { USER_TYPES } from "../../../utils/constants";
import { useMenu } from "../../utils/hooks";
import Menu from "../../Menu";

interface PageContentLayoutProps extends LayoutProps {
    title: string;
    type: "main" | "default";
    customHeaderComponent?: React.ReactNode;
    headerIconsComponent?: React.ReactNode;
}

const MainContainer = styled.main`
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 60px auto;
`;

const MainHeader = styled.header`
    display: grid;
    align-items: center;
    height: 60px;
    position: sticky;
    top: 0;
    width: 100%;
    overflow: hidden;
    background-color: ${({ theme }) => theme.background};
    z-index: 100;
`;

const MainHeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 12px;
    overflow: hidden;
    padding-left: 12px;
    padding-right: 12px;
`;

const MainHeaderLeftContainer = styled.div.attrs((props: { type: string }) => props)`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: auto;
    flex: 1;
    gap: 12px;
    overflow: hidden;
    padding-left: 0;
    padding-right: 0;

    ${mediaQuery(
        "(min-width: 600px) and (min-height: 480px)",
        devices.laptopM
    )} {
        padding-left: ${(props) => (props.type === "main" ? "4px" : "0px")};
        padding-right: ${(props) => (props.type === "main" ? "4px" : "0px")};
    }
`;

const MainHeaderTitle = styled.div`
    display: block;
    font-weight: 700;
    width: 100%;
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

const MainHeaderProfileImageContainer = styled.div.attrs((props: { type: string }) => props)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: ${(props) => (props.type === USER_TYPES.ORGANIZATION ? "4px" : "16px")};
    cursor: pointer;

    img {
        width: inherit;
        height: inherit;
        border-radius: inherit;
        object-fit: cover;
        object-position: center;
    }
`;

const PageContentLayout: FunctionComponent<PageContentLayoutProps> = ({ title, type, customHeaderComponent, children, headerIconsComponent }) => {
    const navigate = useNavigate();
    const { me, loading, error } = useMeData();

    const { showMenu, openMenu, closeMenu } = useMenu();

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
                                {(me && !error) && (
                                    <>
                                        <MainHeaderProfileContainer>
                                            <MainHeaderProfileImageContainer 
                                                type={me.type}
                                                role="button"
                                                title={me.name}
                                                aria-label={me.name}
                                                onClick={() => {
                                                    openMenu();
                                                }}
                                            >
                                                <img
                                                    src={
                                                        (loading || me.profile.profilePicture.length === 0) 
                                                            ? profilePicture
                                                            : me.profile.profilePicture
                                                    }
                                                    title={me.name}
                                                    alt={me.name}
                                                />
                                            </MainHeaderProfileImageContainer>
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
                            <MainHeaderTitle>{title}</MainHeaderTitle>
                        )}
                    </MainHeaderLeftContainer>
                    {headerIconsComponent && (
                        <MainHeaderIconsContainer>
                            {headerIconsComponent}
                        </MainHeaderIconsContainer>
                    )}
                </MainHeaderContainer>
            </MainHeader>
            <MainContentContainer>
                {children}
            </MainContentContainer>
        </MainContainer>
    );
}

export default PageContentLayout;