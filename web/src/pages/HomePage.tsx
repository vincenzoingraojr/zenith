import styled from "styled-components";
import Head from "../components/Head";
import LumenInput from "../components/input/lumen/LumenInput";
import PageLayout from "../components/layouts/PageLayout";
import PageContentLayout from "../components/layouts/sublayouts/PageContentLayout";
import { Post, usePostFeedQuery } from "../generated/graphql";
import {
    FullWidthFeedContainer,
} from "../styles/global";
import PostComponent from "../components/layouts/items/post/PostComponent";
import { useCallback, useMemo } from "react";
import FeedComponent from "../components/utils/FeedComponent";

const HomePageContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 24px;
`;

function HomePage() {
    const limit = 3;

    const { data, loading, error, fetchMore } = usePostFeedQuery({
        fetchPolicy: "cache-first",
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
            updateQuery: (prev, { fetchMoreResult }) => {
                if (
                    !fetchMoreResult ||
                    fetchMoreResult.postFeed.posts.length === 0
                )
                    return prev;

                return {
                    postFeed: {
                        __typename: prev.postFeed.__typename,
                        posts: [...fetchMoreResult.postFeed.posts],
                        hasMore: fetchMoreResult.postFeed.hasMore,
                        totalCount: prev.postFeed.totalCount,
                    },
                };
            },
        })
        .catch((error) => {
            console.error(error);
        });
    }, [data, fetchMore, loading]);

    const feedContent = useMemo(() => (
        <>
            {data?.postFeed.posts.map(
                (post) => (
                    <PostComponent
                        key={
                            post.itemId
                        }
                        post={
                            post as Post
                        }
                        origin="post-feed"
                    />
                )
            )}
        </>
    ), [data?.postFeed.posts]);

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
                                        isFeedEmpty={data?.postFeed.totalCount === 0}
                                    />
                                </FullWidthFeedContainer>
                            </HomePageContainer>
                        }
                    />
                }
            />
        </>
    );
}

export default HomePage;
