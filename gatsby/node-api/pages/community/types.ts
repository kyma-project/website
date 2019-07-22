import { ContentQL } from "../utils";

export type CommunityQL = ContentQL<{
  docInfo: {
    id: string;
    type: string;
    version: string;
    fileName: string;
  };
}>;
