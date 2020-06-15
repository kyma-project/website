import { resolve } from "path";
import { rssFeed } from "./rss-feed";
import { Plugins } from "./types";

export const plugins: Plugins = [
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
      path: resolve(`${__dirname}/../../content/`),
    },
  },
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
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      trackingId: "UA-122665881-1",
      anonymize: true,
      allowLinker: true,
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
    // resolve: "gatsby-plugin-robots-txt",
    resolve: "@kyma-project-robots-txt-plugin",
    options: {
      policy: [
        { userAgent: "*", allow: "/docs/latest/", disallow: "/docs/" },
        {
          userAgent: "OtherBot",
          allow: ["/allow-for-all-bots", "/allow-only-for-other-bot"],
          disallow: ["/admin", "/login"],
          crawlDelay: 2,
        },
      ],
    },
  },
  rssFeed,
];
