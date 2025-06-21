import { useParams } from "react-router-dom";
import Modal from "../../components/layouts/modal/Modal";
import { useFindPost, useReposts } from "../../utils/postQueries";
import ModalLoading from "../../components/layouts/modal/ModalLoading";
import ErrorOrItemNotFound from "../../components/utils/ErrorOrItemNotFound";
import { ERROR_SOMETHING_WENT_WRONG } from "../../utils/constants";
import {
    FullWidthFeedContainer,
    ModalFeedContainer,
} from "../../styles/global";
import FeedComponent from "../../components/utils/FeedComponent";
import { useCallback, useMemo } from "react";
import Head from "../../components/Head";
import UserComponent from "../../components/layouts/items/user/UserComponent";

function Reposts() {
    const params = useParams();

    const { post, loading, error } = useFindPost(
        params.itemId as string,
        params.username as string
    );

    const {
        userReposts,
        loading: repostsLoading,
        error: repostsError,
        fetchMore,
    } = useReposts(post?.id);

    const loadMore = useCallback(() => {
        if (
            !userReposts ||
            (userReposts && !userReposts.hasMore) ||
            repostsLoading
        )
            return;

        const lastRepost = userReposts.reposts[userReposts.reposts.length - 1];

        fetchMore({
            variables: {
                postId: post?.id,
                limit: 3,
                cursor: lastRepost.createdAt,
            },
        }).catch((error) => {
            console.error(error);
        });
    }, [userReposts, fetchMore, repostsLoading, post?.id]);

    const origin = "reposts";

    const feedContent = useMemo(
        () => (
            <>
                {userReposts?.reposts.map((repost) => (
                    <UserComponent
                        key={repost.id}
                        id={repost.authorId}
                        origin={origin}
                    />
                ))}
            </>
        ),
        [userReposts?.reposts]
    );

    return (
        <>
            <Head
                title={
                    loading
                        ? "Loading... | Zenith"
                        : post
                        ? `See who reposted @${post.author.username}'s ${post.type} | Zenith`
                        : "Likes not found | Zenith"
                }
                description={
                    loading
                        ? "Content not ready. Loading..."
                        : post
                        ? `See who reposted ${post.author.name}'s ${post.type}.`
                        : "Post not found."
                }
            />
            <Modal
                headerText="Reposts"
                isBack={true}
                children={
                    <>
                        {loading ? (
                            <ModalLoading />
                        ) : (
                            <ModalFeedContainer>
                                {error ? (
                                    <ErrorOrItemNotFound
                                        isError={true}
                                        title={ERROR_SOMETHING_WENT_WRONG.title}
                                        content={
                                            ERROR_SOMETHING_WENT_WRONG.message
                                        }
                                    />
                                ) : !post ? (
                                    <ErrorOrItemNotFound
                                        isError={false}
                                        title="Post not found"
                                        content="The post you're looking for doesn't exist — just like the reposts."
                                    />
                                ) : (
                                    <FullWidthFeedContainer>
                                        <FeedComponent
                                            key={origin}
                                            feedContent={feedContent}
                                            loading={repostsLoading}
                                            error={repostsError}
                                            loadMore={loadMore}
                                            noElementsText="No one has reposted this post yet."
                                            isFeedEmpty={
                                                userReposts?.totalCount === 0
                                            }
                                        />
                                    </FullWidthFeedContainer>
                                )}
                            </ModalFeedContainer>
                        )}
                    </>
                }
            />
        </>
    );
}

export default Reposts;
