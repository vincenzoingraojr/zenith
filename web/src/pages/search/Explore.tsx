import Head from "../../components/Head";
import PageLayout from "../../components/layouts/PageLayout";
import PageContentLayout from "../../components/layouts/sublayouts/PageContentLayout";
import { PageText } from "../../styles/global";

function Explore() {
    return (
        <>
            <Head 
                title="Explore | Zenith"
                description="Discover new things on Zenith."
            />
            <PageLayout 
                children={
                    <PageContentLayout
                        title="Explore"
                        type="main"
                        customHeaderComponent={<>SearchBar</>}
                        children={
                            <>
                                <PageText>Explore on Zenith.</PageText>
                            </>
                        }
                    />
                }
            />
        </>
    );
}

export default Explore;