const createEvaluator = require("js-native-template");
const path = require("path");

function createTemplateEvaluator(
  files,
  resourcesBaseURI,
  documentType,
  documentCode,
  resourcesDirectory,
) {
  return createEvaluator({
    partial: p =>
      function file(fileToEval) {
        const file = files[`${fileToEval.dir}/${p}`];
        if (!file) throw new Error(`File "${p}" doesn't exist.`);
        if (!file.raw) throw new Error(`File "${p}" isn't a partial.`);
        return files[`${fileToEval.dir}/${p}`].raw;
      },
    request: require("request-promise-native"),
    link: p =>
      `${resourcesBaseURI}/${documentType}/${documentCode}/${resourcesDirectory}/${path.basename(
        p,
      )}`,
  });
}

module.exports = {
  createTemplateEvaluator,
};
