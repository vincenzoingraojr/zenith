import { Formik, Form } from "formik";
import Head from "../../components/Head";
import {
    AuthForm,
    AuthFormContent,
    AuthFormTitle,
    PageBlock,
    PageTextMB24,
    StandardButton,
    Status,
} from "../../styles/global";
import InputField from "../../components/input/InputField";
import { useEffect, useState } from "react";
import {
    browserName,
    isMobile,
    isBrowser,
    mobileModel,
    osName,
    deviceType,
} from "react-device-detect";
import {
    MeDocument,
    MeQuery,
    useLoginMutation,
    User,
} from "../../generated/graphql";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toErrorMap } from "../../utils/toErrorMap";
import { BAD_REQUEST_MESSAGE } from "../../utils/constants";
import AuthLayout from "../../components/layouts/AuthLayout";
import { useAuth } from "../../utils/AuthContext";

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

    const [type, setType] = useState<string>("");

    useEffect(() => {
        setType(deviceType);
    }, []);

    const [login] = useLoginMutation();

    const navigate = useNavigate();

    const location = useLocation();

    const [recovery, setRecovery] = useState(false);
    const { logInAndSetToken } = useAuth();

    return (
        <>
            <Head title="Log in | Zenith" description="Log in to Zenith." />
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
                                    },
                                    update: (store, { data }) => {
                                        if (
                                            data &&
                                            data.login.user &&
                                            data.login.ok
                                        ) {
                                            store.writeQuery<MeQuery>({
                                                query: MeDocument,
                                                data: {
                                                    me: data.login.user as User,
                                                },
                                            });
                                        }
                                    },
                                });

                                setStatus(null);
                                setRecovery(false);

                                if (response.data) {
                                    if (
                                        response.data.login.ok &&
                                        response.data.login.user &&
                                        response.data.login.accessToken
                                    ) {
                                        setStatus(response.data.login.status);
                                        logInAndSetToken(
                                            response.data.login.accessToken
                                        );
                                    } else if (
                                        response.data.login.user &&
                                        response.data.login.user.userSettings
                                            .twoFactorAuth &&
                                        response.data.login.status ===
                                            "otp_sent"
                                    ) {
                                        navigate("/verify/otp", {
                                            state: {
                                                backgroundLocation: location,
                                                isLogin: true,
                                                input: values.input,
                                                password: values.password,
                                                clientOS: values.clientOS,
                                                clientType: values.clientType,
                                                clientName: values.clientName,
                                            },
                                        });
                                    } else if (
                                        response.data.login.user &&
                                        response.data.login.status ===
                                            "account_deactivated"
                                    ) {
                                        setRecovery(true);
                                    } else {
                                        if (
                                            response.data.login.errors &&
                                            response.data.login.errors.length >
                                                0
                                        ) {
                                            setErrors(
                                                toErrorMap(
                                                    response.data.login.errors
                                                )
                                            );
                                        } else {
                                            setStatus(
                                                response.data.login.status
                                            );
                                        }
                                    }
                                } else {
                                    setStatus(BAD_REQUEST_MESSAGE);
                                }
                            }}
                        >
                            {({ errors, status }) => (
                                <Form>
                                    {recovery && (
                                        <PageTextMB24>
                                            Account deactivated, but you can
                                            reactivate it{" "}
                                            <Link
                                                to="/reactivate_account"
                                                title="Reactivate your account"
                                                aria-label="Reactivate your account"
                                            >
                                                here
                                            </Link>
                                            .
                                        </PageTextMB24>
                                    )}
                                    {status && <Status>{status}</Status>}
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
