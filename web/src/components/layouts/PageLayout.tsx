import { FunctionComponent } from "react";
import { LayoutProps } from "./common";
import styled from "styled-components";
import Nav from "../Nav";
import { devices } from "../../styles/devices";
import { mediaQuery } from "../../utils/mediaQuery";

interface PageLayoutProps extends LayoutProps {
    noNav?: boolean;
}

const PageLayoutWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;

const PageLayoutContainer = styled.div`
    display: grid;
    grid-template-columns: none;
    grid-template-rows: auto;
    width: 100%;

    @media (min-width: 600px) and (max-height: 480px) {
        width: 440px;
    }

    ${mediaQuery(
        "(min-width: 600px) and (min-height: 480px)",
        devices.laptopM
    )} {
        grid-template-columns: 80px auto;
        grid-template-rows: none;
    }

    @media (min-width: 600px) and (min-height: 480px) {
        width: 520px;
    }

    @media ${devices.tablet} and (max-height: 480px) {
        width: 472px;
    }

    @media ${devices.tablet} and (min-height: 480px) {
        width: 552px;
    }

    @media ${devices.laptopM} {
        width: 660px;
    }
`;

const PageContentLayoutContainer = styled.div.attrs(
    (props: { navHidden: boolean }) => props
)`
    display: block;
    width: 100%;
    min-height: 100vh;
    margin-bottom: ${props => props.navHidden ? "0" : "60px"}; 

    @media (min-width: 600px) {
        border-left: 1px solid ${({ theme }) => theme.color};
        border-right: 1px solid ${({ theme }) => theme.color};
    }

    ${mediaQuery(
        "(min-width: 600px) and (min-height: 480px)",
        devices.laptopM
    )} {
        margin-bottom: 0;
    }
`;

const PageLayout: FunctionComponent<PageLayoutProps> = ({ children, noNav }) => {
    return (
        <PageLayoutWrapper>
            <PageLayoutContainer>
                <Nav noNav={noNav} />
                <PageContentLayoutContainer navHidden={noNav || false}>
                    {children}
                </PageContentLayoutContainer>
            </PageLayoutContainer>
        </PageLayoutWrapper>
    );
}

export default PageLayout;