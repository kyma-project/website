import { ContentLoader } from "./contentLoader";
import {
  ContentQL,
  ManifestSpec,
  ManifestItem,
  DocsContent,
  DocsContentDocs,
} from "./types";
import { sortDocsByOrder, sortDocsByType, populateObject } from "./helpers";

export const extractContent = <T extends ContentQL>({
  manifestSpec,
  contentQL,
  contentLoader,
  extractFn,
}: {
  manifestSpec: ManifestSpec;
  contentQL: T[];
  contentLoader: ContentLoader;
  extractFn: (
    doc: T,
    topicDocs: DocsContentDocs[],
    docsGroup: string,
    topicId: string,
  ) => void;
}): DocsContent => {
  const content: DocsContent = {} as DocsContent;

  Object.keys(manifestSpec).map(docsGroup => {
    content[docsGroup] = {};
    const topics = populateObject<ManifestItem>(manifestSpec[docsGroup]);

    topics.map(topic => {
      const topicId = topic.id;
      const topicConfig = contentLoader.loadTopicConfig(topicId).spec;

      let topicDocs: DocsContentDocs[] = [];
      contentQL.map(doc => {
        extractFn(doc, topicDocs, docsGroup, topicId);
      });

      topicDocs = sortDocsByOrder(topicDocs);
      topicDocs = sortDocsByType(topicDocs);

      content[docsGroup][topicId] = {
        ...topicConfig,
        type: topicConfig.type.toLowerCase(),
        docs: topicDocs,
      };
    });
  });

  return content;
};
