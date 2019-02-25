const compareVersions = require("compare-versions");

const getDocs = async graphql => {
  const result = await graphql(`
    {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/docs/" } }) {
        edges {
          node {
            rawMarkdownBody
            fields {
              docInfo {
                id
                type
                version
                fileName
              }
              slug
            }
            frontmatter {
              title
              type
            }
          }
        }
      }
    }
  `);
  if (result.errors) {
    throw new Error(result.errors);
  }

  return result.data.allMarkdownRemark.edges;
};

const getDocsVersions = versions => {
  const versionsByType = {};

  const appendType = (type, versions, versionsByType) => {
    if (!versions || versions.length === 0) {
      return;
    }

    const sortedVersions = versions
      .map(version => version.name)
      .sort(compareVersions)
      .reverse();

    versionsByType[type] = sortedVersions;
  };

  appendType("releases", versions.releases, versionsByType);
  appendType("prereleases", versions.pre_releases, versionsByType);
  appendType("branches", versions.branches, versionsByType);

  return versionsByType;
};

const sortDocsByOrder = docs => {
  return docs.sort(sortFnByProperty("order"));
};

const sortFnByProperty = sortBy => {
  return (a, b) => {
    if (a[sortBy] && b[sortBy]) {
      const nameA = a[sortBy].toString().toLowerCase();
      const nameB = b[sortBy].toString().toLowerCase();

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    }
    return 0;
  };
};

const sortDocsByType = docs => {
  let docsTypes = [];
  docs.map(doc => {
    if (!docsTypes.includes(doc.type || doc.title)) {
      docsTypes.push(doc.type || doc.title);
    }
    return doc;
  });

  let sortedDocs = [];
  for (const type of docsTypes) {
    for (const doc of docs) {
      if (type === doc.type || (!doc.type && type === doc.title)) {
        sortedDocs.push(doc);
      }
    }
  }
  return sortedDocs;
};

const populateObject = obj => {
  if (Array.isArray(obj)) {
    return obj;
  }

  if (typeof obj === "object") {
    return [obj];
  }

  return [];
};

module.exports = {
  getDocs,
  getDocsVersions,
  sortDocsByOrder,
  sortDocsByType,
  populateObject,
};
