import { SiteMetadata } from "./types";
import configSiteMetadata from "../../config.json";

export const siteMetadata: SiteMetadata = {
  twitterUsername: "kymaproject",
  ...configSiteMetadata.siteMetadata,
};
