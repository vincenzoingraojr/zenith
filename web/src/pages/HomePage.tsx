import styled from "styled-components";
import Head from "../components/Head";
import LumenInput from "../components/input/lumen/LumenInput";
import PageLayout from "../components/layouts/PageLayout";
import PageContentLayout from "../components/layouts/sublayouts/PageContentLayout";
import { usePostFeedQuery } from "../generated/graphql";

const HomePageContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 24px;
`;

function HomePage() {
    const { data: postFeedData } = usePostFeedQuery({
        fetchPolicy: "cache-and-network",
    });

    console.log(postFeedData);

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
                        type="home"
                        children={
                            <HomePageContainer>
                                <LumenInput
                                    type="post"
                                    placeholder="What's happening right now?"
                                    buttonText="Publish"
                                />
                            </HomePageContainer>
                        }
                    />
                }
            />
        </>
    );
}

export default HomePage;