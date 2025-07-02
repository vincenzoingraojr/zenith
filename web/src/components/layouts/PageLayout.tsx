import { FunctionComponent } from "react";
import { LayoutProps } from "./common";
import styled from "styled-components";
import Nav from "../Nav";
import { devices } from "../../styles/devices";
import { mediaQuery } from "../../utils/mediaQuery";

interface PageLayoutProps extends LayoutProps {
    noNav?: boolean;
    activityIcon?: JSX.Element;
    activityType?: "reply" | "new_conversation" | "default";
    activity?: () => void;
}

const PageLayoutWrapper = styled.div`
    display: flex;
    width: 100vw;
    justify-content: center;
    min-height: unset;
    align-items: unset;

    ${mediaQuery(
        "(min-width: 600px) and (min-height: 480px)",
        devices.laptopM
    )} {
        align-items: stretch;
        min-height: 100vh;
    }
`;

const PageLayoutContainer = styled.div`
    display: grid;
    grid-template-columns: none;
    grid-template-rows: auto;
    width: 100%;
    max-width: 100%;

    @media (min-width: 600px) and (max-height: 480px) {
        max-width: 480px;
    }

    ${mediaQuery(
        "(min-width: 600px) and (min-height: 480px)",
        devices.laptopM
    )} {
        grid-template-columns: 80px auto;
        grid-template-rows: none;
    }

    @media (min-width: 600px) and (min-height: 480px) {
        max-width: 520px;
    }

    @media ${devices.tablet} and (max-height: 480px) {
        max-width: 524px;
    }

    @media ${devices.tablet} and (min-height: 480px) {
        max-width: 580px;
    }

    @media ${devices.laptopM} {
        max-width: 660px;
    }
`;

const PageContentLayoutContainer = styled.div.attrs(
    (props: { navHidden: boolean }) => props
)`
    display: block;
    width: 100%;
    margin-bottom: ${(props) => (props.navHidden ? "0" : "60px")};
    border-left: unset;
    border-right: unset;
    min-height: 100vh;

    @media (min-width: 600px) {
        border-left: 1px solid ${({ theme }) => theme.inputText};
        border-right: 1px solid ${({ theme }) => theme.inputText};
    }

    ${mediaQuery(
        "(min-width: 600px) and (min-height: 480px)",
        devices.laptopM
    )} {
        min-height: unset;
        margin-bottom: 0;
    }
`;

const PageLayout: FunctionComponent<PageLayoutProps> = ({
    children,
    noNav,
    activity,
    activityIcon,
    activityType = "default"
}) => {
    return (
        <PageLayoutWrapper>
            <PageLayoutContainer>
                <Nav noNav={noNav} activityType={activityType} activityIcon={activityIcon} activity={activity} />
                <PageContentLayoutContainer navHidden={noNav || false}>
                    {children}
                </PageContentLayoutContainer>
            </PageLayoutContainer>
        </PageLayoutWrapper>
    );
};

export default PageLayout;
