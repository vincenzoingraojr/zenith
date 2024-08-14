import { PageLayout } from "../../components/PageLayout";
import { SEO } from "../../components/Seo";
import { PageContentLayout } from "../../components/sublayouts/PageContentLayout";
import { PageBaseContainer, PageDescription, PageText, PageTitle } from "../../styles/global";

function CareersPage() {
    return (
        <>
            <SEO title="About Zenith | Careers" description="In this page you can see how to apply for Zenith." />
            <PageLayout children={
                <PageContentLayout
                    children={
                        <PageBaseContainer>
                            <PageTitle>Careers</PageTitle>
                            <PageDescription>Find out how you can work with us.</PageDescription>
                            <PageText>
                                We're only at the beginning, so we need time to make things right. In the future this page will be an application center where users can see the open job positions and apply for them. For now, if you want to work with us, reach out at this email address: <a href="mailto:info@zenith.to" title="Zenith general email" aria-label="Zenith general email">info@zenith.to</a>.
                            </PageText>
                        </PageBaseContainer>
                    }  
                />
            } />
        </>
    );
};

export default CareersPage;