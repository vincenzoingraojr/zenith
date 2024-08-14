import Footer from "./Footer";
import Nav from "./Nav";
import styled from "styled-components";

interface PageLayoutProps {
    children: JSX.Element;
}

const MainComponent = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 100px;
    min-height: calc(100vh - 100px);
`;

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
    return (
        <>
            <Nav />
            <MainComponent>{children}</MainComponent>
            <Footer />
        </>
    );
};
