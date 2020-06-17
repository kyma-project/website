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
      }
    `,
    serialize: ({ site, allSitePage, allDirectory }: QueryResult) => {
      let siteUrl = site.siteMetadata && site.siteMetadata.siteUrl;
      siteUrl = siteUrl || "";

      return allSitePage.edges
        .filter(edge => {
          if (edge.node.path.includes("/docs")) {
            return edge.node.path.includes("/docs/latest");
          }
          return true;
        })
        .map(edge => ({
          url: `${siteUrl}${edge.node.path}`,
          changefreq: `daily`,
          priority: 0.7,
        }));
    },
  },
};
