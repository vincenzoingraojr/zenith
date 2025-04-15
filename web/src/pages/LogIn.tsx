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
import { MeDocument, MeQuery, useLoginMutation, User } from "../generated/graphql";
import { setAccessToken } from "../utils/token";
import { useLocation, useNavigate } from "react-router-dom";
import { toErrorMap } from "../utils/toErrorMap";
import { BAD_REQUEST_MESSAGE } from "../utils/constants";
import AuthLayout from "../components/layouts/AuthLayout";

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

    const [login] = useLoginMutation();

    const navigate = useNavigate();

    const location = useLocation();

    return (
        <>
            <Head
                title="Log in | Zenith"
                description="Log in to Zenith."
            />
            <AuthLayout
                children={
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
                                values,
                                { setErrors, setStatus }
                            ) => {
                                const response = await login({
                                    variables: {
                                        input: values.input,
                                        password: values.password,
                                        clientOS: values.clientOS,
                                        clientType: values.clientType,
                                        clientName: values.clientName,
                                        deviceLocation: values.deviceLocation,
                                        country: values.country,
                                    },
                                    update: (store, { data }) => {
                                        if (data && data.login.user && data.login.ok) {
                                            store.writeQuery<MeQuery>({
                                                query: MeDocument,
                                                data: {
                                                    me: data.login
                                                        .user as User,
                                                },
                                            });
                                        }
                                    },
                                });

                                setStatus(null);

                                if (response.data) {
                                    if (response.data.login.ok && response.data.login.user && response.data.login.accessToken) {
                                        setAccessToken(
                                            response.data.login.accessToken
                                        );
                                        setStatus(response.data.login.status);
                                        navigate(0);
                                    } else if (response.data.login.user && response.data.login.user.userSettings.twoFactorAuth && response.data.login.status === "otp_sent") {
                                        navigate("/verify/otp", {
                                            state: {
                                                backgroundLocation:
                                                    location,
                                                isLogin: true,
                                                input: values.input,
                                                password: values.password,
                                                clientOS: values.clientOS,
                                                clientType: values.clientType,
                                                clientName: values.clientName,
                                                deviceLocation: values.deviceLocation,
                                                country: values.country,
                                            },
                                        });
                                    } else if (response.data.login.user && response.data.login.status === "account_deactivated") {
                                        setStatus("Account deactivated. Please contact support.");
                                    } else {
                                        if (response.data.login.errors && response.data.login.errors.length > 0) {
                                            setErrors(toErrorMap(response.data.login.errors));
                                        } else {
                                            setStatus(response.data.login.status);
                                        }
                                    }
                                } else {
                                    setStatus(BAD_REQUEST_MESSAGE);
                                }
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
                }
            />
        </>
    );
}

export default LogIn;