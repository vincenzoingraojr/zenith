import Head from "../components/Head";
import { PageTextMB24 } from "../styles/global";
import PageLayout from "../components/layouts/PageLayout";
import { useMeData } from "../utils/useMeData";
import PageContentLayout from "../components/layouts/sublayouts/PageContentLayout";

function HomePage() {
    const { me, loading, error } = useMeData();

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
                                    {loading ? "Loading..." : error ? error.message : `@${me?.username}`}
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