import { ContentGQL } from "../utils";

export type CommunityGQL = ContentGQL<{
  docInfo: {
    id: string;
    type: string;
    version: string;
    fileName: string;
  };
}>;

export interface CommunityPathsArgs {
  topic: string;
}

export interface CommunityPaths {
  assetsPath: string;
  pagePath: string;
  rootPagePath: string;
}
