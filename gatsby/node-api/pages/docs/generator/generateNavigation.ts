import {
  DocsNavigation,
  DocsContent,
  DocsContentItem,
  DocsNavigationTopic,
  DocsNavigationSectionTitles,
  DocsType,
} from "../types";

const createTopic = (content: DocsContentItem) => {
  const topic: DocsNavigationTopic = {
    id: content.id,
    contentType: toLowerCase(content.type) as DocsType,
    sections: [],
  };

  const docs = content.docs ? content.docs : [];
  docs.forEach(doc => {
    let section = topic.sections.find(
      section => section.topicType === doc.type,
    );

    if (!section) {
      const name = doc.type ? doc.type : doc.title;
      section = {
        topicType: doc.type,
        name,
        anchor: toAnchor(name),
        titles: [] as DocsNavigationSectionTitles[],
      };

      topic.sections.push(section);
    }

    if (doc.type && section.titles) {
      section.titles.push({
        name: doc.title,
        anchor: toAnchor(doc.title),
      });
    }
  });

  return topic;
};

const toLowerCase = (value: string) => {
  return value && value.toString().toLowerCase();
};

const toAnchor = (value: string) => {
  return toLowerCase(value)
    .trim()
    .replace(/\s/g, "-");
};

export const generateNavigation = (content: DocsContent): DocsNavigation => {
  const navigation: DocsNavigation = {
    topics: [],
  };

  Object.keys(content).map(docsType => {
    Object.keys(content[docsType]).map(docsTopic => {
      const topic = createTopic(content[docsType][docsTopic]);

      navigation.topics.push(topic);
    });
  });

  return navigation;
};
