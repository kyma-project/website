import { ContentLoader } from "./contentLoader";
import {
  ContentQL,
  ManifestSpec,
  ManifestItem,
  DocsContent,
  DocsContentDocs,
} from "./types";
import { sortDocsByOrder, sortDocsByType, populateObject } from "./helpers";

export const extractContent = <T>({
  manifestSpec,
  contentQL,
  contentLoader,
}: {
  manifestSpec: ManifestSpec;
  contentQL: ContentQL<T>[];
  contentLoader: ContentLoader;
}): DocsContent => {
  const content: DocsContent = {} as DocsContent;

  Object.keys(manifestSpec).map(docsGroup => {
    content[docsGroup] = {};
    const topics = populateObject<ManifestItem>(manifestSpec[docsGroup]);

    topics.map(topic => {
      const topicId = topic.id;
      const topicConfig = contentLoader.loadTopicConfig(topicId).spec;
      let topicDocs: DocsContentDocs[] = [];

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
