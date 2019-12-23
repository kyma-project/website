export interface DocsConfig {
  branches: string[];
  outputPath: string;
  outputDocsVersion: string;
  sourcePath: string;
  repository: string;
  numberOfProcessedReleases: number;
}

const config: DocsConfig = {
  branches: process.env.APP_DOCS_BRANCHES
    ? process.env.APP_DOCS_BRANCHES.replace(/ /g, "").split(",")
    : ["master"],
  outputPath: process.env.APP_DOCS_OUTPUT || "docs",
  outputDocsVersion:
    process.env.APP_DOCS_VERSIONS_CONFIG_FILE || "versions.json",
  sourcePath: process.env.APP_DOCS_SOURCE_DIR || "tempDocsDir",
  repository: process.env.APP_DOCS_REPOSITORY || "kyma",
  numberOfProcessedReleases: Number(process.env.APP_DOCS_RELEASE_NUMBER) || 3,
};

export default config;
