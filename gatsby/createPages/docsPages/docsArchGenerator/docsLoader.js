const { resolve } = require("path");
const fs = require("fs-extra");

const DOCS_FOLDER = "docs";

const VERSION_MANIFEST_YAML = "manifest.yaml";
const TOPIC_CONFIG_JSON = "docs.config.json";

class DocsLoader {
  constructor(version) {
    this.version = version;
  }

  loadManifest() {
    return fs.readFileSync(this.createPath(VERSION_MANIFEST_YAML), "utf8");
  }

  loadTopicConfig(topic) {
    return this.load(`${topic}/${TOPIC_CONFIG_JSON}`);
  }

  load(path) {
    return require(this.createPath(path));
  }

  createPath(path) {
    return resolve(
      __dirname,
      `../../../../content/${DOCS_FOLDER}/${this.version}/${path}`,
    );
  }
}

module.exports = DocsLoader;
