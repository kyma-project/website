const yaml = require("js-yaml");
const fs = require("fs-extra");

function generateManifest(source, destination) {
  const manifest = yaml.safeLoad(fs.readFileSync(source, "utf8"));
  fs.writeJsonSync(destination, manifest, { encoding: "utf8" });
}

module.exports = {
  generateManifest,
};
