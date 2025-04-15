import { Form, Formik } from "formik";
import Head from "../components/Head";
import AuthLayout from "../components/layouts/AuthLayout";
import { AuthForm, AuthFormContent, AuthFormTitle, PageBlock, PageTextMB24, StandardButton, Status } from "../styles/global";
import { useSendRecoveryEmailMutation } from "../generated/graphql";
import InputField from "../components/input/InputField";
import { BAD_REQUEST_MESSAGE } from "../utils/constants";
import { toErrorMap } from "../utils/toErrorMap";

function RecoverPassword() {
    const [sendEmail] = useSendRecoveryEmailMutation();

    return (
        <>
            <Head
                title="Recover your password | Zenith"
                description="Recover your account password in order to log in to Zenith."
            />
            <AuthLayout
                children={
                    <AuthForm>
                        <AuthFormTitle>Recover your password</AuthFormTitle>
                        <PageTextMB24>
                            In this page you can recover your account password using the email associated with it.
                        </PageTextMB24>
                        <Formik
                            initialValues={{ email: "" }}
                            onSubmit={async (
                                values,
                                { setErrors, setStatus }
                            ) => {
                                const response = await sendEmail({
                                    variables: values,
                                });

                                setStatus(null);
                                
                                if (response.data) {
                                    if (response.data.sendRecoveryEmail.errors && response.data.sendRecoveryEmail.errors.length > 0) {
                                        setErrors(toErrorMap(response.data.sendRecoveryEmail.errors));
                                    } else {
                                        setStatus(response.data.sendRecoveryEmail.status);
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
                                            field="email"
                                            type="email"
                                            placeholder="Email"
                                            errors={errors}
                                        />
                                        <PageBlock>
                                            <StandardButton
                                                type="submit"
                                                title="Recover your password"
                                                role="button"
                                                aria-label="Recover your password"
                                            >
                                                Recover your password
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

export default RecoverPassword;