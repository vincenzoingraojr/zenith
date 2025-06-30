import Head from "../components/Head";
import LumenInput from "../components/input/lumen/LumenInput";
import PageLayout from "../components/layouts/PageLayout";
import PageContentLayout from "../components/layouts/sublayouts/PageContentLayout";
import { Post, usePostFeedQuery } from "../generated/graphql";
import { FeedWithLumenInput, FullWidthFeedContainer } from "../styles/global";
import PostComponent from "../components/layouts/items/post/PostComponent";
import { useCallback, useMemo } from "react";
import FeedComponent from "../components/utils/FeedComponent";

function HomePage() {
    const limit = 3;

    const { data, loading, error, fetchMore } = usePostFeedQuery({
        fetchPolicy: "cache-and-network",
        variables: {
            limit,
            cursor: null,
        },
        notifyOnNetworkStatusChange: true,
    });

    const loadMore = useCallback(() => {
        if (!data || (data && !data.postFeed.hasMore) || loading) return;

        const lastPost = data.postFeed.posts[data.postFeed.posts.length - 1];

        fetchMore({
            variables: { limit, cursor: lastPost.createdAt },
        }).catch((error) => {
            console.error(error);
        });
    }, [data, fetchMore, loading]);

    const feedContent = useMemo(
        () => (
            <>
                {data?.postFeed.posts.map((post) => (
                    <PostComponent
                        key={post.itemId}
                        post={post as Post}
                        origin="post-feed"
                    />
                ))}
            </>
        ),
        [data?.postFeed.posts]
    );

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
                            <FeedWithLumenInput>
                                <LumenInput
                                    type="post"
                                    placeholder="What's happening right now?"
                                    buttonText="Create"
                                />
                                <FullWidthFeedContainer>
                                    <FeedComponent
                                        key="home"
                                        feedContent={feedContent}
                                        loading={loading}
                                        error={error}
                                        loadMore={loadMore}
                                        noElementsText="No one has published a post yet."
                                        isFeedEmpty={
                                            data?.postFeed.totalCount === 0
                                        }
                                    />
                                </FullWidthFeedContainer>
                            </FeedWithLumenInput>
                        }
                    />
                }
            />
        </>
    );
}

export default HomePage;
