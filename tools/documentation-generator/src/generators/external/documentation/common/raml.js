const { convert } = require("api-spec-converter");
const fs = require("fs-extra");

async function convertRamlToSwagger(input, output) {
  try {
    const converted = await convert({
      from: "raml",
      to: "swagger_2",
      source: input,
    });

    await fs.outputJson(output, converted.spec);
  } catch (err) {
    console.error("RAML conversion failed: ", err);
    process.exit(1);
  }
}

module.exports = {
  convertRamlToSwagger,
};
