module.exports = {
  // Data exported with GraphQL API
  siteMetadata: {
    navigation: [{ path: "/blog", id: "blog" }],
    languages: [
      { code: "en", label: "English" }
    ]
  },
  // Gatsby Config
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/blog-posts`,
        name: "markdown-pages"
      }
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1000,
              linkImagesToOriginal: false
            }
          }
        ]
      }
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-122665881-1",
        head: false,
      },
    },
  ]
};
