import { FunctionComponent, useState } from "react";
import { Post } from "../../../../generated/graphql";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ControlContainer, PageBlock, PageText } from "../../../../styles/global";
import profilePicture from "../../../../images/profile-picture.png";
import TextContainerRender from "../../../utils/TextContainerRender";
import { USER_TYPES } from "../../../../utils/constants";
import Like from "../../../icons/Like";
import { formatter } from "../../../../utils/formatter";
import { COLORS } from "../../../../styles/colors";
import Share from "../../../icons/Share";
import Views from "../../../icons/Views";
import Options, { OptionItem, OptionItemIcon, OptionItemText } from "../../../Options";
import More from "../../../icons/More";
import { useOptions } from "../../../utils/hooks";
import Flag from "../../../icons/Flag";
import Comment from "../../../icons/Comment";
import { processDate } from "../../../../utils/processDate";
import Pen from "../../../icons/Pen";
import { useMeData } from "../../../../utils/userQueries";
import Bin from "../../../icons/Bin";
import FollowIcon from "../../../icons/FollowIcon";

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
        background-color: ${({ theme }) => theme.overlayGrey};
    }
`;

const PostHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding-top: 16px;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 16px;
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

const PostRightContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;
`;

const PostDate = styled(PageText)`
    font-size: 14px;
    color: ${({ theme }) => theme.inputText};
    white-space: nowrap;
    text-decoration: none;
    cursor: pointer;

    &:hover,
    &:focus {
        text-decoration: underline;
    }
`;

const PostContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-top: 12px;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 12px;
`;

const PostTextContainer = styled.div`
    display: block;
    font-size: 22px;
`;

const PostMediaContainer = styled.div`
    display: flex;
`;

const PostMediaItem = styled.div`
    display: flex;
`;

const PostActionsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding-top: 12px;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 12px;
`;

const PostActionContainer = styled.div.attrs((props: { color?: string, isActive: boolean }) => props)`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    color: ${props => props.isActive ? props.color || COLORS.blue : "inherit"};

    &:hover, &:focus {
        color: ${props => props.color || COLORS.blue};
    }

    &:hover div div svg, &:focus div div svg {
        fill: ${props => props.color || COLORS.blue};
    }
`;

const PostActionIcon = styled(ControlContainer)`
    ${PostActionContainer}:hover &, ${PostActionContainer}:focus & {
        background-color: ${({ theme }) => theme.overlayGrey};
    }
`;

const PostActionInfo = styled(PageText)`
    font-size: 16px;
    color: inherit;
`;

const PostComponent: FunctionComponent<PostComponentProps> = ({ post, showReplying, origin }) => {
    const navigate = useNavigate();
    const [like, setLike] = useState(false);
    const [follow, setFollow] = useState(false);

    const { activeOptions, handleOptionsClick } = useOptions();

    const date = processDate(post.createdAt, true, true);

    const createdAt = new Date(parseInt(post.createdAt)).toLocaleString(
        "en-us",
        {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }
    );

    const { me } = useMeData();

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
                    <PostRightContainer>
                        <PostDate title={createdAt} aria-label={createdAt}>
                            <time
                                dateTime={createdAt}
                            >
                                {date}
                            </time>
                        </PostDate>
                        {!post.isEdited && (
                            <PageBlock
                                role="button"
                                title="Edited post"
                                aria-label="Edited post"
                            >
                                <Pen color={COLORS.blue} />
                            </PageBlock>
                        )}
                        <Options
                            key={post.id}
                            title="Post options" 
                            icon={<More />}
                            isOpen={activeOptions === post.id}
                            toggleOptions={() =>
                                handleOptionsClick(post.id)
                            }
                            children={
                                <>
                                    <OptionItem>
                                        <OptionItemIcon>
                                            <Flag />
                                        </OptionItemIcon>
                                        <OptionItemText>
                                            Report this post
                                        </OptionItemText>
                                    </OptionItem>
                                    {me && (
                                        <>
                                            {post.authorId === me.id ? (
                                                <>
                                                    <OptionItem>
                                                        <OptionItemIcon>
                                                            <Pen />
                                                        </OptionItemIcon>
                                                        <OptionItemText>
                                                            Edit this post
                                                        </OptionItemText>
                                                    </OptionItem>
                                                    <OptionItem>
                                                        <OptionItemIcon>
                                                            <Bin color={COLORS.red} />
                                                        </OptionItemIcon>
                                                        <OptionItemText isRed={true}>
                                                            Delete this post
                                                        </OptionItemText>
                                                    </OptionItem>
                                                </>
                                            ) : (
                                                <>
                                                    <OptionItem
                                                        role="button"
                                                        title="Follow this user"
                                                        aria-label="Follow this user"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setFollow(!follow);
                                                        }}
                                                    >
                                                        <OptionItemIcon>
                                                            <FollowIcon isActive={follow} />
                                                        </OptionItemIcon>
                                                        <OptionItemText>
                                                            {follow ? "Unfollow" : "Follow"} @{post.author.username}
                                                        </OptionItemText>
                                                    </OptionItem>
                                                </>
                                            )}
                                        </>
                                    )}
                                </>
                            }
                        />
                    </PostRightContainer>
                </PostHeader>
                <PostContentContainer>
                    <PostTextContainer>
                        <TextContainerRender content={post.content} />
                    </PostTextContainer>
                    {post.media && post.media.length > 0 && (
                        <PostMediaContainer>
                            {post.media.map((media) => (
                                <PostMediaItem>

                                </PostMediaItem>
                            ))}
                        </PostMediaContainer>
                    )}
                </PostContentContainer>
                <PostActionsContainer>
                    <PostActionContainer
                        role="button"
                        aria-label={"Like this post"}
                        title={"Like this post"}
                        color={COLORS.red}
                        onClick={(e) => {
                            e.stopPropagation();
                            setLike(!like);
                        }}
                        isActive={like}
                    >
                        <PostActionIcon>
                            <Like isActive={like} />
                        </PostActionIcon>
                        <PostActionInfo>
                            {formatter.format(1200)}
                        </PostActionInfo>
                    </PostActionContainer>
                    <PostActionContainer
                        role="button"
                        aria-label={"Comment this post"}
                        title={"Comment this post"}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <PostActionIcon>
                            <Comment />
                        </PostActionIcon>
                        <PostActionInfo>
                            {formatter.format(1700)}
                        </PostActionInfo>
                    </PostActionContainer>
                    <PostActionContainer
                        role="button"
                        aria-label={"Post views"}
                        title={"Post views"}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <PostActionIcon>
                            <Views />
                        </PostActionIcon>
                        <PostActionInfo>
                            {formatter.format(10000)}
                        </PostActionInfo>
                    </PostActionContainer>
                    <PostActionContainer
                        role="button"
                        aria-label={"Share this post"}
                        title={"Share this post"}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <PostActionIcon>
                            <Share />
                        </PostActionIcon>
                    </PostActionContainer>
                </PostActionsContainer>
            </PostContainer>
        </PostWrapper>
    );
}

export default PostComponent;