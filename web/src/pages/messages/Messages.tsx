import Head from "../../components/Head";
import PageLayout from "../../components/layouts/PageLayout";
import PageContentLayout from "../../components/layouts/sublayouts/PageContentLayout";
import { PageText } from "../../styles/global";

function Messages() {
    return (
        <>
            <Head 
                title="Messages | Zenith"
                description="In this page you can view and manage your chats."
            />
            <PageLayout 
                children={
                    <PageContentLayout
                        title="Messages"
                        type="main"
                        children={
                            <>
                                <PageText>View your messages on Zenith.</PageText>
                            </>
                        }
                    />
                }
            />
        </>
    );
}

export default Messages;