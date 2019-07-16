export interface SiteMetadata extends Record<string, unknown> {
  siteUrl: string;
  twitterUsername: string;
  title: string;
  description: string;
  feedUrl: string;
}

export type Plugins = Array<
  | string
  | {
      resolve: string;
      options: Record<string, any>;
    }
>;
