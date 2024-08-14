import * as React from "react";
import Footer from "./footer";
import styled from "styled-components";

const PageContainer = styled.div`
    display: block;
`;

const MainContainer = styled.main`
    display: block;
`;

const Layout = ({ children }) => {
    return (
        <PageContainer>
            <MainContainer>{children}</MainContainer>
            <Footer />
        </PageContainer>
    );
};

export default Layout;
