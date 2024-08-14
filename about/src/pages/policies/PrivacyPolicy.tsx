import { PageLayout } from "../../components/PageLayout";
import { SEO } from "../../components/Seo";
import { PageContentLayout } from "../../components/sublayouts/PageContentLayout";
import { PageBaseContainer, PageDescription, PageSmallTitle, PageText, PageTitle } from "../../styles/global";

function PrivacyPolicy() {
    return (
        <>
            <SEO title="About Zenith | Privacy policy" description="In this page you can read the privacy policy for Zenith." />
            <PageLayout children={
                <PageContentLayout
                    children={
                        <PageBaseContainer>
                            <PageTitle>Privacy policy</PageTitle>
                            <PageDescription>
                                Read more about how your privacy is important for us.
                            </PageDescription>
                            <PageText>
                                The platform is not yet online, and this applies to the mobile and desktop applications too. The entire project is in an early development stage, so we don't have yet a privacy policy to display here.
                            </PageText>
                            <PageText>
                                <PageSmallTitle>
                                    What about this website?
                                </PageSmallTitle>
                                <PageText>
                                    This website doesn't use cookies or external services to measure and acquire user-related information. Moreover, this website does not use persistent identifiers to identify users for advertising purposes.
                                </PageText>
                            </PageText>
                        </PageBaseContainer>
                    }  
                />
            } />
        </>
    );
};

export default PrivacyPolicy;
