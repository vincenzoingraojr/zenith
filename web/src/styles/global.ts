import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        background-color: ${({ theme }) => theme.background};
        color: ${({ theme }) => theme.color};
        font-family: "Inter", sans-serif;
        font-size: 18px;
        overflow: auto;
    }
`;

export default GlobalStyle;