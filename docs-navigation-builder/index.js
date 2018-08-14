const fs = require('fs');
const glob = require('glob');

const DOCS_PATH = process.env.DOCS_PATH || './docs';
const FILE_NAME = process.env.FILE_NAME || 'navigation.json';
const OUT_PATH = process.env.OUT_PATH || './docs';

async function run() {
  console.log('Starting...');
  const files = await getAllJsonFiles(DOCS_PATH);
  const navigationFilePath = `${OUT_PATH}/${FILE_NAME}`;

  const navigation = {
    topics: [],
  };

  for (let i = 0; i < files.length; i++) {
    const f = files[i];

    try {
      const contentFile = fs.readFileSync(f, 'utf8');
      const topicNavigation = createTopicNavigation(contentFile);
      navigation.topics.push(topicNavigation);
    } catch (e) {
      console.log(
        `Error during processing ${f} file. ${e} Generation continues...`,
      );
    }
  }
  try {
    fs.writeFileSync(navigationFilePath, JSON.stringify(navigation));
    console.log(
      `Generation has finished! ${files.length} documentation files has been processed. Navigation file created at ${navigationFilePath}`,
    );
  } catch (e) {
    console.log(
      `Error during generation. Navigation file will not be created. Error: ${e}`,
    );
  }
}

async function getAllJsonFiles(p) {
  return new Promise((resolve, reject) => {
    glob(`${p}/**/*.json`, (err, files) => {
      if (err) return reject(err);
      return resolve(files);
    });
  });
}

function toAnchor(str) {
  return (
    str &&
    typeof str === 'string' &&
    str
      .trim()
      .replace(/\s/g, '-')
      .toLowerCase()
  );
}

function formatToLowerCase(str) {
  return str && str.toString().toLowerCase();
}

function createTopicNavigation(json) {
  const entry = JSON.parse(json);

  const obj = {
    id: entry.id,
    contentType: formatToLowerCase(entry.type),
    sections: [],
  };

  entry &&
    entry.docs &&
    entry.docs.map(d => {
      let section = {};
      let sec = obj.sections.find(s => s.topicType === d.type);
      let countbyType = entry.docs.filter(s => s.type === d.type).length;

      if (!sec) {
        let subsection = {};
        section = {
          topicType: d.type,
          titles: [
            {
              name: countbyType > 1 ? d.type : d.title,
              anchor: toAnchor(d.type),
              titles: [],
            },
          ],
        };

        if (countbyType > 1) {
          section.titles[section.titles.length - 1].titles.push({
            name: d.title,
            anchor: toAnchor(d.title),
          });
        }
        obj.sections.push(section);
      } else {
        sec.titles[sec.titles.length - 1].titles.push({
          name: d.title,
          anchor: toAnchor(d.title),
        });
      }
    });

  return obj;
}

run();
