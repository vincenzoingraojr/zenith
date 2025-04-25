import Head from "../components/Head";
import PageLayout from "../components/layouts/PageLayout";
import PageContentLayout from "../components/layouts/sublayouts/PageContentLayout";
import { PageText } from "../styles/global";
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
                                <PageText>{me && `@${me.username}`}</PageText>
                            </>
                        }
                    />
                }
            />
        </>
    );
}

export default HomePage;