import axios from "axios";
import { withPrefix } from "gatsby";

const DOCS_LOCATION = "documentation";

class DocsFetcher {
  constructor(latest, selected, versions = []) {
    let version;
    if (selected === latest) {
      version = this.selectLatestVersion(versions);
    } else {
      version = selected;
    }

    this.setVersion(version);
  }

  selectLatestVersion = versions => {
    return versions.sort().reverse()[0];
  };

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
