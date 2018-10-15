const { execSync } = require("child_process");
const fs = require("fs-extra");

const CONVERTER_IMAGE =
  "eu.gcr.io/kyma-project/content-to-json-generator:0.0.2";

function generateDocumentation(source, output) {
  fs.removeSync(`${output}`);
  fs.mkdirsSync(`${output}`);

  fs.readdirSync(source)
    .map(element => `${source}/${element}`)
    .filter(element => fs.lstatSync(element).isDirectory())
    .filter(element => fs.pathExistsSync(`${element}/docs.config.json`))
    .forEach(element => {
      execSync(
        `docker run --rm -v ${element}:/app/documentation -v ${output}:/app/out -e APP_OUT_PATH="/../out" ${CONVERTER_IMAGE}`,
      );
    });
}

module.exports = {
  generateDocumentation,
};
