import Head from "../components/Head";
import PageLayout from "../components/layouts/PageLayout";
import PageContentLayout from "../components/layouts/sublayouts/PageContentLayout";
import { useToasts } from "../components/utils/ToastProvider";
import { PageBlock, StandardButton } from "../styles/global";
import { useMeData } from "../utils/useMeData";

function HomePage() {
    const { me } = useMeData();
    const { addToast } = useToasts();

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
                                <PageBlock>
                                    <StandardButton
                                        type="button"
                                        title="Who am I?"
                                        role="button"
                                        aria-label="Who am I?"
                                        onClick={() => {
                                            addToast(`You know who you are. You are authenticated as ${me && `@${me.username}`}.`);
                                        }}
                                    >
                                        Who am I?
                                    </StandardButton>
                                </PageBlock>
                            </>
                        }
                    />
                }
            />
        </>
    );
}

export default HomePage;