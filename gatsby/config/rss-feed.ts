import { siteMetadata } from "./sitemetadata";

export const rssFeed = {
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
        serialize: ({ query: { site, allMarkdownRemark } }) => {
          return allMarkdownRemark.edges
            .filter(arg => arg.node.fields.slug.startsWith("/blog/"))
            .map(edge => {
              const getAuthor = arg => {
                if (
                  arg.node.frontmatter.author &&
                  !!arg.node.frontmatter.author.name
                ) {
                  return arg.node.frontmatter.author.name;
                }
                return null;
              };

              const host = site.siteMetadata.siteUrl;
              const link = `${
                host.endsWith("/") ? host : host + "/"
              }${edge.node.fields.slug.slice(1)}`;

              return {
                ...edge.node.frontmatter,
                date: edge.node.frontmatter.date,
                url: link,
                guid: link,
                author: getAuthor(edge),
                description: edge.node.excerpt,
                custom_elements: [{ "content:encoded": edge.node.html }],
              };
            });
        },
        query: `
        {
          allMarkdownRemark(sort: {order: DESC, fields: [fields___date]}) {
            edges {
              node {
                excerpt
                html
                fields {
                  slug
                  date
                }
                frontmatter {
                  title
                  author {
                    name
                  }
                }
              }
            }
          }
        }  
        `,
        output: `${
          siteMetadata.feedUrl.startsWith("/")
            ? siteMetadata.feedUrl
            : "/" + siteMetadata.feedUrl
        }`,
      },
    ],
  },
};
