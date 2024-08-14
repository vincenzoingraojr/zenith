import { PageLayout } from "../../components/PageLayout";
import { SEO } from "../../components/Seo";
import { PageContentLayout } from "../../components/sublayouts/PageContentLayout";
import { PageBaseContainer, PageDescription, PageSmallTitle, PageText, PageTitle } from "../../styles/global";

function OurMission() {
    return (
        <>
            <SEO title="About Zenith | Our mission" description="Connecting the world with Zenith." />
            <PageLayout children={
                <PageContentLayout
                    children={
                        <PageBaseContainer>
                            <PageTitle>Our vision and values</PageTitle>
                            <PageDescription>
                                Connecting the world with Zenith.
                            </PageDescription>
                            <PageText>
                                Welcome to Zenith, where we're not just building an application; we're shaping a new world. A world that's transparent, connected, secure, and open. Our commitment to these values drives every aspect of our platform, ensuring that you have a revolutionary experience that goes beyond the ordinary.
                            </PageText>
                            <PageText>
                                <PageSmallTitle>
                                    Transparency: see the world unfold in real-time
                                </PageSmallTitle>
                                <PageText>
                                    In an open world, information flows freely. With Zenith, you will gain access to real-time updates and news from across the globe. You will have a powerful tool to stay informed about events, trends, and developments as they happen. Our real-time news feeds, event tracking, and live updates will empower you to be in the know, always.
                                </PageText>
                            </PageText>
                            <PageText>
                                <PageSmallTitle>
                                    Bringing people together: connect and collaborate anywhere, anytime
                                </PageSmallTitle>
                                <PageText>
                                    Zenith is more than just an app – it's a nexus of connections that transcend borders. We're building a platform that fosters solidarity by bringing people together, no matter where they are. Through group chats, seamless video calls, and community forums, we're forging meaningful connections and enabling collaboration among users from all walks of life.
                                </PageText>
                            </PageText>
                            <PageText>
                                <PageSmallTitle>
                                    Security and privacy: your safety is paramount
                                </PageSmallTitle>
                                <PageText>
                                    Security and privacy are paramount in an open world, and we take this responsibility seriously. With end-to-end encryption, secure payment processing, and robust data protection measures, Zenith ensures that your personal information and communications remain confidential and safeguarded from prying eyes.
                                </PageText>
                            </PageText>
                            <PageText>
                                <PageSmallTitle>
                                    Openness: your experience, your way
                                </PageSmallTitle>
                                <PageText>
                                    An open world thrives on diversity and inclusivity. Zenith is your canvas for self-expression. Customize your user profile to reflect your unique personality. Our open API access empowers developers to innovate, resulting in a dynamic and evolving platform that adapts to your needs.
                                </PageText>
                            </PageText>
                            <PageText>
                                <PageSmallTitle>
                                    Embracing the benefits of an open world
                                </PageSmallTitle>
                                <PageText>
                                    An open world is fertile ground for innovation, understanding, and collaboration. By breaking down barriers and embracing diversity, we can collectively tackle challenges and seize opportunities on a global scale. With Zenith as your digital companion, you'll have the tools to explore, learn, and contribute to a more open and interconnected world.
                                </PageText>
                            </PageText>
                            <PageText>
                                <PageSmallTitle>
                                    Our commitment to an open world
                                </PageSmallTitle>
                                <PageText>
                                    At Zenith, our commitment to an open world goes beyond just words. We are actively involved in initiatives that promote transparency, solidarity, security, privacy, and openness. As we continue to develop and refine our app, we're driven by our dedication to creating an environment that reflects these core values.
                                </PageText>
                            </PageText>
                            <PageText>
                                While our app is still in development, we invite you to be a part of our journey. Follow our progress on social media, and get ready to experience firsthand the transformative power of an open world with Zenith.<br />
                                <br />
                                Together, we can redefine how we connect, communicate, and collaborate. Join us in building a world that is truly open – a world powered by Zenith.
                            </PageText>
                            <PageText>
                                <b>Exciting news for 2024</b><br />
                                We're thrilled to announce that Zenith will be available on multiple platforms! Whether you're an Android enthusiast, an iOS aficionado, a web devotee, or a Windows, macOS, or Linux user, you'll be able to experience the open world of Zenith on your preferred device. Get ready to join the movement and explore the new era of connectivity and engagement. Stay tuned for the official launch in 2024!
                            </PageText>
                        </PageBaseContainer>
                    }  
                />
            } />
        </>
    );
};

export default OurMission;