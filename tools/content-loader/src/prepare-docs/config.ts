export interface DocsConfig {
  branches: string[],
  outputPath: string,
  outputDocsVersion: string,
  tempPath: string,
}

const config: DocsConfig = {
  branches: process.env.APP_DOCS_BRANCHES ? process.env.APP_DOCS_BRANCHES.replace(/ /g, "").split(",") : ["master"],
  outputPath: process.env.APP_DOCS_OUTPUT || "out",
  outputDocsVersion:
    process.env.APP_DOCS_VERSIONS_CONFIG_FILE || "versions.json",
  tempPath: process.env.APP_DOCS_TEMP_DIR || "tempDir",
}

export default config;
