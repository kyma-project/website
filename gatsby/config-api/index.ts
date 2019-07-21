import { GatsbyConfig } from "gatsby";
import { siteMetadata } from "./sitemetadata";
import { plugins } from "./plugins";

export const configAPI: GatsbyConfig = {
  siteMetadata: siteMetadata as Record<string, any>,
  plugins,
  pathPrefix: "/website",
};
