import { GatsbyConfig } from "gatsby";
import { siteMetadata } from "./sitemetadata";
import { plugins } from "./plugins";

export const config: GatsbyConfig = {
  siteMetadata,
  plugins,
  pathPrefix: "/website",
};
