import styled from "styled-components";
import { COLORS } from "../../styles/colors";

const PreloaderWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-color: ${({ theme }) => theme.background};
`;

const PreloaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const LogoContainer = styled.div`
    width: 100px;
    height: 100px;
`;

function Preloader() {
    return (
        <PreloaderWrapper>
            <PreloaderContainer>
                <LogoContainer>
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <path d="M32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16Z" fill={COLORS.blue} />
                        <path fillRule="evenodd" clipRule="evenodd" d="M6 16C11.5228 16 16 11.5228 16 6C16 11.5228 20.4772 16 26 16C20.4772 16 16 20.4772 16 26C16 20.4772 11.5228 16 6 16Z" fill={COLORS.white} />
                    </svg>
                </LogoContainer>
            </PreloaderContainer>
        </PreloaderWrapper>
    );
}

export default Preloader;