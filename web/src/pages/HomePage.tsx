import styled from "styled-components";
import Head from "../components/Head";
import LumenInput from "../components/input/lumen/LumenInput";
import PageLayout from "../components/layouts/PageLayout";
import PageContentLayout from "../components/layouts/sublayouts/PageContentLayout";
import { Post, usePostFeedQuery } from "../generated/graphql";
import LoadingComponent from "../components/utils/LoadingComponent";
import { FeedLoading, NoElementsAlert } from "../styles/global";
import ErrorOrItemNotFound from "../components/utils/ErrorOrItemNotFound";
import PostComponent from "../components/layouts/items/post/PostComponent";

const HomePageContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 24px;
`;

const PostFeedContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

function HomePage() {
    const { data, loading, error } = usePostFeedQuery({
        fetchPolicy: "cache-and-network",
    });

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
                                <PostFeedContainer>
                                    {loading ? (
                                        <FeedLoading>
                                            <LoadingComponent />
                                        </FeedLoading>
                                    ) : (
                                        <>
                                            {data && data.postFeed && !error ? (
                                                <>
                                                    {data.postFeed.length ===
                                                    0 ? (
                                                        <NoElementsAlert>
                                                            No one has published a
                                                            post yet.
                                                        </NoElementsAlert>
                                                    ) : (
                                                        <>
                                                            {data.postFeed.map(
                                                                (post) => (
                                                                    <PostComponent 
                                                                        key={post.itemId}
                                                                        post={post as Post}
                                                                        origin="post-feed"
                                                                    />
                                                                )
                                                            )}
                                                        </>
                                                    )}
                                                </>
                                            ) : (
                                                <ErrorOrItemNotFound
                                                    isError={true}
                                                    title="Something went wrong"
                                                    content="An error has occurred. Try to refresh the page."
                                                />
                                            )}
                                        </>

                                    )}
                                </PostFeedContainer>
                            </HomePageContainer>
                        }
                    />
                }
            />
        </>
    );
}

export default HomePage;