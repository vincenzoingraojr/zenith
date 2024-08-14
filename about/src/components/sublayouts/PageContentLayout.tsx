import styled from "styled-components";
import { devices } from "../../styles/devices";

interface PageContentLayoutProps {
    children: JSX.Element;
}

const MainContentComponent = styled.div`
    display: block;
    margin-top: 48px;
    padding-bottom: 84px;
    padding-left: 24px;
    padding-right: 24px;
    width: 100%;

    @media ${devices.mobileS} {
        padding-left: 36px;
        padding-right: 36px;
    }

    @media ${devices.mobileL} {
        width: 380px;
    }

    @media (min-width: 600px) {
        width: 440px;
    }

    @media ${devices.tablet} {
        width: 520px;
    }

    @media ${devices.laptopM} {
        width: 640px;
    }
`;

export const PageContentLayout: React.FC<PageContentLayoutProps> = ({ children }) => {
    return (
        <>
            <MainContentComponent>{children}</MainContentComponent>
        </>
    );
};