import styled from "styled-components";
import Head from "../../components/Head";
import AuthLayout from "../../components/layouts/AuthLayout";
import { useLogoutMutation } from "../../generated/graphql";
import {
    AuthForm,
    AuthFormTitle,
    Button,
    PageBlock,
    PageTextMB24,
} from "../../styles/global";
import { COLORS } from "../../styles/colors";
import { useAuth } from "../../utils/AuthProvider";
import { useMeData } from "../../utils/userQueries";
import { client } from "../..";

const LogoutButton = styled(Button)`
    background-color: ${COLORS.red};
    color: ${COLORS.white};
`;

function LogOut() {
    const { logOutAndResetToken } = useAuth();
    const [logout] = useLogoutMutation();

    const { me } = useMeData();

    return (
        <>
            <Head title="Log out | Zenith" description="Log out from Zenith." />
            <AuthLayout
                children={
                    <AuthForm>
                        <AuthFormTitle>Log out</AuthFormTitle>
                        <PageTextMB24>
                            Do you really want to disconnect from{" "}
                            <b>{me ? `@${me.username}` : "this account"}</b>?
                        </PageTextMB24>
                        <PageBlock>
                            <LogoutButton
                                type="button"
                                title="Log out"
                                role="button"
                                aria-label="Log out"
                                onClick={async () => {
                                    await logout();

                                    logOutAndResetToken();

                                    await client.resetStore();
                                }}
                            >
                                Log out
                            </LogoutButton>
                        </PageBlock>
                    </AuthForm>
                }
            />
        </>
    );
}

export default LogOut;
