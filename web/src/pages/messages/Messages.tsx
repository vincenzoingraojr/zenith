import Head from "../../components/Head";
import AddMessage from "../../components/icons/AddMessage";
import PageLayout from "../../components/layouts/PageLayout";
import PageContentLayout from "../../components/layouts/sublayouts/PageContentLayout";
import { ControlContainer, PageText } from "../../styles/global";

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
                        headerIconsComponent={
                            <ControlContainer
                                role="link"
                                title="Create a new chat or group"
                                aria-label="Create a new chat or group"
                            >
                                <AddMessage />
                            </ControlContainer>
                        }
                    />
                }
            />
        </>
    );
}

export default Messages;