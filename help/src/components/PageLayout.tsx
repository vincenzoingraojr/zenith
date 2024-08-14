import styled from "styled-components";
import { devices } from "../styles/devices";
import { PageText } from "../styles/global";

interface PageLayoutProps {
    children: JSX.Element;
}

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

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
    return (
        <PageLayoutComponent>
            <MainComponent>{children}</MainComponent>
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
            </FooterComponent>
        </PageLayoutComponent>
    );
};
