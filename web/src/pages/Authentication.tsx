import styled from "styled-components";
import Head from "../components/Head";
import { devices } from "../styles/devices";
import { LinkButton, PageBlock, PageText } from "../styles/global";
import Logo from "../components/icons/Logo";
import { Outlet, useLocation } from "react-router-dom";
import { COLORS } from "../styles/colors";
import { useThemeContext } from "../styles/ThemeContext";

const PageLayoutComponent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const MainComponent = styled.main`
    display: flex;
    width: 100%;
    justify-content: center;
    min-height: calc(100vh - 80px);
    padding-left: 24px;
    padding-right: 24px;
    width: 100%;

    @media ${devices.mobileS} {
        padding-left: 36px;
        padding-right: 36px;
    }

    @media ${devices.mobileL} {
        width: 380px;
    }

    @media (min-width: 600px) {
        width: 440px;
    }

    @media ${devices.tablet} {
        width: 520px;
    }

    @media ${devices.laptopM} {
        width: 640px;
    }
`;

const FooterComponent = styled.footer`
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    font-size: 14px;
    column-gap: 12px;
    row-gap: 4px;
    min-height: 80px;
    padding-top: 12px;
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 12px;
    width: 100%;

    @media ${devices.mobileS} {
        padding-left: 36px;
        padding-right: 36px;
    }

    @media ${devices.mobileL} {
        width: 380px;
    }

    @media (min-width: 600px) {
        width: 440px;
    }

    @media ${devices.tablet} {
        width: 520px;
    }

    @media ${devices.laptopM} {
        width: 640px;
    }
`;

const MainContentComponent = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 36px;
    padding-bottom: 72px;
    width: 100%;
    gap: 36px;
`;

const IndexBrandGroup = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 8.5px;
`;

const BrandName = styled.div`
    display: block;
    font-size: 24px;
    font-weight: 700;
`;

const BrandTitle = styled.div`
    display: block;
    font-size: 42px;
    font-weight: 800;

    @media ${devices.mobileS} {
        font-size: 52px;
    }

    @media ${devices.mobileL} {
        font-size: 58px;
    }

    @media ${devices.tablet} {
        font-size: 62px;
    }

    @media ${devices.laptopM} {
        font-size: 64px;
    }
`;

const PageFlex = styled(PageBlock)`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 24px;
`;

const LogInButton = styled(LinkButton)`
    background-color: ${COLORS.blue};
    color: ${COLORS.white};
`;

const SignUpButton = styled(LinkButton).attrs(
    (props: { mode: boolean }) => props
)`
    background-color: ${({ theme }) => theme.color};
    color: ${(props) => (props.mode ? COLORS.black : COLORS.white)};
`;

function Authentication() {
    const location = useLocation();
    const { isDarkMode } = useThemeContext();

    return (
        <>
            <Head title="Zenith" />
            <PageLayoutComponent>
                <MainComponent>
                    <MainContentComponent>
                        <IndexBrandGroup>
                            <Logo type="inline" />
                            <BrandName>Zenith</BrandName>
                        </IndexBrandGroup>
                        <BrandTitle>The everything app.</BrandTitle>
                        <PageText>
                            Find out what's happening in the world in real time, chat and make video calls with whoever you want. Send and receive money.
                        </PageText>
                        <PageFlex>
                            <LogInButton to="/login" state={{ backgroundLocation: location }} title="Log in to Zenith" aria-label="Log in to Zenith">
                                Log in
                            </LogInButton>
                            <SignUpButton to="/signup" mode={isDarkMode ? true : false} state={{ backgroundLocation: location }} title="Sign up to Zenith" aria-label="Sign up to Zenith">
                                Sign up
                            </SignUpButton>
                        </PageFlex>
                        <Outlet />
                    </MainContentComponent>
                </MainComponent>
                <FooterComponent>
                    <PageText>
                        &copy; {new Date().getFullYear()} Zenith
                    </PageText>
                    <PageText>
                        <a
                            href="https://about.zenith.to"
                            target="_blank"
                            title="About Zenith"
                            rel="noreferrer"
                            aria-label="About Zenith"
                        >
                            About us
                        </a>
                    </PageText>
                    <PageText>
                        <a
                            href="https://about.zenith.to/privacy-policy"
                            target="_blank"
                            title="Zenith's privacy policy"
                            rel="noreferrer"
                            aria-label="Zenith's privacy policy"
                        >
                            Privacy policy
                        </a>
                    </PageText>
                    <PageText>
                        <a
                            href="https://about.zenith.to/tos"
                            target="_blank"
                            title="Zenith's terms of service"
                            rel="noreferrer"
                            aria-label="Zenith's terms of service"
                        >
                            Terms of service
                        </a>
                    </PageText>
                    <PageText>
                        <a
                            href="https://blog.zenith.to"
                            target="_blank"
                            title="The blog about Zenith"
                            rel="noreferrer"
                            aria-label="The blog about Zenith"
                        >
                            Blog
                        </a>
                    </PageText>
                    <PageText>
                        <a
                            href="https://help.zenith.to"
                            target="_blank"
                            title="Help center"
                            rel="noreferrer"
                            aria-label="Help center"
                        >
                            Help center
                        </a>
                    </PageText>
                </FooterComponent>
            </PageLayoutComponent>
        </>
    );
}

export default Authentication;