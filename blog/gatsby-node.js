const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions;

    const blogPost = path.resolve(`./src/templates/blog-post.js`);

    const result = await graphql(
        `
            {
                allMdx(
                    sort: { fields: [frontmatter___date], order: ASC }
                    limit: 1000
                ) {
                    nodes {
                        id
                        fields {
                            slug
                        }
                    }
                }
            }
        `
    );

    if (result.errors) {
        reporter.panicOnBuild(
            `There was an error loading your blog posts`,
            result.errors
        );
        return;
    }

    const posts = result.data.allMdx.nodes;

    if (posts.length > 0) {
        posts.forEach((post, index) => {
            const previousPostId = index === 0 ? null : posts[index - 1].id;
            const nextPostId =
                index === posts.length - 1 ? null : posts[index + 1].id;

            createPage({
                path: post.fields.slug,
                component: blogPost,
                context: {
                    id: post.id,
                    previousPostId,
                    nextPostId,
                },
            });
        });
    }
};

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions;

    if (node.internal.type === `Mdx`) {
        const value = createFilePath({ node, getNode });

        createNodeField({
            name: `slug`,
            node,
            value,
        });
    }
};

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions;

    createTypes(`
        type SiteMetadata {
            author: Author
            siteUrl: String
        }

        type Author {
            name: String
            summary: String
        }

        type Mdx implements Node {
            frontmatter: Frontmatter
            fields: Fields
        }

        type Frontmatter {
            title: String
            description: String
            date: Date @dateformat
            author: String
            pinned: Boolean
        }

        type Fields {
            slug: String
        }
    `);
};
