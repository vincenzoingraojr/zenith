import { PageLayout } from "../../components/PageLayout";
import { SEO } from "../../components/Seo";
import { PageContentLayout } from "../../components/sublayouts/PageContentLayout";
import { PageBaseContainer, PageDescription, PageSmallTitle, PageText, PageTitle } from "../../styles/global";

function AboutUs() {
    return (
        <>
            <SEO title="About Zenith | The company" description="In this page you can find out more about the company." />
            <PageLayout children={
                <PageContentLayout
                    children={
                        <PageBaseContainer>
                            <PageTitle>About the company</PageTitle>
                            <PageDescription>
                                Discover more about the company and the products we're building.
                            </PageDescription>
                            <PageText>
                                Zenith is not only the name of the platform we're building, is also the name of the <b>company</b>. <br />
                                <br />
                                We aim to build an alternative to the already available social networking platforms that is privacy-centered, visually beautiful and technically functional. <br />
                                <br />
                                Zenith will be a <b>super-app</b>, an application that can provide multiple services, including payment and financial transaction processing. Zenith will allow users to find out what's happening in the world in real time, chat and make video calls with whoever they want, and send and receive money instantly.
                            </PageText>
                            <PageText>
                                <PageSmallTitle>
                                    The company
                                </PageSmallTitle>
                                <PageText>
                                    The company itself is at the beginning of its journey, and we're a small group of <b>close friends</b> who want to change the world through something we've been chewing since we were kids, i.e. software. If things go as planned, we will begin to scale the company and hire brilliant people who will create beautiful stuff.
                                </PageText>
                            </PageText>
                            <PageText>
                                <PageSmallTitle>
                                    A few more words about the platform
                                </PageSmallTitle>
                                <PageText>
                                    Zenith will be built for all the available platforms. Firstly, we will release the web version, users will be able to test and use the app practically everywhere. Secondly, we will release the Android and iOS versions, along with the desktop apps (for Windows, macOS and Linux). <br />
                                    <br />
                                    With the release of the web version, we will reveal to the public <b>the source code of all the algorithms</b> behind the recommendation of posts and content to the users. The algorithms behid the payment system will not be shared for obvious reasons.
                                </PageText>
                            </PageText>
                        </PageBaseContainer>
                    }  
                />
            } />
        </>
    );
};

export default AboutUs;