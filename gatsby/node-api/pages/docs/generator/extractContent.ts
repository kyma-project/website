import { DocsLoader } from "./docsLoader";
import {
  DocQL,
  ManifestSpec,
  ManifestItem,
  DocsContent,
  DocsContentDocs,
  DocsType,
} from "../types";
import { sortDocsByOrder, sortDocsByType, populateObject } from "../helpers";

export const extractContent = ({
  version,
  manifest,
  docs,
  docsLoader,
}: {
  version: string;
  manifest: ManifestSpec;
  docs: DocQL[];
  docsLoader: DocsLoader;
}): DocsContent => {
  let content: DocsContent = {} as DocsContent;

  Object.keys(manifest).map(docsType => {
    content[docsType] = {};
    const topics = populateObject<ManifestItem>(manifest[docsType]);

    topics.map(topic => {
      const topicId = topic.id;
      const topicConfig = docsLoader.loadTopicConfig(topicId).spec;

      let topicDocs: DocsContentDocs[] = [];
      docs.map((doc, index) => {
        const {
          rawMarkdownBody,
          fields: {
            docInfo: { id, type, version: v, fileName },
          },
          frontmatter: { title, type: docType },
        } = doc;

        if (version === v && docsType === type && topicId === id) {
          let obj: DocsContentDocs = {
            order: fileName,
            title: title,
            source: rawMarkdownBody,
          };

          if (docType) {
            obj.type = docType;
          }

          topicDocs.push(obj);
        }
      });

      topicDocs = sortDocsByOrder(topicDocs);
      topicDocs = sortDocsByType(topicDocs);

      content[docsType][topicId] = {
        ...topicConfig,
        type: topicConfig.type.toLowerCase() as DocsType,
        docs: topicDocs,
      };
    });
  });

  return content;
};
