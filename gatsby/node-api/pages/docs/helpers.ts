import compareVersions from "compare-versions";
import { DocQL, DocsVersions, DocsContentDocs } from "./types";
import {
  DocsGeneratedVersions,
  DocsBranchesVersion,
  DocsReleasesVersion,
} from "../../../../tools/content-loader/src/prepare-docs/docs-versions";

const getDocs = async (graphql: Function): Promise<DocQL[]> => {
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

  return result.data.allMarkdownRemark.edges.map((e: any) => e.node);
};

const getDocsVersions = (versions: DocsGeneratedVersions): DocsVersions => {
  const versionsByType: DocsVersions = {};

  const appendType = (
    type: string,
    versions: Array<DocsReleasesVersion | DocsBranchesVersion>,
    versionsByType: DocsVersions,
  ) => {
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

const sortDocsByOrder = (docs: DocsContentDocs[]) =>
  docs.sort(sortFnByProperty<DocsContentDocs>("order"));

const sortDocsByType = (docs: DocsContentDocs[]): DocsContentDocs[] => {
  const docsTypes: string[] = [];
  docs.map(doc => {
    if (!docsTypes.includes(doc.type || doc.title)) {
      docsTypes.push(doc.type || doc.title);
    }
    return doc;
  });

  const sortedDocs: DocsContentDocs[] = [];
  for (const type of docsTypes) {
    for (const doc of docs) {
      if (type === doc.type || (!doc.type && type === doc.title)) {
        sortedDocs.push(doc);
      }
    }
  }
  return sortedDocs;
};

const sortFnByProperty = <T extends { [k: string]: any }>(sortBy: string) => (
  a: T,
  b: T,
) => {
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

const populateObject = <T = any>(obj: any | any[]): T[] => {
  if (Array.isArray(obj)) {
    return obj;
  }

  if (typeof obj === "object") {
    return [obj];
  }

  return [];
};

export {
  getDocs,
  getDocsVersions,
  sortDocsByOrder,
  sortDocsByType,
  populateObject,
};
