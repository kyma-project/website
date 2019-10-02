import { ContentLoader } from "./contentLoader";
import { extractSpecifications } from "./extractSpecifications";
import {
  ContentGQL,
  ManifestSpec,
  ManifestItem,
  DocsContent,
  DocsContentDocs,
} from "./types";
import { sortDocsByOrder, sortDocsByType, populateObject } from "./helpers";

export const extractContent = <T extends ContentGQL>({
  manifestSpec,
  contentGQLs,
  contentLoader,
  extractFn,
}: {
  manifestSpec: ManifestSpec;
  contentGQLs: T[];
  contentLoader: ContentLoader;
  extractFn: (
    doc: T,
    docsGroup: string,
    topicId: string,
  ) => DocsContentDocs | null;
}): DocsContent => {
  const content: DocsContent = {} as DocsContent;

  Object.keys(manifestSpec).map(docsGroup => {
    content[docsGroup] = {};
    const topics = populateObject<ManifestItem>(manifestSpec[docsGroup]);

    topics.map(topic => {
      const topicId = topic.id;
      const topicConfig = contentLoader.loadTopicConfig(topicId);
      const topicSpec = topicConfig.spec;
      const topicSpecifications = extractSpecifications(
        contentLoader,
        topicId,
        topicConfig.specifications,
      );

      let topicDocs: DocsContentDocs[] = [];
      contentGQLs.map(doc => {
        const d = extractFn(doc, docsGroup, topicId);
        if (d && Object.keys(d)) {
          topicDocs.push(d);
        }
      });

      topicDocs = sortDocsByOrder(topicDocs);
      topicDocs = sortDocsByType(topicDocs);

      content[docsGroup][topicId] = {
        ...topicSpec,
        type: topicSpec.type.toLowerCase(),
        docs: topicDocs,
        specifications: topicSpecifications,
      };
    });
  });

  return content;
};
