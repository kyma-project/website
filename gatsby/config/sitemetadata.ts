const configSiteMetadata = require("../../config").siteMetadata;

export const siteMetadata: Record<string, any> = {
  siteUrl: "https://kyma-project.io/",
  twitterUsername: "kymaproject",
  ...configSiteMetadata,
};
