import React from "react";
import { Helmet } from "react-helmet";
import ContentWrapper from "./ContentWrapper.component";
import LoadingIndicator from "../../../../loading/LoadingIndicator";
import ui from "../../../../../locales/en/UI.json";
import DocsFetcher from "../../../../../helpers/DocsFetcher";
import { displayError } from "../../../../../helpers/displayError";
import Text from "../../../../content/Text";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: undefined,
    };
  }
  async componentDidMount() {
    const type = this.props.item.type;
    const id = this.props.item.id;
    await this.updateContent(this.props.version, type, id);
  }

  async UNSAFE_componentWillReceiveProps(newProps) {
    const type = newProps.item.type;
    const id = newProps.item.id;
    const version = newProps.version;

    if (
      type !== this.props.item.type ||
      id !== this.props.item.id ||
      version !== this.props.version
    ) {
      this.setState({
        loading: true,
      });
      await this.updateContent(version, type, id);
    }
  }

  updateContent = async (version, type, id) => {
    const docsFetcher = new DocsFetcher(version);
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
          `src="/docs/${version}/${type}/${id}/assets`,
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
