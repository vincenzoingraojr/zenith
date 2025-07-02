import { useLocation, useNavigate } from "react-router-dom";
import Head from "../../components/Head";
import PageLayout from "../../components/layouts/PageLayout";
import PageContentLayout from "../../components/layouts/sublayouts/PageContentLayout";
import { PageText } from "../../styles/global";

function Messages() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <>
            <Head
                title="Messages | Zenith"
                description="In this page you can view and manage your chats."
            />
            <PageLayout
                activityType={"new_conversation"}
                activity={() => {
                    navigate("/messages/new_chat", {
                        state: {
                            backgroundLocation: location,
                        },
                    });
                }}
                children={
                    <PageContentLayout
                        title="Messages"
                        type="main"
                        children={
                            <>
                                <PageText>
                                    View your messages on Zenith.
                                </PageText>
                            </>
                        }
                    />
                }
            />
        </>
    );
}

export default Messages;
