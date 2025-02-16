import "../styles/index.css";
import "../styles/style.css";
import { PageLayout } from "../components/PageLayout";
import { SEO } from "../components/Seo";
import styled from "styled-components";
import { devices } from "../styles/devices";
import { LinkButton, PageBlock } from "../styles/global";

const IndexPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
`;

const MainBlockContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    height: calc(100vh - 100px);
    padding-left: 24px;
    padding-right: 24px;
    padding-top: 48px;
    padding-bottom: 48px;
    gap: 24px;

    @media ${devices.tablet} {
        width: 540px;
    }

    @media ${devices.laptopS} {
        padding-left: 48px;
        padding-right: 48px;
        gap: 48px;
        width: 760px;
    }

    @media ${devices.laptopM} {
        width: 940px;
    }

    @media ${devices.laptopL} {
        width: 1100px;
    }

    @media (max-height: 480px) {
        height: auto;
    }
`;

const IndexTitle = styled.div`
    display: block;
    font-weight: 800;
    font-size: 52px;

    @media ${devices.mobileL} {
        font-size: 64px;
    }

    @media ${devices.tablet} {
        font-size: 72px;
    }
`;

const IndexLinkButton = styled(LinkButton)`
    background-color: #386BD9;
    color: #FFFFFF;
`;

function IndexPage() {
    return (
        <>
            <SEO title="About Zenith" description="Zenith homepage." />
            <PageLayout children={
                <IndexPageContainer>
                    <MainBlockContainer>
                        <IndexTitle>
                            The everything app.
                        </IndexTitle>
                        <PageBlock>
                            <IndexLinkButton
                                title="Waiting list"
                                href="https://zenith.to"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Waiting list"
                            >
                                Waiting list
                            </IndexLinkButton>
                        </PageBlock>
                    </MainBlockContainer>
                </IndexPageContainer>
            } />
        </>
    );
};

export default IndexPage;
