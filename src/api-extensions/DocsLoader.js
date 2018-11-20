const DOCS_LOCATION = "static/documentation";

class DocsLoader {
  constructor(version) {
    this.version = version;
  }

  loadNavigation() {
    return this.load(`${this.version}/navigation`);
  }

  loadManifest() {
    return this.load(`${this.version}/manifest`);
  }

  loadContent(type, id) {
    return this.load(`${this.version}/${type}/${id}/content`);
  }

  load(path) {
    return require(`../../${DOCS_LOCATION}/${path}.json`);
  }
}

module.exports = DocsLoader;
