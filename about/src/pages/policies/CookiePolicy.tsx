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
                                    What about this website?
                                </PageSmallTitle>
                                <PageText>
                                    This website doesn't use cookies at all.
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
