import "../styles/index.css";
import "../styles/style.css";
import { PageLayout } from "../components/PageLayout";
import { SEO } from "../components/Seo";
import { PageBaseContainer, PageDescription, PageText, PageTitle } from "../styles/global";
import { PageContentLayout } from "../components/sublayouts/PageContentLayout";
import styled from "styled-components";
import Logo from "../components/icons/Logo";

const IndexBrandGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 48px;
    justify-content: center;
    align-items: center;
`;

function IndexPage() {
    return (
        <>
            <SEO title="Help center | Zenith" description="This is the Zenith help center." />
            <PageLayout children={
                <PageContentLayout
                    children={
                        <PageBaseContainer>
                            <IndexBrandGroup>
                                <Logo type="index-logo" />
                                <PageTitle>Help center</PageTitle>
                                <PageDescription>
                                    Work in progress
                                </PageDescription>
                            </IndexBrandGroup>
                            <PageText>
                                We're working on the help center while building the Zenith web & mobile apps.
                            </PageText>
                            <PageText>
                                You can follow us on the <a href="https://blog.zenith.to" target="_blank" rel="noreferrer" title="Zenith Blog" aria-label="Zenith Blog">company blog</a>. 
                            </PageText>
                        </PageBaseContainer>
                    }  
                />
            } />
        </>
    );
};

export default IndexPage;
