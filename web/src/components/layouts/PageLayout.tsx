import { FunctionComponent } from "react";
import { LayoutProps } from "./common";
import styled from "styled-components";

interface PageLayoutProps extends LayoutProps {
    noNav?: boolean;
}

const PageLayoutWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;

const PageLayout: FunctionComponent<PageLayoutProps> = ({ children, noNav }) => {
    return (
        <PageLayoutWrapper>
            
        </PageLayoutWrapper>
    );
}

export default PageLayout;