const fs = require("fs-extra");
const external = require("./external/documentation/generator");

async function generateDocumentation(source, output) {
  fs.removeSync(output);
  fs.mkdirsSync(output);

  const paths = fs
    .readdirSync(source)
    .map(element => `${source}/${element}`)
    .filter(element => fs.lstatSync(element).isDirectory())
    .filter(element => fs.pathExistsSync(`${element}/docs.config.json`));

  for (const path of paths) {
    const config = {
      srcPath: `${path}/docs`,
      srcApiPath: `${path}/api`,
      srcAsyncApiPath: `${path}/asyncApi`,
      docsConfigPath: `${path}/docs.config.json`,
      outPath: output,
      resourcesBaseURI: "{PLACEHOLDER_APP_RESOURCES_BASE_URI}",

      API_SWAGGER_FILENAME: "apiSpec.json",
      API_RAML_FILENAME: "apiSpec.raml",
      ASYNC_API_FILENAME: "asyncApiSpec.json",
      DOCUMENT_EXTENSIONS: [".html", ".md"],
      RESOURCES_DIRECTORY: "assets",
      RESULT_FILENAME: "content.json",
    };

    await external.generateDocumentation(config);
  }
}

module.exports = {
  generateDocumentation,
};
