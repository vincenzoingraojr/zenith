import { useState } from "react";
import Head from "../../../components/Head";
import PageLayout from "../../../components/layouts/PageLayout";
import PageContentLayout from "../../../components/layouts/sublayouts/PageContentLayout";
import { PageText, StandardButton } from "../../../styles/global";
import { useCreateDeviceTokenMutation } from "../../../generated/graphql";
import { getToken } from "firebase/messaging";
import { messaging } from "../../../utils/firebase";

function NotificationSettings() {
    const [permissionStatus, setPermissionStatus] = useState(Notification.permission);

    const [createToken] = useCreateDeviceTokenMutation();

    const handlePermissionRequest = async () => {
        try {
            const permission = await Notification.requestPermission();
            setPermissionStatus(permission);

            if (permission === "granted") {
                const sw = await navigator.serviceWorker.register(process.env.NODE_ENV === "production" ? "/service-worker.js" : "/service-worker-dev.js");
                getToken(messaging, { vapidKey: process.env.REACT_APP_MESSAGING_PUBLIC_KEY, serviceWorkerRegistration: sw }).then(async (currentToken) => {
                    if (currentToken) {
                        await createToken({
                            variables: {
                                token: currentToken,
                            }
                        });
                    } else {
                        console.log("No registration token available.");
                    }
                }).catch((error) => {
                    console.error(error);
                });
            }
        } catch (error) {
            console.error("Error requesting permission: ", error);
        }
    };

    return (
        <>
            <Head
                title="Notification settings | Square"
                description="Manage your notification settings."
            />
            <PageLayout
                noNav={true}
                children={
                    <PageContentLayout
                        title="Notification settings"
                        type="default"
                        children={
                            <>
                                {permissionStatus === "granted" ? (
                                    <PageText>You can disable push notifications in the browser settings.</PageText>
                                ) : (
                                    <>
                                        {permissionStatus === "denied" ? (
                                            <PageText>You denied the permission to send push notifications. Change this option in the browser settings.</PageText>
                                        ) : (
                                            <StandardButton
                                                type="button"
                                                title="Enable push notifications"
                                                role="button"
                                                aria-label="Enable push notifications"
                                                onClick={handlePermissionRequest}
                                            >
                                                Enable push notifications
                                            </StandardButton>
                                        )}
                                    </>
                                )}
                            </>
                        }
                    />
                }
            />
        </>
    );
}

export default NotificationSettings;