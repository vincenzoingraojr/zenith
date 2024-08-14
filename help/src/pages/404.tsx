import { Link } from "react-router-dom";
import { PageLayout } from "../components/PageLayout";
import { SEO } from "../components/Seo";
import { PageContentLayout } from "../components/sublayouts/PageContentLayout";
import { PageBaseContainer, PageText, PageTitle } from "../styles/global";

function NotFoundPage() {
    return (
        <>
            <SEO title="404 - Page not found" description="This page doesn't exist." />
            <PageLayout children={
                <PageContentLayout
                    children={
                        <PageBaseContainer>
                            <PageTitle>404</PageTitle>
                            <PageText>
                                The page you're looking for doesn't exist. You can <Link to="/" title="Go home" aria-label="Go home">go home</Link> and try again.
                            </PageText>
                        </PageBaseContainer>
                    }  
                />
            } />
        </>
    );
};

export default NotFoundPage;
