import { Form, Formik } from "formik";
import Head from "../components/Head";
import AuthLayout from "../components/layouts/AuthLayout";
import { useVerifyEmailAddressMutation } from "../generated/graphql";
import { AuthForm, AuthFormContent, AuthFormTitle, PageBlock, PageTextMB24, StandardButton, Status } from "../styles/global";
import { useParams } from "react-router-dom";
import { BAD_REQUEST_MESSAGE } from "../utils/constants";

function VerifyAccount() {
    const [verifyEmailAddress] = useVerifyEmailAddressMutation();

    const params = useParams();

    return (
        <>
            <Head
                title="Verify your email address | Zenith"
                description="Verify you email address in order to log in to Zenith."
            />
            <AuthLayout
                children={
                    <AuthForm>
                        <AuthFormTitle>Verify your email address</AuthFormTitle>
                        <PageTextMB24>
                            Click the following button to verify the email address linked to your account.
                        </PageTextMB24>
                            <Formik
                                initialValues={{ token: params.token! }}
                                onSubmit={async (
                                    values,
                                    { setStatus }
                                ) => {
                                    const response = await verifyEmailAddress({
                                        variables: values,
                                    });

                                    setStatus(null);
                                    
                                    if (response.data) {
                                        setStatus(response.data.verifyEmailAddress.status);
                                    } else {
                                        setStatus(BAD_REQUEST_MESSAGE);
                                    }
                                }}
                            >
                                {({ status }) => (
                                    <Form>
                                        {status && (
                                            <Status>{status}</Status>
                                        )}
                                        <AuthFormContent> 
                                            <PageBlock>
                                                <StandardButton
                                                    type="submit"
                                                    title="Verify your account"
                                                    role="button"
                                                    aria-label="Verify your account"
                                                >
                                                    Verify your account
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

export default VerifyAccount;