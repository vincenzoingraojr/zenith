import { FunctionComponent } from "react";
import Back from "../icons/Back";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../icons/Logo";
import styled from "styled-components";
import { devices } from "../../styles/devices";
import { ControlContainer } from "../../styles/global";

export interface AuthLayoutProps {
    content: JSX.Element;
}

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
    z-index: 100;
    background-color: #141313;
    padding-left: 12px;
    padding-right: 12px;
    width: 100%;

    @media ${devices.mobileL} {
        width: 360px;
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
    margin-top: 48px;
    padding-bottom: 84px;
    padding-left: 24px;
    padding-right: 24px;
    width: 100%;

    @media ${devices.mobileS} {
        padding-left: 32px;
        padding-right: 32px;
    }

    @media ${devices.mobileL} {
        width: 360px;
    }

    @media ${devices.tablet} {
        width: 472px;
    }

    @media ${devices.laptopM} {
        width: 580px;
    }
`;

const AuthPageContent = styled.div`
    display: block;
`;

const AuthLayout: FunctionComponent<AuthLayoutProps> = ({ content }) => {
    const navigate = useNavigate();

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
                <AuthPageContent>{content}</AuthPageContent>
            </AuthPageContentContainer>
        </AuthPage>
    );
};

export default AuthLayout;
