const configJSON = require("../../../../config.json");

export interface DocsRepository {
  displayName: string;
  organization: string;
  repository: string;
  branches: string[];
  lastReleases?: number;
}

export interface DocsRepositories {
  [source: string]: DocsRepository;
}

export interface DocsConfig {
  branches: string[];
  docsRepositories: DocsRepositories;
  outputPath: string;
  outputDocsVersion: string;
}

const config: DocsConfig = {
  branches: process.env.APP_DOCS_BRANCHES
    ? process.env.APP_DOCS_BRANCHES.replace(/ /g, "").split(",")
    : ["master"],
  docsRepositories: configJSON.docs,
  outputPath: process.env.APP_DOCS_OUTPUT || "docs",
  outputDocsVersion:
    process.env.APP_DOCS_VERSIONS_CONFIG_FILE || "versions.json",
};

export default config;
