const {
  sortDocsByOrder,
  sortDocsByType,
  populateObject,
} = require("../helpers");

module.exports = ({ version, manifest, docs, docsLoader }) => {
  let content = {};

  Object.keys(manifest).map(docsType => {
    content[docsType] = {};
    const topics = populateObject(manifest[docsType]);

    topics.map(topic => {
      const topicId = topic.id;
      const topicConfig = docsLoader.loadTopicConfig(topicId).spec;

      let topicDocs = [];
      docs.map((doc, index) => {
        const {
          rawMarkdownBody,
          fields: {
            docInfo: { id, type, version: v, fileName },
          },
          frontmatter: { title, type: docType },
        } = doc.node;

        if (version === v && docsType === type && topicId === id) {
          let obj = {
            order: fileName,
            title: title,
            source: rawMarkdownBody,
          };

          if (docType) {
            obj["type"] = docType;
          }

          topicDocs.push(obj);
        }
      });

      topicDocs = sortDocsByOrder(topicDocs);
      topicDocs = sortDocsByType(topicDocs);

      content[docsType][topicId] = {
        ...topicConfig,
        type: topicConfig.type.toLowerCase(),
        docs: topicDocs,
      };
    });
  });

  return content;
};
