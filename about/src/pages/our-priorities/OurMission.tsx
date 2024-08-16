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
                            <PageTitle>Our mission</PageTitle>
                            <PageDescription>
                                Connecting the world with Zenith.
                            </PageDescription>
                            <PageText>
                                With Zenith, the super-app we are building, we aim to create a new ecosystem of features and opportunities that will allow users to participate in public conversation in a safe and transparent manner, to communicate in multiple ways with family and friends, and to send and receive money easily and securely. <br />
                                Our mission will be carried out according to a few values that are very important to us: <b>transparency</b>, <b>user safety and protection</b>, and <b>neutrality</b>.
                            </PageText>
                            <PageText>
                                <PageSmallTitle>
                                    Transparency
                                </PageSmallTitle>
                                <PageText>
                                    Transparency is the foundation of every trust-based relationship: in our case, between us and the users. To fund Zenith, we will need to allow companies and users to insert advertisements, and in the not-too-distant future, users will be able to earn money by posting content and videos, with a small portion of the earnings going to the company. All of this is to say that we will let every user know why they are seeing a particular advertisement, and based on which data they were targeted by it. <br />
                                    Additionally, the algorithms for recommending posts and content to users will be made public from day one.
                                </PageText>
                            </PageText>
                            <PageText>
                                <PageSmallTitle>
                                    User safety and protection
                                </PageSmallTitle>
                                <PageText>
                                    Users must feel safe while using Zenith. We will employ technologies and methods that ensure significant security for their data, and we will implement features (automatic, but in some cases supervised by people) that will prevent the spread of hate of any kind through all types of content that can be created and published on Zenith. Of course, our decisions to remove content may, in many cases, be subject to appeal. But some decisions, concerning rather delicate issues, will be permanent.
                                </PageText>
                            </PageText>
                            <PageText>
                                <PageSmallTitle>
                                    Neutrality
                                </PageSmallTitle>
                                <PageText>
                                    On Zenith, users will be able to express their opinions and talk about their passions in a free and unrestricted environment — content removal will only occur in very serious contexts, when the published material is humanly unacceptable. We and Zenith will remain neutral: we won't care about the political orientation or other opinions of users; we will only care that users contribute to creating an inclusive and safe environment.
                                </PageText>
                            </PageText>
                        </PageBaseContainer>
                    }  
                />
            } />
        </>
    );
};

export default OurMission;