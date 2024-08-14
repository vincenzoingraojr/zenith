import * as React from "react";
import { Link, graphql } from "gatsby";
import { PageContent, PageText, PageTitle } from "../styles/global";
import Layout from "../components/layout";
import Seo from "../components/seo";
import Header from "../components/header";

const NotFoundPage = ({ data }) => {
    const siteTitle = data.site.siteMetadata.title;

    return (
        <>
            <Header title={siteTitle} isNavbarChanging={false} />
            <Layout>
                <Seo title="404: Not found" />
                <PageContent>
                    <PageTitle>404</PageTitle>
                    <PageText>
                        The page you're looking for doesn't exist.{" "}
                        <Link to="/">Go home</Link>.
                    </PageText>
                </PageContent>
            </Layout>
        </>
    );
};

export default NotFoundPage;

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
    }
`;
