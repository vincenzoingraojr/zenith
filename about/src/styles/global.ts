import { Link } from "react-router-dom";
import styled from "styled-components";
import { devices } from "./devices";

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
        background-color: rgba(56, 53, 53, 0.6);
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

export const Status = styled.div`
    display: block;
    padding: 6px;
    border-radius: 6px;
    font-size: 14px;
    background-color: #386BD9;
    color: #FFFFFF;
    margin-bottom: 24px;
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
        background-color: rgba(214, 205, 205, 0.4);
    }
`;

export const PageTitle = styled.div`
    display: block;
    font-weight: 700;
    font-size: 32px;

    @media ${devices.mobileL} {
        font-size: 42px;
    }

    @media ${devices.tablet} {
        font-size: 52px;
    }

    @media ${devices.laptopS} {
        font-size: 64px;
    }
`;

export const PageBaseContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 48px;
`;

export const PageDescription = styled(PageText)`
    font-size: 20px;
    font-weight: 500;
`;

export const PageSmallTitle = styled.h2`
    margin-top: 0;
`;