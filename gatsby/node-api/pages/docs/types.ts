import { ContentGQL } from "../utils";

export type DocGQL = ContentGQL<{
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
