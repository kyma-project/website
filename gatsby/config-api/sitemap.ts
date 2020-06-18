import { SiteMetadata } from "./types";

interface QueryResult {
  site: {
    siteMetadata: SiteMetadata;
  };
  allSitePage: {
    edges: Array<{
      node: {
        path: string;
      };
    }>;
  };
  allDirectory: {
    distinct: string[];
  };
}

export const sitemapPlugin = {
  resolve: `gatsby-plugin-sitemap`,
  options: {
    query: `
      {
        site {
          siteMetadata {
            siteUrl
          }
        }
        allSitePage {
          edges {
            node {
              path
            }
          }
        }
        allDirectory(filter: { relativePath: { glob: "docs/*" } }) {
          distinct(field: relativePath)
        }
      }
    `,
    serialize: ({ site, allSitePage, allDirectory }: QueryResult) => {
      let siteUrl = site.siteMetadata && site.siteMetadata.siteUrl;
      siteUrl = siteUrl || "";
      const docsVersions = [...allDirectory.distinct, "docs/latest"];

      return allSitePage.edges
        .filter(edge => !docsVersions.some(v => edge.node.path.includes(v)))
        .map(edge => ({
          url: `${siteUrl}${edge.node.path}`,
          changefreq: `daily`,
          priority: 0.7,
        }));
    },
  },
};
