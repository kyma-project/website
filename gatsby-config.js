module.exports = {
  // Data exported with GraphQL API
  siteMetadata: {
    navigation: [
      {
        path: "/documentation",
        id: "documentation",
      },
      {
        path: "/blog",
        id: "blog",
      },
    ],
    languages: [{ code: "en", label: "English" }],
  },
  // Gatsby Config
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/blog-posts`,
        name: "blog",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static/docs`,
        name: "docs",
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
              linkImagesToOriginal: false,
            },
          },
          `gatsby-remark-copy-linked-files`,
        ],
      },
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-122665881-1",
        head: false,
        anonymize: true,
      },
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/documentation/*`] },
    },
  ],
  pathPrefix: "/website",
};
