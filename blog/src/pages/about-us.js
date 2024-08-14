import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { PageContent, PageText, PageTitle } from "../styles/global";
import Header from "../components/header";

const AboutPage = ({ data }) => {
    const siteTitle = data.site.siteMetadata.title;

    return (
        <>
            <Header title={siteTitle} isNavbarChanging={false} />
            <Layout>
                <Seo
                    title="About us"
                    description="On this page you will find all the information about Zenith."
                />
                <PageContent>
                    <PageTitle>About Zenith</PageTitle>
                    <PageText>        
                        Zenith will be a super-app, an application that can provide multiple services, including payment and financial transaction processing. Zenith will allow users to find out what's happening in the world in real time, chat and make video calls with whoever they want, and send and receive money instantly. <br />
                        For more information, please visit the <a href="https://about.zenith.to" title="About Zenith" aria-label="About Zenith" rel="noreferrer">website about Zenith</a>.
                    </PageText>
                </PageContent>
            </Layout>
        </>
    );
};

export default AboutPage;

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
    }
`;
