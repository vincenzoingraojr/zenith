import "../styles/index.css";
import "../styles/style.css";
import { LinkButton, PageBaseContainer, PageBlock, PageDescription, PageText, PageTitle } from "../styles/global";
import styled from "styled-components";
import Logo from "../components/icons/Logo";
import Head from "../components/Head";
import { PageLayout } from "../components/layouts/PageLayout";
import { PageContentLayout } from "../components/layouts/sublayouts/PageContentLayout";

const IndexBrandGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 48px;
    justify-content: center;
    align-items: center;
`;

const JoinLinkButton = styled(LinkButton)`
    background-color: #FFFFFF;
    color: #141313;
`;

function HomePage() {
    return (
        <>
            <Head title="Zenith" description="This is the landing website of Zenith, the everything app." />
            <PageLayout children={
                <PageContentLayout
                    children={
                        <PageBaseContainer>
                            <IndexBrandGroup>
                                <Logo type="index-logo" />
                                <PageTitle>Zenith</PageTitle>
                                <PageDescription>
                                    The everything app.
                                </PageDescription>
                            </IndexBrandGroup>
                            <PageText>
                                With Zenith, you'll be able to find out what's happening in the world in real time, chat and make video calls with whoever you want, and send and receive money directly within the app.
                            </PageText>
                            <PageText>
                                The project is still in the early stages of development. You can reach out to us via <a href="mailto:info@zenith.to" title="Zenith general purposes email address." aria-label="Zenith general purposes email address.">email</a>.
                            </PageText>
                            <PageBlock>
                                <JoinLinkButton to="/join" title="Join the waiting list" aria-label="Join the waiting list">
                                    Waiting list
                                </JoinLinkButton>
                            </PageBlock>
                        </PageBaseContainer>
                    }  
                />
            } />
        </>
    );
};

export default HomePage;
