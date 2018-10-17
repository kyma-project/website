import React from "react";
import { Helmet } from "react-helmet";
import ContentWrapper from "./ContentWrapper.component";
import LoadingIndicator from "../../../../loading/LoadingIndicator";
import ui from "../../../../../locales/en/UI.json";
import DocsFetcher from "../../../../../helpers/DocsFetcher";
import { displayError } from "../../../../../helpers/displayError";
import Text from "../../../../content/Text";
import { goToAnchor } from "react-scrollable-anchor";

export default class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: undefined,
    };
  }
  async componentDidMount() {
    const { type, id, hash } = this.props.item;
    await this.updateContent(this.props.version, type, id);
    goToAnchor(hash);
  }

  async UNSAFE_componentWillReceiveProps(newProps) {
    const { version, item } = newProps;
    const { type, id, hash } = item;

    const currentItem = { ...this.props.item };

    if (
      type !== currentItem.type ||
      id !== currentItem.id ||
      version !== this.props.version
    ) {
      this.setState({
        loading: true,
      });
      await this.updateContent(version, type, id);
    }

    if (hash !== currentItem.hash) {
      goToAnchor(hash);
    }
  }

  updateContent = async (version, type, id) => {
    const versions = this.props.versions;
    const latest = this.props.latestVersion;
    const docsFetcher = new DocsFetcher(latest, version, versions);
    let content;
    let err;
    try {
      content = await docsFetcher.fetchContent(type, id);
      content.docs = this.replaceImagePaths(content.docs, {
        version: docsFetcher.version,
        type,
        id,
      });
    } catch (e) {
      err = e;
    }

    this.setState({
      loading: false,
      content,
      error: err,
    });
  };

  replaceImagePaths = (inputDocs, { version, type, id }) => {
    return inputDocs.map(doc => {
      if (doc.source.search(/.?\/?assets/g) !== -1) {
        doc.source = doc.source.replace(
          /src="\.?\/?assets/g,
          `src="/documentation/${version}/${type}/${id}/assets`,
        );
      }

      return doc;
    });
  };

  render() {
    if (this.state.loading) {
      return <LoadingIndicator />;
    }

    const error = this.state.error;
    if (error) {
      return <Text>{displayError(error)}</Text>;
    }

    const content = this.state.content;
    return (
      <>
        <Helmet
          title={`${content.displayName} - ${ui.navigation.documentation}`}
        />
        <ContentWrapper content={content} {...this.props} />
      </>
    );
  }
}
