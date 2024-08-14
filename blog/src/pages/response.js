import * as React from "react";
import { Link, graphql } from "gatsby";
import { PageContent, PageText, PageTitle } from "../styles/global";
import Layout from "../components/layout";
import Seo from "../components/seo";
import Header from "../components/header";

const ResponsePage = ({ data }) => {
    const siteTitle = data.site.siteMetadata.title;

    return (
        <>
            <Header title={siteTitle} isNavbarChanging={false} />
            <Layout>
                <Seo title="Response" />
                <PageContent>
                    <PageTitle>Your message has been sent</PageTitle>
                    <PageText>
                        Your message was sent correctly. Now you can{" "}
                        <Link to="/">go home</Link>.
                    </PageText>
                </PageContent>
            </Layout>
        </>
    );
};

export default ResponsePage;

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
    }
`;
