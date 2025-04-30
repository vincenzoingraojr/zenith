import Head from "../components/Head";
import PageLayout from "../components/layouts/PageLayout";
import PageContentLayout from "../components/layouts/sublayouts/PageContentLayout";
import { PageText } from "../styles/global";

function Notifications() {
    return (
        <>
            <Head 
                title="Notifications | Zenith"
                description="Here you can look at your notifications."
            />
            <PageLayout 
                children={
                    <PageContentLayout
                        title="Notifications"
                        type="main"
                        children={
                            <>
                                <PageText>View your notifications on Zenith.</PageText>
                            </>
                        }
                    />
                }
            />
        </>
    );
}

export default Notifications;