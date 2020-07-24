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
  repositoryName: string;
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

export interface DocsRepository {
  displayName: string;
  rootPath: {
    docsType: string;
    docsTopic: string;
  };
  organization: string;
  repository: string;
  branches: string[];
  lastReleases?: number;
}
