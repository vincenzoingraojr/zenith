import Head from "../components/Head";
import { PageTextMB24 } from "../styles/global";
import PageLayout from "../components/layouts/PageLayout";
import PageContentLayout from "../components/layouts/sublayouts/PageContentLayout";
import { useMeData } from "../utils/useMeData";

function HomePage() {
    const { me } = useMeData();

    return (
        <>
            <Head
                title="Home | Zenith"
                description="Zenith, the everything app."
            />
            <PageLayout 
                children={
                    <PageContentLayout 
                        title="Home"
                        type="main"
                        children={
                            <>
                                <PageTextMB24>
                                    City of Stars, are you shining just for me?
                                    <br />
                                    City of Stars, there's so much that I can't see.
                                    <br />
                                    Who knows? I felt it from the first embrace I shared with you.
                                    <br />
                                    That now our dreams, they've finally come true.
                                </PageTextMB24>
                                <PageTextMB24>
                                    {me ? `@${me.username}` : "No data."}
                                </PageTextMB24>
                            </>
                        }
                    />
                }
            />
        </>
    );
}

export default HomePage;