import React from "react";
import DocsFetcher from "../../helpers/DocsFetcher";
import MainPage from "./external/components/MainPage/MainPage.component";
import VersionSwitcher from "./navigation/VersionSwitcher";
import { Text } from "@kyma-project/react-components";
import { displayError } from "../../helpers/displayError";
import BackToTop from "./navigation/BackToTop";

class Docs extends React.PureComponent {
  constructor(props) {
    super(props);

    const propsVersion =
      (props.match.params && props.match.params.version) || "latest";
    const version =
      propsVersion === "latest" ? props.latestVersion : propsVersion;

    this.state = {
      loading: true,
      navigation: null,
      manifest: null,
      version: version,
      error: undefined,
    };
  }

  async componentDidMount() {
    await this.refetchDocs(this.state.version);
  }

  async refetchDocs(version) {
    this.setState({ loading: true, version });

    const docsFetcher = new DocsFetcher(
      this.props.latestVersion,
      version,
      this.props.versions,
    );

    let err;
    let navigation;
    let manifest;
    try {
      navigation = await docsFetcher.fetchNavigation();
      manifest = await docsFetcher.fetchManifest();
    } catch (e) {
      err = e;
    }

    this.setState({
      navigation,
      manifest,
      loading: false,
      error: err,
    });
  }

  changeVersion = async e => {
    const newVersion = e.target.value;

    let path = `/${this.props.pageName}`;
    if (newVersion !== this.props.latestVersion) {
      path += `/${newVersion}`;
    }

    if (this.props.match.params.type && this.props.match.params.id) {
      path += `/${this.props.match.params.type}/${this.props.match.params.id}`;
    }

    if (this.props.location.hash) {
      path += this.props.location.hash;
    }

    this.props.history.replace(path);
    await this.refetchDocs(newVersion);
  };

  render() {
    const state = this.state;
    const props = this.props;

    if (state.loading) {
      return null;
    }

    if (state.error) {
      return <Text>{displayError(state.error)}</Text>;
    }

    return (
      <>
        <MainPage
          topics={state.navigation}
          manifest={state.manifest.spec}
          docsFetcher={this.docsFetcher}
          version={state.version}
          latestVersion={props.latestVersion}
          versions={props.versions}
          location={props.location}
          history={props.history}
          match={props.match}
          pageName={props.pageName}
          topNavComponent={
            <>
              <BackToTop />
              <VersionSwitcher
                latestVersion={props.latestVersion}
                versions={props.versions}
                currentVersion={state.version}
                onChange={this.changeVersion}
              />
            </>
          }
        />
      </>
    );
  }
}

export default Docs;
