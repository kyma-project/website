const createTopicNavigation = content => {
  const topic = {
    id: content.id,
    contentType: toLowerCase(content.type),
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
        topicType: doc.type ? doc.type : null,
        name: name,
        anchor: toAnchor(name),
        titles: [],
      };

      topic.sections.push(section);
    }

    if (doc.type) {
      section.titles.push({
        name: doc.title,
        anchor: toAnchor(doc.title),
      });
    }
  });

  return topic;
};

const toLowerCase = value => {
  return value && value.toString().toLowerCase();
};

const toAnchor = value => {
  return toLowerCase(value)
    .trim()
    .replace(/\s/g, "-");
};

module.exports = content => {
  const navigation = {
    topics: [],
  };

  Object.keys(content).map(docsType => {
    Object.keys(content[docsType]).map(docsTopic => {
      const topic = createTopicNavigation(content[docsType][docsTopic]);

      navigation.topics.push(topic);
    });
  });

  return navigation;
};
