import styled from "styled-components";
import Head from "../components/Head";
import { useLogoutMutation } from "../generated/graphql";
import { Button, PageBlock, PageTextMB24 } from "../styles/global";
import { COLORS } from "../styles/colors";
import { setAccessToken } from "../utils/token";
import { useNavigate } from "react-router-dom";
import Preloader from "../components/utils/Preloader";
import PageLayout from "../components/layouts/PageLayout";
import { useMeData } from "../utils/useMeData";
import PageContentLayout from "../components/layouts/sublayouts/PageContentLayout";

const LogoutButton = styled(Button)`
    background-color: ${COLORS.red};
    color: ${COLORS.white};
`;

function HomePage() {
    const { me, loading, error } = useMeData();

    const navigate = useNavigate();

    const [logout, { client }] = useLogoutMutation();

    if (!me || loading) {
        return <Preloader />;
    }

    return (
        <>
            <Head
                title="Home | Zenith"
                description="Zenith, the everything app."
            />
            <PageLayout 
                children={
                    <PageContentLayout 
                        title="Home"
                        type="main"
                        children={
                            <>
                                <PageTextMB24>
                                    City of Stars, are you shining just for me?
                                    <br />
                                    City of Stars, there's so much that I can't see.
                                    <br />
                                    Who knows? I felt it from the first embrace I shared with you.
                                    <br />
                                    That now our dreams, they've finally come true.
                                </PageTextMB24>
                                <PageTextMB24>
                                    {loading ? "Loading..." : error ? error.message : `@${me.username}`}
                                </PageTextMB24>
                                <PageBlock>
                                    <LogoutButton
                                        type="button"
                                        title="Log out"
                                        role="button"
                                        aria-label="Log out"
                                        onClick={async () => {
                                            await logout();

                                            setAccessToken("");
                                            
                                            await client.resetStore();
                                            
                                            navigate(0);
                                        }}
                                    >
                                        Log out
                                    </LogoutButton>
                                </PageBlock>
                            </>
                        }
                    />
                }
            />
        </>
    );
}

export default HomePage;