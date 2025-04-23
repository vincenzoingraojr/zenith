import styled from "styled-components";
import Head from "../components/Head";
import AuthLayout from "../components/layouts/AuthLayout";
import Preloader from "../components/utils/Preloader";
import { useLogoutMutation } from "../generated/graphql";
import { AuthForm, AuthFormTitle, Button, PageBlock, PageTextMB24 } from "../styles/global";
import { COLORS } from "../styles/colors";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

const LogoutButton = styled(Button)`
    background-color: ${COLORS.red};
    color: ${COLORS.white};
`;

function LogOut() {
    const { user, logOutAndResetToken } = useAuth();
    const [logout, { client }] = useLogoutMutation();
    const navigate = useNavigate();

    if (!user) {
        return <Preloader />;
    }

    return (
        <>
            <Head title="Log out | Zenith" description="Log out from Zenith." />
            <AuthLayout
                children={
                    <AuthForm>
                        <AuthFormTitle>Log out</AuthFormTitle>
                        <PageTextMB24>
                            Do you really want to disconnect from{" "}<b>@{user.username}</b>?
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
                                    
                                    navigate(0);
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