import Head from "../../components/Head";
import PageLayout from "../../components/layouts/PageLayout";
import PageContentLayout from "../../components/layouts/sublayouts/PageContentLayout";
import { PageText } from "../../styles/global";

function SearchPage() {
    return (
        <>
            <Head 
                title="Search | Zenith"
                description="Discover new things on Zenith."
            />
            <PageLayout 
                children={
                    <PageContentLayout
                        title="Search"
                        type="main"
                        customHeaderComponent={<>Search</>}
                        children={
                            <>
                                <PageText>Search on Zenith.</PageText>
                            </>
                        }
                    />
                }
            />
        </>
    );
}

export default SearchPage;