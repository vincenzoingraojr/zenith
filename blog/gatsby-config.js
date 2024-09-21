require("dotenv").config();

module.exports = {
    siteMetadata: {
        title: `Zenith Blog`,
        author: {
            name: `Vincenzo Ingrao Jr.`,
            summary: `Founder and CEO of Zenith`,
        },
        description: `This is the blog dedicated to Zenith.`,
        siteUrl: `https://blog.zenith.to/`,
    },
    plugins: [
        `gatsby-plugin-image`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/content/blog`,
                name: `blog`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        {
            resolve: `gatsby-plugin-mdx`,
            options: {
                extensions: [`.mdx`, `.md`],
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 2000,
                        },
                    },
                    {
                        resolve: `gatsby-remark-responsive-iframe`,
                    },
                    `gatsby-remark-prismjs`,
                    `gatsby-remark-copy-linked-files`,
                    `gatsby-remark-smartypants`,
                    {
                        resolve: `gatsby-remark-katex`,
                        options: {
                            strict: `ignore`,
                        },
                    },
                ],
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-google-gtag`,
            options: {
                trackingIds: [
                    process.env.GATSBY_GOOGLE_ANALYTICS_TRACKING_ID,
                ],
                pluginConfig: {
                    head: false,
                    respectDNT: true,
                    exclude: ["/preview/**", "/do-not-track/me/too/"],
                    origin: "blog.zenith.to",
                    delayOnRouteUpdate: 0,
                },
            },

        },
        {
            resolve: `gatsby-plugin-feed`,
            options: {
                query: `
                    {
                        site {
                            siteMetadata {
                                title
                                description
                                siteUrl
                                site_url: siteUrl
                            }
                        }
                    }
                `,
                feeds: [
                    {
                        serialize: ({ query: { site, allMdx } }) => {
                            return allMdx.nodes.map((node) => {
                                return {
                                    title: node.frontmatter.title,
                                    description: node.frontmatter.description,
                                    date: node.frontmatter.date,
                                    url: `${site.siteMetadata.siteUrl}${node.fields.slug}`,
                                    guid: `${site.siteMetadata.siteUrl}${node.fields.slug}`,
                                    custom_elements: [{ "content:encoded": node.body }],
                                };
                            });
                        },
                        query: `
                            {
                                allMdx(
                                    sort: { order: DESC, fields: [frontmatter___date] },
                                ) {
                                    nodes {
                                        body
                                        fields {
                                            slug
                                        }
                                        frontmatter {
                                            title
                                            date
                                            author
                                            description
                                        }
                                    }
                                }
                            }
                            `,
                        output: "/rss.xml",
                        title: "Zenith Blog RSS Feed",
                    },
                ],
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Zenith Blog`,
                short_name: `Zenith Blog`,
                start_url: `/`,
                background_color: `#FFFFFF`,
                theme_color: `#FFFFFF`,
                display: `standalone`,
                icon: `src/images/icon.png`,
            },
        },
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-plugin-offline`,
            options: {
                precachePages: [`/*`],
            },
        },
        `gatsby-plugin-styled-components`,
    ],
};
