import { Link, useParams } from "react-router-dom";
import LumenInput from "../../components/input/lumen/LumenInput";
import { useFindPost } from "../../utils/postQueries";
import styled from "styled-components";
import { PageBlock, PageText } from "../../styles/global";
import QuotedPost from "../../components/layouts/items/post/QuotedPost";
import { Post } from "../../generated/graphql";

const CreatePostContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-left: 8px;
    padding-right: 8px;
    padding-bottom: 36px;
`;

const CreatePostContentContaiener = styled(PageBlock)`
    padding-left: 16px;
    padding-right: 16px;
`;

function CreatePost() {
    const params = useParams();

    const { post } = useFindPost(params.itemId as string);

    return (
        <CreatePostContainer>
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
                            Replying to <Link to={`/${post.author.username}`} title={post.author.name} aria-label={post.author.name}>@{post.author.username}</Link>
                        </PageText>
                    )}
                </CreatePostContentContaiener>
            )}
            <LumenInput 
                type={params.operation === "reply" ? "comment" : "post"}
                placeholder="What's on your mind?"
                buttonText={params.operation === "reply" ? "Reply" : "Post"}
                isReplyToId={(params.operation === "reply" && post) ? post.id : undefined}
                isReplyToType={params.operation === "reply" ? params.itemType : undefined}
                quotedPostId={(params.operation === "quote" && post) ? post.id : undefined}
                closingOnSubmit={true}
            />
        </CreatePostContainer>
    );
}

export default CreatePost;