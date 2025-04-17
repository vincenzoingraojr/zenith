import styled, { createGlobalStyle } from "styled-components";
import { COLORS } from "./colors";
import { devices } from "./devices";

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

export const SmallButton = styled(Button)`
    padding: 6px 18px;
    border: inherit;
    background-color: transparent;
    transition: background-color ease 0.2s;

    &:hover,
    &:focus {
        background-color: ${({ theme }) => theme.opaqueGrey};
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

    &:hover,
    &:focus {
        background-color: ${({ theme }) => theme.opaqueGrey};
    }
`;

export const ModalFormContainer = styled.div`
    display: block;
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 24px;

    @media ${devices.mobileS} {
        padding-left: 36px;
        padding-right: 36px;
    }
`

export const AuthForm = styled.div`
    display: block;
    padding-top: 12px;
    padding-bottom: 24px;
`;

export const AuthFormTitle = styled.div`
    display: block;
    font-weight: 800;
    margin-bottom: 48px;
    font-size: 32px;

    @media ${devices.mobileS} {
        font-size: 44px;
    }

    @media ${devices.mobileL} {
        font-size: 50px;
    }

    @media ${devices.tablet} {
        font-size: 60px;
    }
`;

export const AuthFormContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const Status = styled.div`
    display: block;
    padding: 6px;
    border-radius: 6px;
    font-size: 14px;
    background-color: ${COLORS.blue};
    color: ${COLORS.white};
    margin-bottom: 24px;
`;

export const StandardButton = styled(Button)`
    background-color: ${COLORS.blue};
    color: ${COLORS.white};
`;

export const AuthHalfInput = styled.div`
    display: flex;
    gap: 24px;
    flex-direction: column;
    align-items: unset;

    @media ${devices.mobileS} {
        flex-direction: column;
        align-items: unset;
    }

    @media ${devices.mobileL} {
        flex-direction: row;
        align-items: flex-end;
    }
`;

export const CustomFieldWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
`;

export const CustomFieldError = styled.div`
    display: block;
    font-size: 14px;
`;

export const CustomFieldContainer = styled.div`
    display: block;
    background-color: ${({ theme }) => theme.inputBackground};
    height: 60px;
    padding-left: 12px;
    padding-right: 12px;
    border-radius: 6px;
`;

export const CustomInfoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 22px;
    margin-top: 4px;
    margin-bottom: 4px;
`;

export const CustomInfo = styled.div`
    display: block;
    font-size: 14px;
`;

export const CustomInnerFieldContainer = styled.div`
    display: flex;
    align-items: center;
    height: 26px;
    width: 100%;
    margin-bottom: 4px;
`;
