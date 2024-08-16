import * as React from "react";
import Footer from "./footer";
import styled from "styled-components";

const PageContainer = styled.div`
    display: block;
`;

const MainContainer = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
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
