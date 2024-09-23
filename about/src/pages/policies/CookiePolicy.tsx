import { PageLayout } from "../../components/PageLayout";
import { SEO } from "../../components/Seo";
import { PageContentLayout } from "../../components/sublayouts/PageContentLayout";
import { PageBaseContainer, PageDescription, PageSmallTitle, PageText, PageTitle } from "../../styles/global";

function CookiePolicy() {
    return (
        <>
            <SEO title="About Zenith | Cookies" description="In this page you can read the cookie policy for Zenith." />
            <PageLayout children={
                <PageContentLayout
                    children={
                        <PageBaseContainer>
                            <PageTitle>How cookies are used on Zenith</PageTitle>
                            <PageDescription>
                                Read how cookies are used on Zenith.
                            </PageDescription>
                            <PageText>
                                The platform is not yet online, and this applies to the mobile and desktop applications too. The entire project is in an early development stage, so we don't know how many cookies the final version of the platform will use. For this reason, we don't have yet a cookie policy to display here.
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

export default CookiePolicy;
