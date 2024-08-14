import { PageLayout } from "../../components/PageLayout";
import { SEO } from "../../components/Seo";
import { PageContentLayout } from "../../components/sublayouts/PageContentLayout";
import { PageBaseContainer, PageDescription, PageText, PageTitle } from "../../styles/global";

function ContactPage() {
    return (
        <>
            <SEO title="About Zenith | Contact us" description="In this page you can see how to contact us." />
            <PageLayout children={
                <PageContentLayout
                    children={
                        <PageBaseContainer>
                            <PageTitle>Contact us</PageTitle>
                            <PageDescription>Find out how you can contact us.</PageDescription>
                            <PageText>
                                You can contact us directly by sending an email to this address: <a href="mailto:info@zenith.to" title="Zenith general email" aria-label="Zenith general email">info@zenith.to</a>. We will get back to you as soon as possible.
                            </PageText>
                        </PageBaseContainer>
                    }  
                />
            } />
        </>
    );
};

export default ContactPage;