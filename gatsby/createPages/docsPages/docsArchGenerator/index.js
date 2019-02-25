const DocsLoader = require("./docsLoader");
const extractContent = require("./extractContent");

const generateManifest = require("./manifest");
const generateNavigation = require("./navigation");

module.exports = (docs, versions) => {
  docsArch = {};

  Object.keys(versions).map(versionType => {
    versions[versionType].map((version, index) => {
      const docsLoader = new DocsLoader(version);
      const manifest = generateManifest(docsLoader.loadManifest()).spec;

      const content = extractContent({ version, manifest, docs, docsLoader });
      const navigation = generateNavigation(content);

      docsArch[version] = {
        content: content,
        navigation: navigation,
        manifest: manifest,
      };
    });
  });

  return docsArch;
};
