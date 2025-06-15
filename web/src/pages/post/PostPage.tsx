import { useParams } from "react-router-dom";
import Head from "../../components/Head";
import { useFindPost } from "../../utils/postQueries";
import { truncateString } from "../../utils/truncateString";
import PageLayout from "../../components/layouts/PageLayout";
import PageContentLayout from "../../components/layouts/sublayouts/PageContentLayout";
import LoadingComponent from "../../components/utils/LoadingComponent";
import ErrorOrItemNotFound from "../../components/utils/ErrorOrItemNotFound";
import { ERROR_SOMETHING_WENT_WRONG } from "../../utils/constants";
import styled from "styled-components";

const PostPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

function PostPage() {
    const params = useParams();

    const { post, loading, error } = useFindPost(params.itemId as string);

    return (
        <>
            <Head
                title={
                    loading
                        ? "Loading... | Zenith"
                        : post
                        ? `@${post.author.username} on Zenith: ${truncateString(
                              post.content,
                              60
                          )} | Zenith`
                        : "Post not found | Zenith"
                }
                description={
                    loading
                        ? "Content not ready. Loading..."
                        : post
                        ? `${post.author.name} on Zenith: ${post.content} | Zenith`
                        : "Post not found."
                }
                image={
                    post && post.author.profile.profilePicture.length > 0
                        ? post.author.profile.profilePicture
                        : undefined
                }
            />
            <PageLayout
                children={
                    <PageContentLayout
                        title="Post"
                        type="default"
                        children={
                            <>
                                {loading ? (
                                    <LoadingComponent />
                                ) : (
                                    <>
                                        {error ? (
                                            <ErrorOrItemNotFound
                                                isError={true}
                                                title={ERROR_SOMETHING_WENT_WRONG.title}
                                                content={ERROR_SOMETHING_WENT_WRONG.message}
                                            />
                                        ) : !post ? (
                                            <ErrorOrItemNotFound
                                                isError={false}
                                                title="Post not found"
                                                content="The post you are looking for does not exist."
                                            />
                                        ) : (
                                            <PostPageContainer>
                                                {post.content}
                                            </PostPageContainer>
                                        )}
                                    </>
                                )}
                            </>
                        }
                    />
                }
            />
        </>
    );
}

export default PostPage;
