import { Form, Formik } from "formik";
import Head from "../../components/Head";
import AuthLayout from "../../components/layouts/AuthLayout";
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
import { useReactivateAccountMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { BAD_REQUEST_MESSAGE } from "../../utils/constants";

function ReactivateAccount() {
    const [reactivateAccount] = useReactivateAccountMutation();

    return (
        <>
            <Head
                title="Reactivate your account | Zenith"
                description="Reactivate your account on Zenith."
            />
            <AuthLayout
                children={
                    <AuthForm>
                        <AuthFormTitle>Reactivate your account</AuthFormTitle>
                        <PageTextMB24>
                            In this page you can reactivate your account.
                        </PageTextMB24>
                        <Formik
                            initialValues={{
                                input: "",
                                password: "",
                            }}
                            onSubmit={async (
                                values,
                                { setErrors, setStatus }
                            ) => {
                                const response = await reactivateAccount({
                                    variables: values,
                                });

                                setStatus(null);

                                if (response.data) {
                                    if (
                                        response.data.reactivateAccount
                                            .errors &&
                                        response.data.reactivateAccount.errors
                                            .length > 0
                                    ) {
                                        setErrors(
                                            toErrorMap(
                                                response.data.reactivateAccount
                                                    .errors
                                            )
                                        );
                                    } else {
                                        setStatus(
                                            response.data.reactivateAccount
                                                .status
                                        );
                                    }
                                } else {
                                    setStatus(BAD_REQUEST_MESSAGE);
                                }
                            }}
                        >
                            {({ errors, status }) => (
                                <Form>
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
                                                title="Reactivate your account"
                                                role="button"
                                                aria-label="Reactivate your account"
                                            >
                                                Reactivate your account
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

export default ReactivateAccount;
