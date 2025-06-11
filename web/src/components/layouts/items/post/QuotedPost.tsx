import { FunctionComponent, useMemo } from "react";
import { Post } from "../../../../generated/graphql";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { PageBlock, PageText } from "../../../../styles/global";
import { AuthorFullNameContainer, AuthorImageContainer, AuthorInfo, AuthorUsername, PostDate, PostMediaItem, PostRightContainer } from "./PostComponent";
import VerificationBadge from "../../../utils/VerificationBadge";
import profilePicture from "../../../../images/profile-picture.png";
import Pen from "../../../icons/Pen";
import { getDateToLocaleString, processDate } from "../../../../utils/processDate";
import { COLORS } from "../../../../styles/colors";
import AffiliationIcon from "../../../utils/AffiliationIcon";

interface QuotedPostProps {
    post: Post;
    origin: "create-post" | "feed";
}

const QuotedPostWrapper = styled.div`
    display: block;
    border: 1px solid ${({ theme }) => theme.inputText};
    border-radius: 12px;
`;

const QuotedPostContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.background};
    transition: 0.2s background-color ease;
    border-radius: inherit;
    cursor: pointer;

    &:hover, &:focus {
        background-color: ${({ theme }) => theme.overlayGrey};
    }
`;

const QuotedPostHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px;
    width: 100%;
    overflow: hidden;
`;

const QuotedPostAuthorContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
    width: auto;
    overflow: hidden;
`;

const QuotedAuthorFullName = styled(PageText)`
    font-weight: 700;
    font-size: 16px;
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: ${({ theme }) => theme.color};
`;

const QuotedPostContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-top: 10px;
    padding-left: 12px;
    padding-right: 12px;
    padding-bottom: 12px;
`;

const QuotedPostTextContainer = styled.div`
    display: block;
    font-size: 20px;
`;

const QuotedPostMediaContainer = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;

    &:has(div:nth-child(3):last-child) div:nth-child(3), &:has(div:nth-child(1):only-child) div:nth-child(1) {
        grid-column: span 2;
    }
`;

const QuotedPost: FunctionComponent<QuotedPostProps> = ({ post, origin }) => {
    const navigate = useNavigate();

    const date = useMemo(() => processDate(post.createdAt, true, true), [post.createdAt]);
    
    const createdAt = useMemo(() => getDateToLocaleString(post.createdAt), [post.createdAt]);

    return (
        <QuotedPostWrapper>
            <QuotedPostContainer
                role="link"
                onClick={(e) => {
                    e.stopPropagation();
                    
                    if (origin === "feed") {
                        navigate(
                            `/${post.author.username}/post/${post.itemId}`
                        );
                    }
                }}
            >
                <QuotedPostHeader>
                    <QuotedPostAuthorContainer>
                        <AuthorImageContainer type={post.author.type}>
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
                            <AuthorFullNameContainer>
                                <QuotedAuthorFullName>
                                    {post.author.name}
                                </QuotedAuthorFullName>
                                {post.author.verification.verified === "VERIFIED" && (
                                    <VerificationBadge
                                        type={post.author.type}
                                        verifiedSince={post.author.verification.verifiedSince ? new Date(parseInt(post.author.verification.verifiedSince)).toLocaleString("en-us", { month: "long", year: "numeric" }) : undefined}
                                        size={18}
                                    />
                                )}
                                <AffiliationIcon userId={post.authorId} size={18} />
                            </AuthorFullNameContainer>
                            <AuthorUsername>
                                @{post.author.username}
                            </AuthorUsername>
                        </AuthorInfo>
                    </QuotedPostAuthorContainer>
                    <PostRightContainer>
                        <PostDate title={createdAt} aria-label={createdAt}>
                            <time
                                dateTime={createdAt}
                            >
                                {date}
                            </time>
                        </PostDate>
                        {post.isEdited && (
                            <PageBlock
                                role="button"
                                title="Edited post"
                                aria-label="Edited post"
                            >
                                <Pen color={COLORS.blue} />
                            </PageBlock>
                        )}
                    </PostRightContainer>
                </QuotedPostHeader>
                <QuotedPostContentContainer>
                    <QuotedPostTextContainer>
                        {post.content}
                    </QuotedPostTextContainer>
                    {post.media && post.media.length > 0 && (
                        <QuotedPostMediaContainer>
                            {post.media.map((media) => (
                                <PostMediaItem key={media.id}>
                                    {media.type.includes("image") ? (
                                        <img src={media.src} alt={media.alt} />
                                    ) : (
                                        <video controls>
                                            <source src={media.src} type={media.type} />
                                        </video>
                                    )}
                                </PostMediaItem>
                            ))}
                        </QuotedPostMediaContainer>
                    )}
                </QuotedPostContentContainer>
            </QuotedPostContainer>
        </QuotedPostWrapper>
    );
}

export default QuotedPost;