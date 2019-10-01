import { SiteMetadata } from "./types";
const configSiteMetadata: SiteMetadata = require("../../config").siteMetadata;

export const siteMetadata: SiteMetadata = {
  siteUrl: "https://5d9300d72562c2000a6e13ff--kyma-project.netlify.com",
  twitterUsername: "kymaproject",
  ...configSiteMetadata,
};
