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

export interface DocsPathsArgs {
  version: string;
  docsType: string;
  topic: string;
  latestVersion: string;
}

export interface DocsPaths {
  assetsPath: string;
  specificationsPath: string;
  pagePath: string;
  rootPagePath: string;
  modalUrlPrefix: string;
}
