const glob = require("glob");
const fs = require("fs-extra");

function generateNavigation(source, destination) {
  const files = getAllContentJsonFiles(source);
  const navigation = {
    topics: [],
  };

  files.forEach(file => {
    const content = fs.readJsonSync(file, { encoding: "utf8" });
    const topic = createTopicNavigation(content);

    navigation.topics.push(topic);
  });

  fs.writeJsonSync(destination, navigation, { encoding: "utf8" });
}

function createTopicNavigation(content) {
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
}

function getAllContentJsonFiles(path) {
  return glob.sync(`${path}/**/content.json`);
}

function toLowerCase(value) {
  return value && value.toString().toLowerCase();
}

function toAnchor(value) {
  return toLowerCase(value)
    .trim()
    .replace(/\s/g, "-");
}

module.exports = {
  generateNavigation,
};
