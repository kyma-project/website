import { ContentQL } from "../utils";

export type DocQL = ContentQL<{
  docInfo: {
    id: string;
    type: string;
    version: string;
    fileName: string;
  };
}>;

export interface DocsVersions {
  [type: string]: string[];
}
