import { Link } from "react-router-dom";
import styled from "styled-components";
import { devices } from "../styles/devices";
import { PageText } from "../styles/global";

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

function Footer() {
    return (
        <FooterContainer>
            <FooterInnerContainer>
                <FooterGrid>
                    <FooterItem>
                        <FooterTitle>Company</FooterTitle>
                        <FooterItemContent>
                            <PageText>
                                <Link to="/about-us" title="About the company" aria-label="About the company">About the company</Link>
                            </PageText>
                            <PageText>
                                <Link to="/careers" title="Careers" aria-label="Careers">Careers</Link>
                            </PageText>
                            <PageText>
                                <Link to="/brand-toolkit" title="Brand toolkit" aria-label="Brand toolkit">Brand toolkit</Link>
                            </PageText>
                        </FooterItemContent>
                    </FooterItem>
                    <FooterItem>
                        <FooterTitle>Platform</FooterTitle>
                        <FooterItemContent>
                            <PageText>
                                <Link to="/our-mission" title="Our mission" aria-label="Our mission">Our mission</Link>
                            </PageText>
                            <PageText>
                                <Link to="/security-and-privacy" title="Security and privacy" aria-label="Security and privacy">Security and privacy</Link>
                            </PageText>
                        </FooterItemContent>
                    </FooterItem>
                    <FooterItem>
                        <FooterTitle>Resources</FooterTitle>
                        <FooterItemContent>
                            <PageText>
                                <a href="https://help.zenith.to" title="Help center" aria-label="Help center" target="_blank" rel="noreferrer">Help center</a>
                            </PageText>
                            <PageText>
                                <a href="https://blog.zenith.to" title="Zenith Blog" aria-label="Zenith Blog" target="_blank" rel="noreferrer">Blog</a>
                            </PageText>
                            <PageText>
                                <Link to="/contact-us" title="Contact us" aria-label="Contact us">Contact us</Link>
                            </PageText>
                        </FooterItemContent>
                    </FooterItem>
                </FooterGrid>
                <FooterItem>
                    <FooterRow>
                        <PageText>
                            &copy; {new Date().getFullYear()} Zenith
                        </PageText>
                        <PageText>
                            <Link to="/cookies" title="Cookie policy" aria-label="Cookie policy">Cookies</Link>
                        </PageText>
                        <PageText>
                            <Link to="/privacy-policy" title="Privacy policy" aria-label="Privacy policy">Privacy policy</Link>
                        </PageText>
                        <PageText>
                            <Link to="/tos" title="Terms of service" aria-label="Terms of service">Terms of service</Link>
                        </PageText>
                    </FooterRow>
                </FooterItem>
            </FooterInnerContainer>
        </FooterContainer>
    );
}

export default Footer;
