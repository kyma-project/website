const siteMetadata = require("./config").siteMetadata;

module.exports = {
  siteMetadata,
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-styled-components",
      options: {
        ssr: false,
        displayName: true,
      },
    },
    "gatsby-plugin-lodash",
    "gatsby-plugin-typescript",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: "gatsby-plugin-copy-files",
      options: {
        source: `${__dirname}/content`,
        destination: "/assets",
        extensions: ["jpeg", "jpg", "gif", "png", "svg", "json", "yaml", "yml"],
        // add regex possibility
        excludeDirs: ["i18n"],
        excludeFiles: [
          "docs/versions.json",
          "docs.config.json",
          "manifest.yaml",
          "events.yaml",
        ],
      },
    },
    {
      resolve: "gatsby-plugin-anchor-behavior",
      options: {
        paths: {
          "/docs/": {
            defaultOffset: 16,
            mobileOffset: 74,
          },
          "/roadmap/": {
            defaultOffset: 0,
            mobileOffset: 0,
          },
        },
        defaultOffset: 16,
        mobileOffset: 74,
        mobileOffsetInclude: ["/docs"],
      },
    },
    "gatsby-plugin-banner-slides-yml",
    "gatsby-plugin-early-adopters-yml",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        excerpt_separator: `<!-- overview -->`,
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Kyma",
        short_name: "Kyma",
        start_url: "/",
        background_color: "#fff",
        theme_color: "#0073e6",
        display: "standalone",
        icon: "static/android-chrome-512x512.png",
      },
    },
    {
      resolve: `gatsby-plugin-gtag`,
      options: {
        trackingId: "UA-122665881-1",
        head: true,
        anonymize: true,
      },
    },
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-netlify`,
    `gatsby-plugin-netlify-cache`,
    {
      resolve: `gatsby-plugin-env-variables`,
      options: {
        whitelist: ["GOOGLE_CSE", "ALGOLIA_API_KEY", "ALGOLIA_INDEX_NAME"],
      },
    },
    {
      resolve: "gatsby-plugin-feed-generator",
      options: {
        generator: `GatsbyJS`,
        rss: true, // Set to false to stop rss generation
        json: true, // Set to false to stop json feed generation
        siteQuery: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
            }
          }
        }
      `,
        feeds: [
          {
            name: "feed", // This determines the name of your feed file => feed.json & feed.xml
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
                    }
                  }
                }
              }
            }            
          `,
            normalize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges
                .filter(arg => arg.node.fields.slug.startsWith("/blog/"))
                .map(edge => {
                  return Object.assign({}, edge.node.frontmatter, {
                    description: edge.node.excerpt,
                    url:
                      site.siteMetadata.siteUrl +
                      edge.node.fields.slug.slice(1),
                    date: edge.node.fields.date,
                    guid:
                      site.siteMetadata.siteUrl +
                      edge.node.fields.slug.slice(1),
                  });
                });
            },
          },
        ],
      },
    },
  ],
  pathPrefix: "/website",
};

// {
//   resolve: `gatsby-plugin-feed`,
//   options: {
//     query: `
//       {
//         site {
//           siteMetadata {
//             title
//             description
//             siteUrl

//           }
//         }
//       }
//     `,
//     feeds: [
//       {
//         serialize: ({ query: { site, allMarkdownRemark } }) => {
//           return allMarkdownRemark.edges.map(edge => {
//             console.log(edge.node.fields.slug);
//             return Object.assign({}, edge.node.frontmatter, {
//               description: edge.node.excerpt,
//               date: edge.node.frontmatter.date,
//               url: site.siteMetadata.siteUrl + edge.node.fields.slug,
//               guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
//             });
//           });
//         },
//         query: `
//         {
//           allMarkdownRemark {
//             edges {
//               node {
//                 excerpt
//                 html
//                 fields {
//                   slug
//                 }
//                 frontmatter {
//                   title
//                 }
//               }
//             }
//           }
//         }
//         `,
//         output: "/rss.xml",
//         title: "Your Site's RSS Feed",
//         // optional configuration to insert feed reference in pages:
//         // if `string` is used, it will be used to create RegExp and then test if pathname of
//         // current page satisfied this regular expression;
//         // if not provided or `undefined`, all pages will have feed reference inserted
//         match: ".*?blog.*?",
//       },
//     ],
//   },
// },
