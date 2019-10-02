import { siteMetadata } from "./sitemetadata";
import { SiteMetadata } from "./types";

interface Edge {
  node: {
    excerpt: string;
    html: string;
    fields: {
      slug?: string;
      date: string;
    };
    frontmatter: {
      title: string;
      author: {
        name: string;
      };
    };
  };
}

interface QueryType {
  query: {
    site: {
      siteMetadata: SiteMetadata;
    };
    allMarkdownRemark: {
      edges: Edge[];
    };
  };
}

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
        serialize: ({ query: { site, allMarkdownRemark } }: QueryType) =>
          allMarkdownRemark.edges
            .filter(arg =>
              arg.node.fields.slug
                ? arg.node.fields.slug.startsWith("/blog/")
                : false,
            )
            .map(edge => {
              const getAuthor = (arg: Edge) => {
                if (
                  arg.node.frontmatter.author &&
                  !!arg.node.frontmatter.author.name
                ) {
                  return arg.node.frontmatter.author.name;
                }
                return null;
              };

              const host = site.siteMetadata.siteUrl;
              const link = `${host.endsWith("/") ? host : host + "/"}${
                edge.node.fields.slug ? edge.node.fields.slug.slice(1) : ""
              }`;

              return {
                ...edge.node.frontmatter,
                date: edge.node.fields.date,
                url: link,
                guid: link,
                author: getAuthor(edge),
                description: edge.node.excerpt,
                custom_elements: [{ "content:encoded": edge.node.html }],
              };
            }),
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
        title: siteMetadata.description,
        output: `${
          siteMetadata.feedUrl.startsWith("/")
            ? siteMetadata.feedUrl
            : "/" + siteMetadata.feedUrl
        }`,
      },
    ],
  },
};
