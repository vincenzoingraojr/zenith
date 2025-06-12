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
import { useNotAuthModifyPasswordMutation } from "../../generated/graphql";
import InputField from "../../components/input/InputField";
import { BAD_REQUEST_MESSAGE } from "../../utils/constants";
import { toErrorMap } from "../../utils/toErrorMap";
import { useParams } from "react-router-dom";

function ModifyPassword() {
    const [modifyPassword] = useNotAuthModifyPasswordMutation();
    const params = useParams();

    return (
        <>
            <Head
                title="Modify your password | Zenith"
                description="Modify your account password in order to log in to Zenith."
            />
            <AuthLayout
                children={
                    <AuthForm>
                        <AuthFormTitle>Modify your password</AuthFormTitle>
                        <PageTextMB24>
                            In this page you can modify your account password.
                        </PageTextMB24>
                        <Formik
                            initialValues={{
                                token: params.token!,
                                password: "",
                                confirmPassword: "",
                            }}
                            onSubmit={async (
                                values,
                                { setErrors, setStatus }
                            ) => {
                                const response = await modifyPassword({
                                    variables: values,
                                });

                                setStatus(null);

                                if (response.data) {
                                    if (
                                        response.data.notAuthModifyPassword
                                            .errors &&
                                        response.data.notAuthModifyPassword
                                            .errors.length > 0
                                    ) {
                                        setErrors(
                                            toErrorMap(
                                                response.data
                                                    .notAuthModifyPassword
                                                    .errors
                                            )
                                        );
                                    } else {
                                        setStatus(
                                            response.data.notAuthModifyPassword
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
                                            field="password"
                                            type="password"
                                            placeholder="Password"
                                            errors={errors}
                                        />
                                        <InputField
                                            field="confirmPassword"
                                            type="password"
                                            placeholder="Confirmation password"
                                            errors={errors}
                                        />
                                        <PageBlock>
                                            <StandardButton
                                                type="submit"
                                                title="Modify your password"
                                                role="button"
                                                aria-label="Modify your password"
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

export default ModifyPassword;
