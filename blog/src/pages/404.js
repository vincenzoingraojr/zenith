import * as React from "react";
import { Link } from "gatsby";
import { PageContent, PageText, PageTitle } from "../styles/global";
import Layout from "../components/layout";
import Seo from "../components/seo";
import Header from "../components/header";

const NotFoundPage = () => {
    return (
        <>
            <Header />
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
