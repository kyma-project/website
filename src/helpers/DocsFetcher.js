import axios from "axios";
import { withPrefix } from "gatsby";

const DOCS_LOCATION = "docs";

class DocsFetcher {
  constructor(version) {
    this.setVersion(version);
  }

  fetchNavigation = async () => {
    return await this.fetch(
      `/${DOCS_LOCATION}/${this.version}/navigation.json`,
    );
  };

  fetchManifest = async () => {
    return await this.fetch(`/${DOCS_LOCATION}/${this.version}/manifest.json`);
  };

  fetchContent = async (type, id) => {
    return await this.fetch(
      `/${DOCS_LOCATION}/${this.version}/${type}/${id}/content.json`,
    );
  };

  setVersion = version => {
    this.version = version;
  };

  fetch = async url => {
    const response = await axios(withPrefix(url));
    return response.data;
  };
}

export default DocsFetcher;
