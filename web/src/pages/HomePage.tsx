import Head from "../components/Head";
import { PageText } from "../styles/global";

function HomePage() {
    return (
        <>
            <Head
                title="Home | Zenith"
                description="Zenith, the everything app."
            />
            <PageText>
                City of Stars, are you shining just for me?
                <br />
                City of Stars, there's so much that I can't see.
                <br />
                Who knows? I felt it from the first embrace I shared with you.
                <br />
                That now our dreams, they've finally come true.
            </PageText>
        </>
    );
}

export default HomePage;