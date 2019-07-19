import { SiteMetadata } from "./types";
const configSiteMetadata: SiteMetadata = require("../../config").siteMetadata;

export const siteMetadata: SiteMetadata = {
  siteUrl: "https://kyma-project.io/",
  twitterUsername: "kymaproject",
  ...configSiteMetadata,
};
