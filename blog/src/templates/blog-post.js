import * as React from "react";
import { Link, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../components/layout";
import Seo from "../components/seo";
import Arrow from "../components/icons/arrow";
import { MDXRenderer } from "gatsby-plugin-mdx";
import styled from "styled-components";
import { devices } from "../styles/devices";
import Header from "../components/header";

const PostPage = styled.div`
    display: block;
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 48px;
    width: 100%;
    
    @media ${devices.mobileL} {
        width: 380px;
    }

    @media (min-width: 600px) {
        width: 440px;
    }

    @media ${devices.tablet} {
        width: 520px;
    }
    
    @media ${devices.laptopM} {
        width: 640px;
    }

    @media ${devices.laptopL} {
        width: 720px;
    }
`;

const PostPageImage = styled.div`
    display: block;
    margin-top: 72px;
    margin-bottom: 48px;
`;

const PostPageHeader = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding-bottom: 48px;
`;

const PostPageTitle = styled.div`
    display: block;
    font-weight: 700;
    font-size: 28px;

    @media ${devices.mobileS} {
        font-size: 36px;
    }

    @media ${devices.mobileL} {
        font-size: 44px;
    }

    @media ${devices.tablet} {
        font-size: 60px;
    }
`;

const PostPageInfo = styled.div`
    display: flex;
    justify-content: flex-start;
    align-content: center;
    flex-wrap: wrap;
    font-size: 14px;
    column-gap: 12px;
    row-gap: 4px;
`;

const PostPageDescription = styled.div`
    display: block;
`;

const PostPageDate = styled.div`
    display: block;
    font-size: 16px;
    font-weight: 700;
    color: #386BD9;
`;

const PostPageAuthor = styled.div`
    display: block;
    font-size: 16px;
    font-weight: 400;
    color: #000000;
`;

const PostPageContent = styled.div`
    display: block;
    padding-bottom: 24px;
`;

const Pagination = styled.nav`
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: none;
    row-gap: 24px;
    padding-top: 24px;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 48px;
    align-content: center;
    width: 100%;

    @media ${devices.mobileS} {
        padding-left: 24px;
        padding-right: 24px;
    }

    @media ${devices.mobileL} {
        padding-left: 12%;
        padding-right: 12%;
    }

    @media ${devices.tablet} {
        padding-left: 172px;
        padding-right: 172px;
        grid-template-rows: none;
        grid-template-columns: 50% 50%;
        row-gap: 0px;
    }

    @media ${devices.laptopS} {
        padding-left: 10%;
        padding-right: 10%;
    }

    @media ${devices.desktop} {
        padding-left: 20%;
        padding-right: 20%;
    }
`;

const PaginationItem = styled.div`
    display: block;
    width: 100%;

    a {
        display: flex;
        color: #386BD9;
        font-weight: 700;
        align-items: center;
        padding: 24px;
        background-color: #D6CDCD;
        border-radius: 6px;
        text-decoration: none;
        gap: 16px;
    }

    a:hover, a:active {
        text-decoration: none;
    }
`;

const PreviousPaginationItem = styled(PaginationItem)`
    text-align: left;
    padding-right: 0px;

    @media ${devices.tablet} {
        padding-right: 12px;
    }
`;

const NextPaginationItem = styled(PaginationItem)`
    text-align: right;
    padding-left: 0px;

    @media ${devices.tablet} {
        padding-left: 12px;
        grid-column-start: 2;
    }
`;

const PaginationTitle = styled.div`
    display: block;
    font-size: 14px;
    font-weight: 400;
    text-transform: uppercase;
    margin-left: 64px;
    margin-right: 64px;
    margin-bottom: 12px;
`;

const PaginationLinkText = styled.div`
    display: block;
    width: 100%;
`;

const NextIcon = styled.div`
    display: block;
    transform: rotate(180deg);
    transform-origin: center;
`;

const BlogPostTemplate = ({ data }) => {
    const post = data.mdx;
    const { previous, next } = data;
    const image = getImage(post.frontmatter.image.src);
    const author =
        data.site.siteMetadata.author.name || post.frontmatter.author;

    return (
        <>
            <Header />
            <Layout>
                <Seo
                    title={post.frontmatter.title}
                    description={post.frontmatter.description || post.excerpt}
                    image={image.images.fallback.src}
                />
                <PostPageImage>
                    <GatsbyImage
                        image={image}
                        itemProp="image"
                        alt={post.frontmatter.image.alt}
                    />
                </PostPageImage>
                <PostPage itemScope itemType="http://schema.org/Article">
                    <PostPageHeader>
                        <PostPageTitle itemProp="headline">
                            {post.frontmatter.title}
                        </PostPageTitle>
                        <PostPageInfo>
                            <PostPageDate>{post.frontmatter.date}</PostPageDate>
                            <PostPageAuthor>
                                Written by <b>{author}</b>
                            </PostPageAuthor>
                        </PostPageInfo>
                        <PostPageDescription>
                            {post.frontmatter.description}
                        </PostPageDescription>
                    </PostPageHeader>
                    <PostPageContent>
                        <MDXRenderer itemProp="articleBody">
                            {post.body}
                        </MDXRenderer>
                    </PostPageContent>
                </PostPage>
                {(next || previous) && (
                    <Pagination>
                        {previous && (
                            <PreviousPaginationItem>
                                <PaginationTitle>Previous</PaginationTitle>
                                <Link to={previous.fields.slug} title={previous.frontmatter.title} aria-label={previous.frontmatter.title} rel="prev">
                                    <Arrow color={"#000000"} />
                                    <PaginationLinkText>
                                        {previous.frontmatter.title}
                                    </PaginationLinkText>
                                </Link>
                            </PreviousPaginationItem>
                        )}
                        {next && (
                            <NextPaginationItem>
                                <PaginationTitle>Next</PaginationTitle>
                                <Link to={next.fields.slug} title={next.frontmatter.title} aria-label={next.frontmatter.title} rel="next">
                                    <PaginationLinkText>
                                        {next.frontmatter.title}
                                    </PaginationLinkText>
                                    <NextIcon>
                                        <Arrow color={"#000000"} />
                                    </NextIcon>
                                </Link>
                            </NextPaginationItem>
                        )}
                    </Pagination>
                )}
            </Layout>
        </>
    );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
    query BlogPostBySlug(
        $id: String!
        $previousPostId: String
        $nextPostId: String
    ) {
        site {
            siteMetadata {
                author {
                    name
                }
            }
        }
        mdx(id: { eq: $id }) {
            id
            excerpt(pruneLength: 160)
            body
            frontmatter {
                title
                date(formatString: "MMMM DD, YYYY")
                description
                author
                image {
                    src {
                        childImageSharp {
                            gatsbyImageData(placeholder: BLURRED, quality: 100)
                        }
                    }
                    alt
                }
            }
        }
        previous: mdx(id: { eq: $previousPostId }) {
            fields {
                slug
            }
            frontmatter {
                title
            }
        }
        next: mdx(id: { eq: $nextPostId }) {
            fields {
                slug
            }
            frontmatter {
                title
            }
        }
    }
`;
