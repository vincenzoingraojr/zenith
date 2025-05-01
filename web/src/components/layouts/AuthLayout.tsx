import { FunctionComponent } from "react";
import Back from "../icons/Back";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../icons/Logo";
import styled from "styled-components";
import { devices } from "../../styles/devices";
import { ControlContainer, PageBlock, PageText } from "../../styles/global";
import { LayoutProps } from "./common";
import { useAuth } from "../../utils/AuthContext";

const AuthPage = styled.div`
    display: grid;
    justify-items: center;
`;

const AuthPageHeader = styled.div`
    display: flex;
    align-items: center;
    position: sticky;
    top: 0;
    height: 60px;
    z-index: 3;
    background-color: ${({ theme }) => theme.background};
    padding-left: 12px;
    padding-right: 12px;
    width: 100%;

    @media ${devices.mobileL} {
        width: 360px;
    }

    @media (min-width: 600px) {
        width: 440px;
    }

    @media ${devices.tablet} {
        width: 472px;
    }

    @media ${devices.laptopM} {
        width: 580px;
    }
`;

const AuthPageLogo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(100% - 36px);
    padding-right: 36px;
`;

const AuthPageContentContainer = styled.div`
    display: block;
    margin-top: 36px;
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 84px;
    width: 100%;

    @media ${devices.mobileS} {
        padding-left: 36px;
        padding-right: 36px;
    }

    @media ${devices.mobileL} {
        width: 360px;
    }

    @media (min-width: 600px) {
        width: 440px;
    }

    @media ${devices.tablet} {
        width: 472px;
    }

    @media ${devices.laptopM} {
        width: 580px;
    }
`;

const AuthPageContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const AuthLayout: FunctionComponent<LayoutProps> = ({ children }) => {
    const { isAuth } = useAuth();

    const navigate = useNavigate();

    let showLoginOption = true;

    if (window.location.pathname === "/login") {
        showLoginOption = false;
    }

    return (
        <AuthPage>
            <AuthPageHeader>
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
                <AuthPageLogo>
                    <Link to="/" title="Zenith" aria-label="Zenith">
                        <Logo type="inline" />
                    </Link>
                </AuthPageLogo>
            </AuthPageHeader>
            <AuthPageContentContainer>
                <AuthPageContent>
                    {children}
                    {!isAuth && (
                        <PageBlock>
                            {showLoginOption ? (
                                <PageText>
                                    Already have an account?{" "}
                                    <Link
                                        to="/login"
                                        title="Log in"
                                        aria-label="Log in to Zenith"
                                    >
                                        Log in
                                    </Link>
                                </PageText>
                            ) : (
                                <PageText>
                                    Forgot your password?{" "}
                                    <Link
                                        to="/recover_password"
                                        title="Recover your password"
                                        aria-label="Recover your password"
                                    >
                                        Recover it here
                                    </Link>
                                </PageText>
                            )}
                        </PageBlock>
                    )}
                </AuthPageContent>
            </AuthPageContentContainer>
        </AuthPage>
    );
};

export default AuthLayout;