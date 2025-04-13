import "../styles/index.css";
import "../styles/style.css";
import { LinkButton, PageBaseContainer, PageBlock, PageText } from "../styles/global";
import styled from "styled-components";
import Logo from "../components/icons/Logo";
import Head from "../components/Head";
import { PageLayout } from "../components/layouts/PageLayout";
import { PageContentLayout } from "../components/layouts/sublayouts/PageContentLayout";
import { Outlet, useLocation } from "react-router-dom";
import { devices } from "../styles/devices";

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

const JoinLinkButton = styled(LinkButton)`
    background-color: #FFFFFF;
    color: #141313;
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

function HomePage() {
    const location = useLocation();

    return (
        <>
            <Head title="Zenith" description="This is the landing website of Zenith, the everything app." />
            <PageLayout children={
                <PageContentLayout
                    children={
                        <PageBaseContainer>
                            <IndexBrandGroup>
                                <Logo type="inline" />
                                <BrandName>Zenith</BrandName>
                            </IndexBrandGroup>
                            <BrandTitle>The everything app.</BrandTitle>
                            <PageText>
                                With Zenith, you'll be able to find out what's happening in the world in real time, chat and make video calls with whoever you want, and send and receive money directly within the app.
                            </PageText>
                            <PageText>
                                The project is still in the early stages of development. You can reach out to us via <a href="mailto:info@zenith.to" title="Zenith general purposes email address." aria-label="Zenith general purposes email address.">email</a>.
                            </PageText>
                            <PageBlock>
                                <JoinLinkButton to="/join" state={{ backgroundLocation: location }} title="Join the waiting list" aria-label="Join the waiting list">
                                    Waiting list
                                </JoinLinkButton>
                            </PageBlock>
                            <Outlet />
                        </PageBaseContainer>
                    }  
                />
            } />
        </>
    );
};

export default HomePage;
