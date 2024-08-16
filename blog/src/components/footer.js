import * as React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { devices } from "../styles/devices";

const FooterContainer = styled.footer`
    display: flex;
    background-color: #3E3636;
    color: #D6CDCD;
    font-size: 14px;
    align-items: center;
    justify-content: center;
`;

const FooterInnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 48px;
    align-items: flex-start;
    justify-content: flex-start;
    padding-left: 24px;
    padding-right: 24px;
    padding-top: 48px;
    padding-bottom: 48px;
    width: 100%;

    @media ${devices.laptopS} {
        padding-left: 48px;
        padding-right: 48px;
        padding-top: 48px;
        padding-bottom: 48px;
        gap: 48px;
    }

    @media ${devices.laptopL} {
        padding-left: 24px;
        padding-right: 24px;
        width: 1200px;
    }
`;

const FooterGrid = styled.div`
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto auto auto;
    column-gap: 18px;
    row-gap: 24px;
    width: 100%;

    @media (min-width: 620px) {
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: auto;
    }
`;

const FooterItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
    text-rendering: optimizeLegibility;
`;

const FooterTitle = styled.div`
    display: block;
    font-weight: 700;
    font-size: 18px;
`;

const FooterItemContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;

    div a {
        color: #D6CDCD;
    }
`;

const FooterRow = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    font-size: 14px;
    column-gap: 24px;
    row-gap: 4px;

    div a {
        color: #D6CDCD;
    }
`;

const FooterText = styled.div`
    display: block;
    text-rendering: optimizeLegibility;
`;

const Footer = () => {
    return (
        <FooterContainer>
            <FooterInnerContainer>
                <FooterGrid>
                    <FooterItem>
                        <FooterTitle>Company</FooterTitle>
                        <FooterItemContent>
                            <FooterText>
                                <a href="https://about.zenith.to/about-us" target="_blank" title="About the company" aria-label="About the company">About the company</a>
                            </FooterText>
                            <FooterText>
                                <a href="https://about.zenith.to/careers" target="_blank" title="Careers" aria-label="Careers">Careers</a>
                            </FooterText>
                            <FooterText>
                                <a href="https://about.zenith.to/brand-toolkit" target="_blank" title="Brand toolkit" aria-label="Brand toolkit">Brand toolkit</a>
                            </FooterText>
                        </FooterItemContent>
                    </FooterItem>
                    <FooterItem>
                        <FooterTitle>Platform</FooterTitle>
                        <FooterItemContent>
                            <FooterText>
                                <a href="https://about.zenith.to/our-mission" target="_blank" title="Our mission" aria-label="Our mission">Our mission</a>
                            </FooterText>
                            <FooterText>
                                <a href="https://about.zenith.to/security-and-privacy" target="_blank" title="Security and privacy" aria-label="Security and privacy">Security and privacy</a>
                            </FooterText>
                        </FooterItemContent>
                    </FooterItem>
                    <FooterItem>
                        <FooterTitle>Resources</FooterTitle>
                        <FooterItemContent>
                            <FooterText>
                                <a href="https://help.zenith.to" title="Help center" aria-label="Help center" target="_blank" rel="noreferrer">Help center</a>
                            </FooterText>
                            <FooterText>
                                <Link to="/contact-us" title="Contact us" aria-label="Contact us">Contact us</Link>
                            </FooterText>
                        </FooterItemContent>
                    </FooterItem>
                </FooterGrid>
                <FooterItem>
                    <FooterRow>
                        <FooterText>
                            &copy; {new Date().getFullYear()} Zenith
                        </FooterText>
                        <FooterText>
                            <a href="https://about.zenith.to/cookies" target="_blank" title="Cookie policy" aria-label="Cookie policy">Cookies</a>
                        </FooterText>
                        <FooterText>
                            <a href="https://about.zenith.to/privacy-policy" target="_blank" title="Privacy policy" aria-label="Privacy policy">Privacy policy</a>
                        </FooterText>
                        <FooterText>
                            <a href="https://about.zenith.to/tos" target="_blank" title="Terms of service" aria-label="Terms of service">Terms of service</a>
                        </FooterText>
                    </FooterRow>
                </FooterItem>
            </FooterInnerContainer>
        </FooterContainer>
    );
}

export default Footer;