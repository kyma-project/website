export interface DocsConfig {
  branches: string[];
  outputPath: string;
  outputDocsVersion: string;
  tempPath: string;
  repository: string;
}

const config: DocsConfig = {
  branches: ["refactor-installation-docs"],
  // branches: process.env.APP_DOCS_BRANCHES
  //   ? process.env.APP_DOCS_BRANCHES.replace(/ /g, "").split(",")
  //   : ["master"],
  outputPath: process.env.APP_DOCS_OUTPUT || "docs",
  outputDocsVersion:
    process.env.APP_DOCS_VERSIONS_CONFIG_FILE || "versions.json",
  tempPath: process.env.APP_DOCS_TEMP_DIR || "tempDocsDir",
  repository: process.env.APP_DOCS_REPOSITORY || "kyma",
};

export default config;
