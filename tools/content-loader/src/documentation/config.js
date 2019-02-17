module.exports = {
  commit: process.env.APP_DOCS_COMMIT || null,
  outputPath: process.env.APP_DOCS_OUTPUT || "out",
  outputDocsVersion:
    process.env.APP_DOCS_VERSIONS_CONFIG_FILE || "versions.json",
  tempPath: process.env.APP_DOCS_TEMP_DIR || "tempDir",
};
