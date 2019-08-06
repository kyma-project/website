import { ContentGQL } from "../utils";

export type CommunityGQL = ContentGQL<{
  docInfo: {
    id: string;
    type: string;
    version: string;
    fileName: string;
  };
}>;
