import styled from "styled-components";
import Head from "../components/Head";
import LumenInput from "../components/input/lumen/LumenInput";
import PageLayout from "../components/layouts/PageLayout";
import PageContentLayout from "../components/layouts/sublayouts/PageContentLayout";
import { Post, usePostFeedQuery } from "../generated/graphql";
import LoadingComponent from "../components/utils/LoadingComponent";
import {
    EndContainer,
    FeedLoading,
    FullWidthFeedContainer,
    NoElementsAlert,
    PageBlock,
} from "../styles/global";
import ErrorOrItemNotFound from "../components/utils/ErrorOrItemNotFound";
import PostComponent from "../components/layouts/items/post/PostComponent";
import { ERROR_SOMETHING_WENT_WRONG } from "../utils/constants";
import { useCallback, useEffect, useRef, useState } from "react";

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

    const [isLoading, setIsLoading] = useState(false);

    const endContainerRef = useRef<HTMLDivElement | null>(null);

    const loadMore = useCallback(() => {
        if (!data || (data && !data.postFeed.hasMore)) return;

        const lastPost = data.postFeed.posts[data.postFeed.posts.length - 1];

        setIsLoading(true);

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
            .then(() => {
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [data, fetchMore]);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.5,
        };

        const observer = new IntersectionObserver((entries) => {
            const target = entries[0];
            if (target.isIntersecting) {
                loadMore();
            }
        }, options);

        const current = endContainerRef.current;

        if (current) {
            observer.observe(current);
        }

        return () => {
            if (current) {
                observer.unobserve(current);
            }
        };
    }, [loadMore, endContainerRef]);

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
                                    {loading && !data ? (
                                        <FeedLoading>
                                            <LoadingComponent />
                                        </FeedLoading>
                                    ) : (
                                        <>
                                            {data && !error ? (
                                                <>
                                                    {data.postFeed
                                                        .totalCount === 0 ? (
                                                        <NoElementsAlert>
                                                            No one has published
                                                            a post yet.
                                                        </NoElementsAlert>
                                                    ) : (
                                                        <>
                                                            {data.postFeed.posts.map(
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
                                                            {isLoading ? (
                                                                <FeedLoading>
                                                                    <LoadingComponent />
                                                                </FeedLoading>
                                                            ) : (
                                                                <PageBlock
                                                                    ref={
                                                                        endContainerRef
                                                                    }
                                                                >
                                                                    <EndContainer>
                                                                        ⋅
                                                                    </EndContainer>
                                                                </PageBlock>
                                                            )}
                                                        </>
                                                    )}
                                                </>
                                            ) : (
                                                <ErrorOrItemNotFound
                                                    isError={true}
                                                    title={
                                                        ERROR_SOMETHING_WENT_WRONG.title
                                                    }
                                                    content={
                                                        ERROR_SOMETHING_WENT_WRONG.message
                                                    }
                                                />
                                            )}
                                        </>
                                    )}
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
