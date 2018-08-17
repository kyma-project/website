import React from "react";
import DocsFetcher from "../../helpers/DocsFetcher";
import MainPage from "./external/components/MainPage/MainPage.component";
import VersionSwitcher from "./navigation/VersionSwitcher";
import { Text } from "@kyma-project/react-components";
import { displayError } from "../../helpers/displayError";
import BackToTop from "./navigation/BackToTop";

class Docs extends React.Component {
  constructor(props) {
    super(props);

    const latestVersion = "latest";
    const version =
      (props.match.params && props.match.params.version) || latestVersion;

    this.state = {
      loading: true,
      navigation: null,
      manifest: null,
      version,
      error: undefined,
    };
  }

  async componentDidMount() {
    await this.refetchDocs(this.state.version);
  }

  async refetchDocs(version) {
    this.setState({ loading: true, version });

    const docsFetcher = new DocsFetcher(version, this.props.versions);

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
    const version = this.state.version;
    const newVersion = e.target.value;

    const currentPath = this.props.history.location.pathname;
    if (currentPath.search(version) === -1) {
      this.props.history.push(`${this.props.pageName}/${newVersion}/`);
    } else {
      this.props.history.push(currentPath.replace(version, newVersion));
    }

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
          versions={props.versions}
          topNavComponent={
            <>
              <BackToTop />
              <VersionSwitcher
                versions={props.versions}
                currentVersion={state.version}
                onChange={this.changeVersion}
              />
            </>
          }
          {...props}
        />
      </>
    );
  }
}

export default Docs;
