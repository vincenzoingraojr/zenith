import * as React from "react";
import { Link, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../components/layout";
import Seo from "../components/seo";
import Arrow from "../components/icons/arrow";
import { MDXRenderer } from "gatsby-plugin-mdx";
import styled from "styled-components";
import { devices } from "../styles/devices";
import { useState, useEffect } from "react";
import Header from "../components/header";

const PostPage = styled.div`
    display: block;
    margin-bottom: 48px;
`;

const PostPageImage = styled.div`
    display: block;
    margin-bottom: 48px;
`;

const PostPageHeader = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 48px;

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
    margin-left: 16px;
    margin-right: 16px;
    padding-bottom: 24px;
    border-bottom: 3px solid #000000;

    @media ${devices.mobileS} {
        margin-left: 24px;
        margin-right: 24px;
    }

    @media ${devices.mobileL} {
        margin-left: 16%;
        margin-right: 16%;
    }

    @media ${devices.tablet} {
        margin-left: 192px;
        margin-right: 192px;
    }

    @media ${devices.laptopS} {
        margin-left: 20%;
        margin-right: 20%;
    }

    @media ${devices.desktop} {
        margin-left: 32%;
        margin-right: 32%;
    }
`;

const Pagination = styled.nav`
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: none;
    row-gap: ${(props) => (props.hasOnlyChild ? "0px" : "24px")};
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
    const siteTitle = data.site.siteMetadata?.title || `Title`;
    const { previous, next } = data;
    const image = getImage(post.frontmatter.image.src);
    const author =
        data.site.siteMetadata.author.name || post.frontmatter.author;

    const [hasOnlyChild, setHasOnlyChild] = useState(false);
    useEffect(() => {
        if (previous && !next) {
            setHasOnlyChild(true);
        } else if (!previous && next) {
            setHasOnlyChild(true);
        } else {
            setHasOnlyChild(false);
        }
    }, [previous, next]);

    return (
        <>
            <Header title={siteTitle} isNavbarChanging={true} />
            <Layout>
                <Seo
                    title={post.frontmatter.title}
                    description={post.frontmatter.description || post.excerpt}
                    image={image.images.fallback.src}
                />
                <PostPage itemScope itemType="http://schema.org/Article">
                    <PostPageImage>
                        <GatsbyImage
                            image={image}
                            itemProp="image"
                            alt={post.frontmatter.image.alt}
                        />
                    </PostPageImage>
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
                <Pagination hasOnlyChild={hasOnlyChild}>
                    {previous && (
                        <PreviousPaginationItem>
                            <PaginationTitle>Previous</PaginationTitle>
                            <Link to={previous.fields.slug} title={previous.frontmatter.title} aria-label={previous.frontmatter.title} rel="prev">
                                <Arrow />
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
                                    <Arrow />
                                </NextIcon>
                            </Link>
                        </NextPaginationItem>
                    )}
                </Pagination>
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
                title
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
