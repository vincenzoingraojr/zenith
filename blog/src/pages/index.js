import * as React from "react";
import { Link, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../components/layout";
import Seo from "../components/seo";
import styled from "styled-components";
import {
    PageContent,
    PageText,
    PageTextMT24,
    PageTitle,
    PageBlock,
} from "../styles/global";
import { devices } from "../styles/devices";
import Header from "../components/header";

const IndexPage = styled.div`
    display: flex;
    flex-direction: column;
    gap: 48px;
    margin-top: 72px;
    padding-bottom: 48px;
`;

const MainFeed = styled.div`
    display: flex;
    flex-direction: column;
    gap: 48px;
`;

const FeedItemContainer = styled.div`
    display: block;

    :last-child {
        padding-bottom: 0px;
        border-bottom: none;
    }

    a {
        display: block;
        text-decoration: none;
    }

    a:hover, a:active {
        text-decoration: none;
    }
`;

const PostItem = styled.article`
    display: block;
`;

const PostImage = styled.div`
    display: block;
    border-radius: 6px;

    img {
        aspect-ratio: 1 / 1;
        border-radius: 6px;
    }

    @media ${devices.tablet} {
        img {
            aspect-ratio: 16 / 9;
        }
    }
`;

const PostBody = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 24px;
    gap: 16px;
`;

const PostTitle = styled.div`
    display: block;
    font-size: 26px;
    color: #000000;
    font-weight: 700;

    @media ${devices.mobileM} {
        font-size: 32px;
    }

    &:hover {
        color: #386BD9;
    }
`;

const PostInfo = styled.div`
    display: flex;
    justify-content: flex-start;
    align-content: center;
    flex-wrap: wrap;
    font-size: 14px;
    column-gap: 12px;
    row-gap: 4px;
`;

const PostDate = styled.div`
    display: block;
    font-size: 14px;
    font-weight: 700;
    color: #386BD9;
`;

const PostAuthor = styled.div`
    display: block;
    font-size: 14px;
    font-weight: 400;
    color: #000000;
`;

const PostDescription = styled.section`
    display: block;
    color: #000000;
`;

const Description = styled(PageText)`
    display: block;
    font-weight: 400;
    color: inherit;
`;

const IndexGrid = styled.div`
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: none;
    row-gap: 48px;
    column-gap: 0px;
    padding-left: 24px;
    padding-right: 24px;

    @media ${devices.mobileL} {
        padding-left: 48px;
        padding-right: 48px;
    }

    @media (min-width: 600px) {
        padding-left: 96px;
        padding-right: 96px;
    }

    @media ${devices.tablet} {
        padding-left: 172px;
        padding-right: 172px;
    }

    @media ${devices.laptopS} {
        grid-template-rows: none;
        grid-template-columns: 35% auto;
        row-gap: 0px;
        column-gap: 48px;
        padding-left: 10%;
        padding-right: 10%;
    }

    @media ${devices.desktop} {
        padding-left: 20%;
        padding-right: 20%;
    }
`;

const MainBlockContainer = styled.div`
    display: grid;
    position: relative;
    top: unset;
    height: auto;

    @media ${devices.laptopS} {
        position: sticky;
        top: 120px;
        height: calc(100vh - 168px);
    }
`;

const IndexTitle = styled.div`
    display: block;
    font-size: 32px;
    font-weight: 700;
`;

const PinnedPost = styled.div`
    display: flex;
    position: relative;
    align-items: flex-end;
    justify-content: flex-start;
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: calc(100vh - 72px);
`;

const PinnedPostImage = styled.div`
    display: block;
    width: 100%;
    height: calc(100vh - 72px);
    position: absolute;

    img {
        width: 100vw;
        height: calc(100vh - 72px);
        object-fit: cover;
        object-position: center;
    }
`;

const PinnedPostInfoContainer = styled.div`
    display: block;
    z-index: 100;
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 48px;

    @media ${devices.mobileL} {
        padding-left: 48px;
        padding-right: 48px;
    }

    @media ${devices.tablet} {
        padding-left: 96px;
        padding-right: 96px;
    }

    @media ${devices.laptopS} {
        padding-left: 48px;
        padding-right: 48px;
    }

    @media ${devices.desktop} {
        padding-left: 6%;
        padding-right: 6%;
    }

    a {
        display: block;
        text-decoration: none;
    }

    a:hover, a:active {
        text-decoration: none;
    }
`;

const PinnedPostInfoInnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const PinnedPostTitle = styled.div`
    display: block;
    font-size: 32px;
    color: #FFFFFF;
    font-weight: 700;
    opacity: 1;

    @media ${devices.tablet} {
        font-size: 44px;
    }

    &:hover {
        opacity: 0.6;
    }
`;

const PinnedPostInfo = styled.div`
    display: flex;
    justify-content: flex-start;
    align-content: center;
    flex-wrap: wrap;
    font-size: 14px;
    column-gap: 12px;
    row-gap: 4px;
`;

const PinnedPostDate = styled.div`
    display: block;
    font-size: 14px;
    font-weight: 700;
    color: #FFFFFF;
`;

const PinnedPostAuthor = styled.div`
    display: block;
    font-size: 14px;
    font-weight: 400;
    color: #FFFFFF;
`;

const BlogIndex = ({ data }) => {
    const posts = data.allMdx.nodes;

    if (posts.length === 0) {
        return (
            <>
                <Header />
                <Layout>
                    <Seo title="Home" />
                    <PageContent>
                        <PageTitle>Home</PageTitle>
                        <PageText>No posts found.</PageText>
                    </PageContent>
                </Layout>
            </>
        );
    }

    const pinnedPost = posts.find(post => post.frontmatter.pinned === true);
    const pinnedPostImage = getImage(pinnedPost.frontmatter.image.src);
    return (
        <>
            <Header />
            <Layout>
                <Seo title="Home" />
                <IndexPage>
                    <PinnedPost image={pinnedPostImage}>
                        <PinnedPostImage>
                            <GatsbyImage
                                image={pinnedPostImage}
                                itemProp="image"
                                alt={
                                    pinnedPost.frontmatter.image
                                        .alt
                                }
                            />
                        </PinnedPostImage>
                        <PinnedPostInfoContainer>
                            <Link
                                to={pinnedPost.fields.slug}
                                itemProp="url"
                                title={pinnedPost.frontmatter.title}
                            >
                                <PinnedPostInfoInnerContainer>
                                    <PinnedPostTitle>
                                        {pinnedPost.frontmatter.title}
                                    </PinnedPostTitle>
                                    <PinnedPostInfo>
                                        <PinnedPostDate>
                                            {pinnedPost.frontmatter.date}
                                        </PinnedPostDate>
                                        <PinnedPostAuthor>
                                            By{" "}
                                            <b>
                                                {
                                                    pinnedPost.frontmatter
                                                        .author
                                                }
                                            </b>
                                        </PinnedPostAuthor>
                                    </PinnedPostInfo>
                                </PinnedPostInfoInnerContainer>
                            </Link>
                        </PinnedPostInfoContainer>
                    </PinnedPost>
                    <IndexGrid>
                        <MainBlockContainer>
                            <PageBlock>
                                <IndexTitle>Latest posts</IndexTitle>
                                <PageTextMT24>
                                    Here you can read all the posts related to the
                                    ideas and the development of the project.
                                </PageTextMT24>
                            </PageBlock>
                        </MainBlockContainer>
                        <MainFeed>
                            {posts.map((post) => {
                                const title =
                                    post.frontmatter.title || post.fields.slug;
                                const image = getImage(post.frontmatter.image.src);

                                return (
                                    <FeedItemContainer key={post.fields.slug}>
                                        <Link
                                            to={post.fields.slug}
                                            itemProp="url"
                                            title={title}
                                        >
                                            <PostItem
                                                itemScope
                                                itemType="http://schema.org/Article"
                                            >
                                                <PostImage>
                                                    <GatsbyImage
                                                        image={image}
                                                        itemProp="image"
                                                        alt={
                                                            post.frontmatter.image
                                                                .alt
                                                        }
                                                    />
                                                </PostImage>
                                                <PostBody>
                                                    <PostTitle itemProp="headline">
                                                        {title}
                                                    </PostTitle>
                                                    <PostInfo>
                                                        <PostDate>
                                                            {post.frontmatter.date}
                                                        </PostDate>
                                                        <PostAuthor>
                                                            By{" "}
                                                            <b>
                                                                {
                                                                    post.frontmatter
                                                                        .author
                                                                }
                                                            </b>
                                                        </PostAuthor>
                                                    </PostInfo>
                                                    <PostDescription>
                                                        <Description
                                                            dangerouslySetInnerHTML={{
                                                                __html:
                                                                    post.frontmatter
                                                                        .description
                                                            }}
                                                            itemProp="description"
                                                        />
                                                    </PostDescription>
                                                </PostBody>
                                            </PostItem>
                                        </Link>
                                    </FeedItemContainer>
                                );
                            })}
                        </MainFeed>
                    </IndexGrid>
                </IndexPage>
            </Layout>
        </>
    );
};

export default BlogIndex;

export const pageQuery = graphql`
    query {
        allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
            nodes {
                excerpt
                fields {
                    slug
                }
                frontmatter {
                    date(formatString: "MMMM DD, YYYY")
                    title
                    description
                    author
                    image {
                        src {
                            childImageSharp {
                                gatsbyImageData(
                                    placeholder: BLURRED
                                    quality: 100
                                )
                            }
                        }
                        alt
                    }
                    pinned
                }
            }
        }
    }
`;
