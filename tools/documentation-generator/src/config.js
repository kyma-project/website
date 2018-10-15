module.exports = {
  token: process.env.APP_TOKEN || null,
  organization: process.env.APP_ORGANIZATION || "kyma-project",
  repository: process.env.APP_REPOSITORY || "kyma",
  output: process.env.APP_OUTPUT || "out",
  documentationConfig: process.env.APP_DOC_CONFIG_FILE || "out/config.json",
  temp: process.env.APP_TEMP || "temp",
};
