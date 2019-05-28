import createContainer from "constate";

export interface Props {
  docsMetadata?: {
    version?: string;
    language?: string;
  };
}

export interface ReturnType {
  docsMetadata: {
    version: string;
    language: string;
  };
}

const LayoutService = (input: Props): ReturnType => {
  const version = input.docsMetadata && input.docsMetadata.version;
  const language = input.docsMetadata && input.docsMetadata.language;

  return {
    docsMetadata: {
      version: version || "latest",
      language: language || "en",
    },
  };
};

const { Provider, Context } = createContainer(LayoutService);
export { Provider };
export default Context;
