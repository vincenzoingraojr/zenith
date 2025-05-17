import Head from "../components/Head";
import Settings from "../components/icons/Settings";
import PageLayout from "../components/layouts/PageLayout";
import PageContentLayout from "../components/layouts/sublayouts/PageContentLayout";
import { ControlContainer, PageText } from "../styles/global";

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
                        headerIconsComponent={
                            <ControlContainer
                                role="link"
                                title="Notification settings"
                                aria-label="Notification settings"
                            >
                                <Settings type="options" />
                            </ControlContainer>
                        }
                    />
                }
            />
        </>
    );
}

export default Notifications;