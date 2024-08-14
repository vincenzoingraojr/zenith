import styled from "styled-components";
import { devices } from "./devices";

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
    gap: 36px;
`;

export const PageDescription = styled(PageText)`
    font-size: 20px;
    font-weight: 500;
`;

export const PageSmallTitle = styled.h2`
    margin-top: 0;
`;