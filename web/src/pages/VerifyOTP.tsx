import { Form, Formik } from "formik";
import Head from "../components/Head";
import { AuthFormContent, AuthForm, PageBlock, StandardButton, Status, ModalFormContainer, PageTextMB24 } from "../styles/global";
import InputField from "../components/input/InputField";
import { useLocation } from "react-router-dom";

function VerifyOTP() {
    const location = useLocation();

    return (
        <>
            <Head
                title="Verify OTP | Zenith"
                description="In this page you can enter the OTP you received in your inbox."
            />
            <ModalFormContainer>
                <AuthForm>
                    <PageTextMB24>
                        You've just received in your inbox the OTP code to verify this operation.
                    </PageTextMB24>
                    <Formik
                        initialValues={{
                            otp: "",
                            input: location.state.input || "",
                            password: location.state.password || "",
                            isLogin: location.state.isLogin,
                            clientOS: location.state.clientOS || "",
                            clientType: location.state.clientType || "",
                            clientName: location.state.clientName || "",
                            deviceLocation: location.state.deviceLocation || "",
                            country: location.state.country || "",
                        }}
                        onSubmit={async (
                            values,
                            { setStatus }
                        ) => {
                            
                        }}
                    >
                        {({ status }) => (
                            <Form>
                                {status && (
                                    <Status>{status}</Status>
                                )}
                                <AuthFormContent>
                                    <InputField
                                        field="otp"
                                        type="text"
                                        placeholder="One-time password"
                                    />
                                    <PageBlock>
                                        <StandardButton
                                            type="submit"
                                            title="Verify OTP"
                                            role="button"
                                            aria-label="Verify OTP"
                                        >
                                            Verify OTP
                                        </StandardButton>
                                    </PageBlock>
                                </AuthFormContent>
                            </Form>
                        )}
                    </Formik>
                </AuthForm>
            </ModalFormContainer>
        </>
    );
}

export default VerifyOTP;