import { FunctionComponent } from "react";
import { Post } from "../../../../generated/graphql";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ControlContainer, PageText } from "../../../../styles/global";
import profilePicture from "../../../../images/profile-picture.png";
import TextContainerRender from "../../../utils/TextContainerRender";
import { USER_TYPES } from "../../../../utils/constants";
import Like from "../../../icons/Like";
import { formatter } from "../../../../utils/formatter";
import { COLORS } from "../../../../styles/colors";

interface PostComponentProps {
    post: Post;
    showReplying?: boolean;
    origin: string;
}

const PostWrapper = styled.div`
    display: block;
    border-top: unset;
    border-bottom: 1px solid ${({ theme }) => theme.inputText};

    &:first-child {
        border-top: 1px solid ${({ theme }) => theme.inputText};
    }
`;

const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: transparent;
    transition: 0.2s background-color ease;
    cursor: pointer;

    &:hover,
    &:focus {
        background-color: ${({ theme }) => theme.opaqueGrey};
    }
`;

const PostHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding-top: 12px;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 12px;
    width: 100%;
    overflow: hidden;
`;

const PostAuthorContainer = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
    width: 100%;
    overflow: hidden;
    cursor: pointer;
    text-decoration: none;

    &:hover,
    &:active {
        text-decoration: none;
    }
`;

const AuthorImageContainer = styled.div.attrs((props: { type: string }) => props)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: ${(props) => (props.type === USER_TYPES.ORGANIZATION ? "5px" : "20px")};

    img {
        width: inherit;
        height: inherit;
        border-radius: inherit;
    }
`;

const AuthorInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
    overflow: hidden;
`;

const AuthorFullName = styled(PageText)`
    font-weight: 700;
    font-size: 16px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-decoration: none;
    color: ${({ theme }) => theme.color};

    &:hover,
    &:active {
        text-decoration: underline;
        text-decoration-color: ${({ theme }) => theme.color};
    }
`;

const AuthorUsername = styled(PageText)`
    font-size: 14px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: ${({ theme }) => theme.inputText};
`;

const PostContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 6px;
    padding-bottom: 6px;
    gap: 12px;
`;

const PostTextContainer = styled.div`
    display: block;
    padding-left: 16px;
    padding-right: 16px;
    font-size: 20px;
`;

const PostActionsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding-top: 6px;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 6px;
`;

const PostActionContainer = styled.div.attrs((props: { color: string }) => props)`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    color: inherit;

    &:hover, &:focus {
        color: ${props => props.color};
    }

    &:hover div div svg, &:focus div div svg {
        fill: ${props => props.color};
    }
`;

const PostActionInfo = styled(PageText)`
    font-size: 16px;
    color: inherit;
`;

const PostComponent: FunctionComponent<PostComponentProps> = ({ post, showReplying, origin }) => {
    const navigate = useNavigate();

    return (
        <PostWrapper>
            <PostContainer
                role="link"
                onClick={(e: any) => {
                    if (
                        e.target.tagName === "A" &&
                        e.target.getAttribute("target") === "_blank"
                    ) {
                        e.stopPropagation();
                    } else {
                        navigate(
                            `/${post.author.username}/post/${post.itemId}`
                        );
                    }
                }}
            >
                <PostHeader>
                    <PostAuthorContainer
                        role="link"
                        aria-label={`${post.author.name}'s profile`}
                        title={`${post.author.name}'s profile`}
                        to={`/${post.author.username}`}
                        onClick={(e) => e.stopPropagation()}
                        type={post.author.type}
                    >
                        <AuthorImageContainer>
                            <img
                                src={
                                    post.author.profile.profilePicture.length > 0
                                        ? post.author.profile.profilePicture
                                        : profilePicture
                                }
                                title={`${post.author.name}'s profile picture`}
                                alt={post.author.name}
                            />
                        </AuthorImageContainer>
                        <AuthorInfo>
                            <AuthorFullName>
                                {post.author.name}
                            </AuthorFullName>
                            <AuthorUsername>
                                @{post.author.username}
                            </AuthorUsername>
                        </AuthorInfo>
                    </PostAuthorContainer>
                </PostHeader>
                <PostContentContainer>
                    <PostTextContainer>
                        <TextContainerRender content={post.content} />
                    </PostTextContainer>
                </PostContentContainer>
                <PostActionsContainer>
                    <PostActionContainer
                        role="button"
                        aria-label={"Like this post"}
                        title={"Like this post"}
                        color={COLORS.red}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <ControlContainer>
                            <Like isActive={false} />
                        </ControlContainer>
                        <PostActionInfo>
                            {formatter.format(1200)}
                        </PostActionInfo>
                    </PostActionContainer>
                </PostActionsContainer>
            </PostContainer>
        </PostWrapper>
    );
}

export default PostComponent;