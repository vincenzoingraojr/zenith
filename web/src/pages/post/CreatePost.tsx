import { Link, useParams } from "react-router-dom";
import LumenInput from "../../components/input/lumen/LumenInput";
import { useFindPost } from "../../utils/postQueries";
import styled from "styled-components";
import { LumenModalContainer, PageBlock, PageText } from "../../styles/global";
import QuotedPost from "../../components/layouts/items/post/QuotedPost";
import { Post } from "../../generated/graphql";
import ModalLoading from "../../components/layouts/modal/ModalLoading";
import ErrorOrItemNotFound from "../../components/utils/ErrorOrItemNotFound";
import { ERROR_SOMETHING_WENT_WRONG } from "../../utils/constants";

const CreatePostContentContaiener = styled(PageBlock)`
    padding-left: 16px;
    padding-right: 16px;
`;

function CreatePost() {
    const params = useParams();

    const { post, loading, error } = useFindPost(
        params.itemIdOrLocation as string
    );

    return (
        <LumenModalContainer>
            {loading ? (
                <ModalLoading />
            ) : (
                <>
                    {error ? (
                        <ErrorOrItemNotFound
                            isError={true}
                            title={ERROR_SOMETHING_WENT_WRONG.title}
                            content={ERROR_SOMETHING_WENT_WRONG.message}
                        />
                    ) : (
                        <>
                            {post && (
                                <CreatePostContentContaiener>
                                    {params.operation === "quote" && (
                                        <QuotedPost
                                            post={post as Post}
                                            origin="create-post"
                                        />
                                    )}
                                    {params.operation === "reply" && (
                                        <PageText>
                                            Replying to{" "}
                                            <Link
                                                to={`/${post.author.username}`}
                                                title={post.author.name}
                                                aria-label={post.author.name}
                                            >
                                                @{post.author.username}
                                            </Link>
                                        </PageText>
                                    )}
                                </CreatePostContentContaiener>
                            )}
                            <LumenInput
                                type={
                                    params.operation === "reply"
                                        ? "comment"
                                        : "post"
                                }
                                placeholder="What's on your mind?"
                                buttonText={
                                    params.operation === "reply"
                                        ? "Reply"
                                        : "Post"
                                }
                                isReplyToId={
                                    params.operation === "reply" && post
                                        ? post.id
                                        : undefined
                                }
                                isReplyToType={
                                    params.operation === "reply"
                                        ? params.itemType
                                        : undefined
                                }
                                quotedPostId={
                                    params.operation === "quote" && post
                                        ? post.id
                                        : undefined
                                }
                                closingOnSubmit={true}
                            />
                        </>
                    )}
                </>
            )}
        </LumenModalContainer>
    );
}

export default CreatePost;
