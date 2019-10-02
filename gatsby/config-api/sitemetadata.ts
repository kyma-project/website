import { SiteMetadata } from "./types";
const configSiteMetadata: SiteMetadata = require("../../config").siteMetadata;

export const siteMetadata: SiteMetadata = {
  twitterUsername: "kymaproject",
  ...configSiteMetadata,
};
