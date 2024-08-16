import { PageLayout } from "../../components/PageLayout";
import { SEO } from "../../components/Seo";
import { PageContentLayout } from "../../components/sublayouts/PageContentLayout";
import { PageBaseContainer, PageDescription, PageSmallTitle, PageText, PageTitle } from "../../styles/global";

function SecurityAndPrivacy() {
    return (
        <>
            <SEO title="About Zenith | Security and privacy" description="In this page you can read the security and privacy sneak peek for Zenith." />
            <PageLayout children={
                <PageContentLayout
                    children={
                        <PageBaseContainer>
                            <PageTitle>Security and privacy</PageTitle>
                            <PageDescription>
                                Security and privacy sneak peek for Zenith.
                            </PageDescription>
                            <PageText>
                                Welcome to the security and privacy sneak peek for Zenith, our upcoming super application that's currently in development. While we're hard at work crafting an exceptional experience for you, we wanted to provide you with a glimpse into the robust security and privacy measures we're putting in place.
                            </PageText>
                            <PageText>
                                <PageSmallTitle>
                                    Data protection and encryption
                                </PageSmallTitle>
                                <PageText>
                                    At Zenith, data security is a top priority. We're implementing advanced encryption technologies to ensure that your data is protected at all stages, from transmission to storage.
                                </PageText>
                            </PageText>
                            <PageText>
                                <PageSmallTitle>
                                    Secure communication
                                </PageSmallTitle>
                                <PageText>
                                    Rest assured, your conversations and video calls will be shielded by end-to-end encryption. This level of protection ensures that your private discussions remain just that — private.
                                </PageText>
                            </PageText>
                            <PageText>
                                <PageSmallTitle>
                                    Minimized data collection
                                </PageSmallTitle>
                                <PageText>
                                    We're committed to collecting only the necessary information to provide our services. Your data privacy is paramount, and we won't store more data than required.
                                </PageText>
                            </PageText>
                            <PageText>
                                <PageSmallTitle>
                                    Regular security audits and testing
                                </PageSmallTitle>
                                <PageText>
                                    Our proactive approach involves conducting frequent security audits and vulnerability assessments. By identifying potential risks early, we're working to ensure a secure environment for you.
                                </PageText>
                            </PageText>
                            <PageText>
                                <PageSmallTitle>
                                    User consent and control
                                </PageSmallTitle>
                                <PageText>
                                    Your data belongs to you. We're building tools that will allow you to manage your account settings, control permissions, and have the option to delete your data whenever you choose.
                                </PageText>
                            </PageText>
                            <PageText>
                                <PageSmallTitle>
                                    Incident response and transparency
                                </PageSmallTitle>
                                <PageText>
                                    In the unlikely event of a security breach, our prepared incident response plan will swing into action. We'll communicate transparently with you about any breaches and take immediate steps to address them.
                                </PageText>
                            </PageText>
                            <PageText>
                                <PageSmallTitle>
                                    Compliance with regulations
                                </PageSmallTitle>
                                <PageText>
                                    Rest assured, we're aligning with all relevant data protection regulations. Upholding your data privacy rights is a fundamental aspect of our development process.
                                </PageText>
                            </PageText>
                            <PageText>
                                <PageSmallTitle>
                                    Frequent updates and patches
                                </PageSmallTitle>
                                <PageText>
                                    Continuous improvement is key. We'll be rolling out regular updates to enhance security, address vulnerabilities, and provide you with the latest protections.
                                </PageText>
                            </PageText>
                            <PageText>
                                <PageSmallTitle>
                                    Contact us
                                </PageSmallTitle>
                                <PageText>
                                    We'd love to hear from you! If you have questions, concerns, or spot anything that seems off, please reach out to <a href="mailto:support@zenith.to">support@zenith.to</a>.
                                </PageText>
                            </PageText>
                            <PageText>
                                Remember, this is just a sneak peek into what's coming. As we finalize our apps, these security and privacy measures will be seamlessly integrated, creating a safe and private space for your interactions. <br />
                                <br />
                                Thank you for your interest in Zenith. We're excited to unveil the full experience soon!
                            </PageText>
                        </PageBaseContainer>
                    }  
                />
            } />
        </>
    );
};

export default SecurityAndPrivacy;