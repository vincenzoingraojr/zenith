import styled, { createGlobalStyle } from "styled-components";
import { COLORS } from "./colors";
import { Link } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
    body {
        background-color: ${({ theme }) => theme.background};
        color: ${({ theme }) => theme.color};
        font-family: "Inter", sans-serif;
        font-size: 18px;
        overflow: auto;
    }

    * {
        box-sizing: border-box;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
    }

    *:focus {
        outline: none;
    }

    a {
        font-weight: 400;
        font-size: inherit;
        color: ${COLORS.blue};
        text-decoration: none;
    }

    a:hover,
    a:active {
        text-decoration: underline;
    }

    input[type="text"],
    input[type="email"],
    input[type="password"],
    input[type="search"],
    textarea {
        display: block;
        background-color: transparent;
        color: ${({ theme }) => theme.inputText};
        padding: 0;
        width: 100%;
        border: none;
    }

    textarea {
        resize: none;
    }

    input::-ms-reveal {
        display: none;
    }

    input::placeholder {
        color: ${({ theme }) => theme.inputText};
        opacity: 1;
    }

    input[type="search"]::-webkit-search-cancel-button {
        display: none;
    }

    .not-scrolling {
        overflow: hidden;
    }

    .editor-hashtag {
        color: ${COLORS.blue};
        text-decoration: none;
    }

    .editor-hashtag:hover,
    .editor-hashtag:focus {
        text-decoration: underline;
    }
`;

export default GlobalStyle;

export const Button = styled.button`
    display: block;
    border: none;
    background-color: inherit;
    color: inherit;
    padding: 12px 24px;
    font-weight: 700;
    border-radius: 9999px;
    cursor: pointer;
`;

export const LinkButton = styled(Link)`
    display: inline-block;
    padding: 12px 24px;
    border-radius: 9999px;
    text-decoration: none;
    background-color: inherit;
    color: inherit;
    font-weight: 700;

    &:hover,
    &:active {
        text-decoration: none;
    }
`;

export const PageBlock = styled.div`
    display: block;
`;

export const PageText = styled.div`
    display: block;
    text-align: left;
`;

export const PageTextMT24 = styled(PageText)`
    margin-top: 24px;
`;

export const PageTextMB24 = styled(PageText)`
    margin-bottom: 24px;
`;

export const PageTextMT48 = styled(PageText)`
    margin-top: 48px;
`;

export const PageTextMB48 = styled(PageText)`
    margin-bottom: 48px;
`;

export const SvgIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    fill: inherit;
    stroke: inherit;

    svg {
        width: inherit;
        height: inherit;
        fill: inherit;
        stroke: inherit;
    }
`;

export const ControlContainer = styled.div.attrs(
    (props: { size?: number }) => props
)`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: ${(props) => (props.size ? `${props.size}px` : `36px`)};
    height: ${(props) => (props.size ? `${props.size}px` : `36px`)};
    border-radius: 9999px;
    background-color: transparent;
    transition: background-color ease 0.2s;
    opacity: 0.6;

    &:hover,
    &:focus {
        background-color: ${COLORS.lightGrey};
    }
`;