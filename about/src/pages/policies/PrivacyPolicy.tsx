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
                                    What about the Zenith websites?
                                </PageSmallTitle>
                                <PageText>
                                    All websites under the zenith.to domain (including zenith.to, about.zenith.to, blog.zenith.to, and help.zenith.to) use Google Analytics to track and analyze visitor data. This tool helps us understand user interactions, measure performance, and enhance the user experience. Google Analytics collects anonymous information, such as page visits and time spent on the site. You can opt out by adjusting your browser's cookie settings or using Google's opt-out tools.
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
