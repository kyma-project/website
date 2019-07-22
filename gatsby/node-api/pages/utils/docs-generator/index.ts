import { ContentLoader } from "./contentLoader";
import { extractContent } from "./extractContent";
import { loadManifest } from "./loadManifest";
import { createNavigation } from "./createNavigation";
import { ContentQL, DocsContentDocs } from "./types";

const contentLoader = new ContentLoader();

export const docsGenerator = <T extends ContentQL>(
  contentQL: T[],
  folder: string,
  extractFn: (
    doc: T,
    topicDocs: DocsContentDocs[],
    docsGroup: string,
    topicId: string,
  ) => void,
  version?: string,
) => {
  contentLoader.setFolder(folder);
  contentLoader.setVersion(version ? version : "");

  const manifestSpec = loadManifest(contentLoader.loadManifest()).spec;
  const navigation = createNavigation(manifestSpec);
  const content = extractContent<T>({
    manifestSpec,
    contentQL,
    contentLoader,
    extractFn,
  });

  return {
    content,
    navigation,
    manifest: manifestSpec,
  };
};

export type DocsGeneratorReturnType = ReturnType<typeof docsGenerator>;
