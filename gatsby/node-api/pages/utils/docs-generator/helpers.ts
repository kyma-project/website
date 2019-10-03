import { ContentGQL, DocsContentDocs } from "./types";
import { GraphQLFunction } from "../../../../types";

const getContent = async <T extends ContentGQL>(
  graphql: GraphQLFunction,
  dir: string,
  additionalFields: string,
): Promise<T[]> => {
  const result = await graphql(`
    {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "${dir}" } }) {
        edges {
          node {
            rawMarkdownBody
            fields {
              ${additionalFields}
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

  return result.data.allMarkdownRemark.edges.map((e: any) => e.node) as T[];
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

    if (nameA === "readme") {
      return -1;
    }
    if (nameB === "readme") {
      return 1;
    }
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

export { getContent, sortDocsByOrder, sortDocsByType, populateObject };
