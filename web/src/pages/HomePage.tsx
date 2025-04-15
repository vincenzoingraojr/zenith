import styled from "styled-components";
import Head from "../components/Head";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { Button, PageBlock, PageText } from "../styles/global";
import { COLORS } from "../styles/colors";
import { setAccessToken } from "../utils/token";
import { useNavigate } from "react-router-dom";
import Preloader from "../components/utils/Preloader";

const LogoutButton = styled(Button)`
    background-color: ${COLORS.red};
    color: ${COLORS.white};
`;

function HomePage() {
    const { data, loading, error } = useMeQuery({
        fetchPolicy: "cache-and-network",
    });

    const navigate = useNavigate();

    const [logout, { client }] = useLogoutMutation();

    if (loading || !data || !data.me) {
        return <Preloader />;
    }

    return (
        <>
            <Head
                title="Home | Zenith"
                description="Zenith, the everything app."
            />
            <PageText>
                City of Stars, are you shining just for me?
                <br />
                City of Stars, there's so much that I can't see.
                <br />
                Who knows? I felt it from the first embrace I shared with you.
                <br />
                That now our dreams, they've finally come true.
            </PageText>
            <PageText>
                {loading ? "Loading..." : error ? error.message : `@${data?.me?.username}`}
            </PageText>
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
    );
}

export default HomePage;