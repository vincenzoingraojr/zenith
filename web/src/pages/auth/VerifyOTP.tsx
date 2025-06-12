import { Form, Formik } from "formik";
import Head from "../../components/Head";
import {
    AuthFormContent,
    AuthForm,
    PageBlock,
    StandardButton,
    Status,
    ModalFormContainer,
    PageTextMB24,
    SmallButton,
    PageText,
} from "../../styles/global";
import InputField from "../../components/input/InputField";
import { useLocation } from "react-router-dom";
import {
    MeDocument,
    MeQuery,
    User,
    useResendOtpMutation,
    useVerifyOtpMutation,
} from "../../generated/graphql";
import { BAD_REQUEST_MESSAGE } from "../../utils/constants";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../utils/AuthContext";

const ResendOTPContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: center;
    justify-content: space-between;
    margin-top: 24px;
`;

const ResendOTPButton = styled(SmallButton)`
    color: ${({ theme }) => theme.color};
    border: 2px solid ${({ theme }) => theme.color};

    &:disabled {
        opacity: 0.4;
        cursor: unset;
    }

    &:disabled:hover,
    &:disabled:focus {
        background-color: transparent;
    }
`;

function VerifyOTP() {
    const location = useLocation();

    const [verifyOTP] = useVerifyOtpMutation();

    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }

            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                } else {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [minutes, seconds]);

    const [resendOTP] = useResendOtpMutation();

    const { logInAndSetToken } = useAuth();

    return (
        <>
            <Head
                title="Verify OTP | Zenith"
                description="In this page you can enter the OTP you received in your inbox."
            />
            <ModalFormContainer>
                <AuthForm>
                    <PageTextMB24>
                        You've just received in your inbox the OTP code to
                        verify this operation.
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
                        onSubmit={async (values, { setStatus }) => {
                            const response = await verifyOTP({
                                variables: values,
                                update: (store, { data }) => {
                                    if (
                                        data &&
                                        data.verifyOTP.user &&
                                        data.verifyOTP.ok
                                    ) {
                                        store.writeQuery<MeQuery>({
                                            query: MeDocument,
                                            data: {
                                                me: data.verifyOTP.user as User,
                                            },
                                        });
                                    }
                                },
                            });

                            setStatus(null);

                            if (response.data) {
                                setStatus(response.data.verifyOTP.status);

                                if (
                                    response.data.verifyOTP.user &&
                                    response.data.verifyOTP.ok
                                ) {
                                    if (
                                        response.data.verifyOTP.accessToken &&
                                        location.state.isLogin
                                    ) {
                                        logInAndSetToken(
                                            response.data.verifyOTP.accessToken
                                        );
                                    }
                                }
                            } else {
                                setStatus(BAD_REQUEST_MESSAGE);
                            }
                        }}
                    >
                        {({ status }) => (
                            <Form>
                                {status && <Status>{status}</Status>}
                                <AuthFormContent>
                                    <InputField
                                        field="otp"
                                        type="otp"
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
                    <ResendOTPContainer>
                        <ResendOTPButton
                            role="button"
                            title="Resend OTP"
                            aria-label="Resend OTP"
                            disabled={seconds > 0 || minutes > 0}
                            onClick={async () => {
                                const response = await resendOTP({
                                    variables: {
                                        input: location.state.input || "",
                                        password: location.state.password || "",
                                    },
                                });

                                if (response.data && response.data.resendOTP) {
                                    setMinutes(2);
                                    setSeconds(59);
                                }
                            }}
                        >
                            Resend OTP
                        </ResendOTPButton>
                        {(seconds > 0 || minutes > 0) && (
                            <PageText>
                                {minutes < 10 ? `0${minutes}` : minutes}:
                                {seconds < 10 ? `0${seconds}` : seconds}
                            </PageText>
                        )}
                    </ResendOTPContainer>
                </AuthForm>
            </ModalFormContainer>
        </>
    );
}

export default VerifyOTP;
