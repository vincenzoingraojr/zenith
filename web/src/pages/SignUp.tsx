import { Form, Formik } from "formik";
import Head from "../components/Head";
import AuthLayout from "../components/layouts/AuthLayout";
import { useSignupMutation } from "../generated/graphql";
import { AuthForm, AuthFormContent, AuthFormTitle, AuthHalfInput, PageBlock, StandardButton, Status } from "../styles/global";
import InputField from "../components/input/InputField";
import { BAD_REQUEST_MESSAGE, genderOptions } from "../utils/constants";
import { toErrorMap } from "../utils/toErrorMap";
import SelectField from "../components/input/select/SelectField";
import DatePickerField from "../components/input/datepicker/DatePickerField";

function SignUp() {
    const [signup] = useSignupMutation();

    return (
        <>
            <Head
                title="Sign up | Zenith"
                description="Sign up to Zenith."
            />
            <AuthLayout
                children={
                    <AuthForm>
                        <AuthFormTitle>Sign up</AuthFormTitle>
                        <Formik
                            initialValues={{
                                birthDate: new Date(),
                                gender: "",
                                name: "",
                                email: "",
                                username: "",
                                password: "",
                            }}
                            onSubmit={async (
                                values,
                                { setErrors, setStatus }
                            ) => {
                                const response = await signup({
                                    variables: values,
                                });

                                if (response.data) {
                                    if (response.data.signup.errors && response.data.signup.errors.length > 0) {
                                        setErrors(toErrorMap(response.data.signup.errors));
                                    } else {
                                        setStatus(response.data.signup.status);
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
                                        <AuthHalfInput>
                                            <DatePickerField
                                                field="birthDate"
                                                placeholder="Birth date"
                                                errors={errors}
                                            />
                                            <SelectField
                                                field="gender"
                                                placeholder="Gender"
                                                errors={errors}
                                                options={genderOptions}
                                            />
                                        </AuthHalfInput>
                                        <InputField
                                            field="name"
                                            type="text"
                                            placeholder="Name"
                                            errors={errors}
                                        />
                                        <InputField
                                            field="email"
                                            type="email"
                                            placeholder="Email"
                                            errors={errors}
                                        />
                                        <InputField
                                            field="username"
                                            type="text"
                                            placeholder="Username"
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
                                                title="Sign up"
                                                role="button"
                                                aria-label="Sign up"
                                            >
                                                Sign up
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

export default SignUp;