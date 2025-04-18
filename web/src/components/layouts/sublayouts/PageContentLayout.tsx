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
    gap: 16px;
    overflow: hidden;
    padding-left: 10px;
    padding-right: 10px;
`;

const MainHeaderLeftContainer = styled.div.attrs((props: { type: string }) => props)`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: auto;
    flex: 1;
    gap: 16px;
    overflow: hidden;
    padding-left: 0;
    padding-right: 0;

    ${mediaQuery(
        "(min-width: 600px) and (min-height: 480px)",
        devices.laptopM
    )} {
        padding-left: ${(props) => (props.type === "main" ? "6px" : "0px")};
        padding-right: ${(props) => (props.type === "main" ? "6px" : "0px")};
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
    gap: 16px;
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
    gap: 16px;
    overflow: hidden;
`;

const MainHeaderProfileContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    ${mediaQuery(
        "(min-width: 600px) and (min-height: 480px)",
        devices.laptopM
    )} {
        display: none;
    }
`;

const MainHeaderProfileImageContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 15px;

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
                                    <MainHeaderProfileContainer
                                        role="link"
                                        title={me.name}
                                        aria-label={me.name}
                                        onClick={() => {
                                            navigate(`/${me.username}`);
                                        }}
                                    >
                                        <MainHeaderProfileImageContainer>
                                            <img
                                                src={
                                                    loading
                                                        ? profilePicture
                                                        : me.profile.profilePicture.length > 0
                                                        ? me.profile.profilePicture
                                                        : profilePicture
                                                }
                                                title={me.name}
                                                alt={me.name}
                                            />
                                        </MainHeaderProfileImageContainer>
                                    </MainHeaderProfileContainer>
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