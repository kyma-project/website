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

const LayoutService = (input: Props): ReturnType => ({
  docsMetadata: {
    version: input.docsMetadata.version || "latest",
    language: input.docsMetadata.language || "en",
  },
});

const { Provider, Context } = createContainer(LayoutService);
export { Provider };
export default Context;
