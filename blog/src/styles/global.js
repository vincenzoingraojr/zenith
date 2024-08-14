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

export const PageContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 48px;
    padding-top: 120px;
    padding-bottom: 48px;
    min-height: calc(100vh - 72px);
    margin-left: 12px;
    margin-right: 12px;

    @media ${devices.mobileS} {
        margin-left: 24px;
        margin-right: 24px;
    }

    @media ${devices.mobileL} {
        margin-left: 48px;
        margin-right: 48px;
    }

    @media ${devices.tablet} {
        margin-left: 16%;
        margin-right: 16%;
        min-height: calc(100vh - 72px);
    }

    @media ${devices.laptopS} {
        margin-left: 22%;
        margin-right: 22%;
    }

    @media ${devices.laptopM} {
        margin-left: 28%;
        margin-right: 28%;
    }

    @media ${devices.desktop} {
        margin-left: 30%;
        margin-right: 30%;
    }
`;

export const PageTitle = styled.div`
    display: block;
    font-weight: 800;
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
