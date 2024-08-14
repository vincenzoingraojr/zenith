import styled from "styled-components";
import { PageLayout } from "../../components/PageLayout";
import { SEO } from "../../components/Seo";
import { PageContentLayout } from "../../components/sublayouts/PageContentLayout";
import { LinkButton, PageBaseContainer, PageBlock, PageDescription, PageText, PageTitle } from "../../styles/global";

const DownloadButton = styled(LinkButton)`
    background-color: #386BD9;
    color: #FFFFFF;
`;

const ButtonFlexContent = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
    align-items: center;
`;

function BrandToolkit() {
    return (
        <>
            <SEO title="About Zenith | Our brand resources" description="In this page you can find all the brand resources." />
            <PageLayout children={
                <PageContentLayout
                    children={
                        <PageBaseContainer>
                            <PageTitle>Brand toolkit</PageTitle>
                            <PageDescription>Here you will find all the Zenith brand assets.</PageDescription>
                            <PageText>
                                This page will be updated frequently, because we're working heavily on the design of the future platform, so before we arrive at the final version of the design we will change many things. Two things are certain: we'll continue to use the <a href="https://rsms.me/inter/" target="_blank" rel="noreferrer" title="The Inter typeface family" aria-label="The Inter typeface family">Inter typeface family</a> as the main font and <a href="https://www.figma.com/" target="_blank" rel="noreferrer" title="Figma" aria-label="Figma">Figma</a> as the primary design tool. <br />
                                <br />
                                Click the following button to download the latest version of the brand assets.
                            </PageText>
                            <PageBlock>
                                <DownloadButton
                                    title="Download brand assets"
                                    to="https://img.zncdn.net/brand-toolkit.zip"
                                    role="link"
                                    aria-label="Download brand assets"
                                >
                                    <ButtonFlexContent>
                                        <PageText>
                                            Download brand assets
                                        </PageText>
                                    </ButtonFlexContent>
                                </DownloadButton>
                            </PageBlock>
                        </PageBaseContainer>
                    }  
                />
            } />
        </>
    );
};

export default BrandToolkit;