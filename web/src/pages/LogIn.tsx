import { Formik, Form } from "formik";
import Head from "../components/Head";
import { AuthForm, AuthFormContent, AuthFormTitle, PageBlock, StandardButton, Status } from "../styles/global";
import InputField from "../components/input/InputField";
import { useEffect, useState } from "react";
import { getUserLocationFromAPI } from "../utils/getLocation";
import {
    browserName,
    isMobile,
    isBrowser,
    mobileModel,
    osName,
    deviceType,
} from "react-device-detect";

function LogIn() {
    const [clientName, setClientName] = useState<string>("");

    useEffect(() => {
        if (isBrowser) {
            setClientName(browserName);
        } else if (isMobile) {
            setClientName(mobileModel);
        } else {
            setClientName("Unrecognized client");
        }
    }, []);

    const [userLocation, setUserLocation] = useState("");
    const [country, setCountry] = useState("");

    useEffect(() => {
        const response = getUserLocationFromAPI();

        response.then((response) => {
            setUserLocation(`${response.data.city}, ${response.data.country}`);
            setCountry(response.data.country);
        });
    }, []);

    const [type, setType] = useState<string>("");

    useEffect(() => {
        setType(deviceType);
    }, []);

    return (
        <>
            <Head
                title="Log in | Zenith"
                description="Log in to Zenith."
            />
            <AuthForm>
                <AuthFormTitle>Log in</AuthFormTitle>
                <Formik
                    initialValues={{
                        input: "",
                        password: "",
                        clientOS: osName,
                        clientType: type,
                        clientName,
                        deviceLocation: userLocation,
                        country,
                    }}
                    onSubmit={async (
                        values
                    ) => {
                        console.log("Form values:", values);
                    }}
                >
                    {({ errors, status }) => (
                        <Form>
                            {status && (
                                <Status>{status}</Status>
                            )}
                            <AuthFormContent>
                                <InputField
                                    field="input"
                                    type="text"
                                    placeholder="Username or email"
                                    errors={errors}
                                />
                                <InputField
                                    field="password"
                                    type="password"
                                    placeholder="Password"
                                    errors={errors}
                                />
                                <PageBlock>
                                    <StandardButton
                                        type="submit"
                                        title="Log in"
                                        role="button"
                                        aria-label="Log in"
                                    >
                                        Log in
                                    </StandardButton>
                                </PageBlock>
                            </AuthFormContent>
                        </Form>
                    )}
                </Formik>
            </AuthForm>
        </>
    );
}

export default LogIn;