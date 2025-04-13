import styled from "styled-components";

interface PageContentLayoutProps {
    children: JSX.Element;
}

const MainContentComponent = styled.div`
    display: block;
    margin-top: 36px;
    padding-bottom: 72px;
`;

export const PageContentLayout: React.FC<PageContentLayoutProps> = ({ children }) => {
    return (
        <MainContentComponent>{children}</MainContentComponent>
    );
};