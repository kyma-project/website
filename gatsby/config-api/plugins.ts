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
    resolve: "gatsby-plugin-copy-files",
    options: {
      source: resolve(`${__dirname}/../../content`),
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
      // paths: {
      //   "/docs/": {
      //     defaultOffset: 0,
      //     mobileOffset: 0,
      //   },
      //   "/roadmap/": {
      //     defaultOffset: 0,
      //     mobileOffset: 0,
      //   },
      // },
      defaultOffset: 0,
      mobileOffset: 0,
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
  rssFeed,
];
