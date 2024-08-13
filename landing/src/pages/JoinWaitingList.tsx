import Head from "../components/Head";
import styled from "styled-components";
import { FieldError, useAddLandingUserMutation } from "../generated/graphql";
import { Button, PageBlock, PageTextMB24 } from "../styles/global";
import { Form, Formik } from "formik";
import { toErrorMap } from "../toErrorMap";
import InputField from "../components/input/InputField";
import { devices } from "../styles/devices";
import AuthLayout from "../components/layouts/AuthLayout";

const AuthForm = styled.div`
    display: block;
`;

const AuthFormTitle = styled.div`
    display: block;
    font-weight: 800;
    margin-bottom: 48px;
    font-size: 32px;

    @media ${devices.mobileS} {
        font-size: 44px;
    }

    @media ${devices.mobileL} {
        font-size: 50px;
    }

    @media ${devices.tablet} {
        font-size: 60px;
    }
`;

const AuthFormContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const Status = styled.div`
    display: block;
    padding: 6px;
    border-radius: 6px;
    font-size: 14px;
    background-color: #386BD9;
    color: #FFFFFF;
    margin-bottom: 24px;
`;

const LandingButton = styled(Button)`
    background-color: #FFFFFF;
    color: #141313;
`;

function JoinWaitingList() {
    const [addLandingUser] = useAddLandingUserMutation();

    return (
        <>
            <Head
                title="Join the waiting list | Zenith"
                description="Sign up to be notified when the platform is completed."
            />
            <AuthLayout 
                content={
                    <AuthForm>
                        <AuthFormTitle>Join the waiting list</AuthFormTitle>
                        <PageTextMB24>
                            Sign up to be notified when the platform is
                            completed and claim your username.
                        </PageTextMB24>
                        <Formik
                            initialValues={{
                                name: "",
                                username: "",
                                email: "",
                            }}
                            onSubmit={async (
                                values,
                                { setStatus, setErrors }
                            ) => {
                                const response = await addLandingUser({
                                    variables: values,
                                });

                                if (response.data) {
                                    if (response.data.addLandingUser.ok || (!response.data.addLandingUser.ok && response.data.addLandingUser.errors && response.data.addLandingUser.errors.length === 0)) {
                                        setStatus(response.data.addLandingUser.status as string);
                                    } else {
                                        setErrors(toErrorMap(response.data.addLandingUser.errors as FieldError[]));
                                    }
                                } else {
                                    setStatus("An error has occurred, please try again later.");
                                }
                            }}
                        >
                            {({ errors, status, isSubmitting }) => (
                                <Form>
                                    {status && (
                                        <Status>{status}</Status>
                                    )}
                                    <AuthFormContent>
                                        <InputField
                                            field="name"
                                            type="text"
                                            placeholder="Name"
                                            errors={errors}
                                        />
                                        <InputField
                                            field="username"
                                            type="text"
                                            placeholder="Username"
                                            errors={errors}
                                        />
                                        <InputField
                                            field="email"
                                            type="email"
                                            placeholder="Email"
                                            errors={errors}
                                        />
                                        <PageBlock>
                                            <LandingButton 
                                                type="submit"
                                                title="Join the waiting list"
                                                role="button"
                                                aria-label="Join the waiting list"
                                            >
                                                {isSubmitting ? (
                                                    <>Joining...</>
                                                ) : (
                                                    <>Join</>
                                                )}
                                            </LandingButton>
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

export default JoinWaitingList;