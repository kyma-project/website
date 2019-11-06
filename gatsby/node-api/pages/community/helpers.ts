import { resolve } from "path";

import {
  docsGenerator,
  DocsGeneratorReturnType,
  getContent,
  DocsContentDocs,
  DocsContentItem,
} from "../utils";
import {
  DOCS_DIR,
  COMMUNITY_DIR,
  ASSETS_DIR,
  COMMUNITY_PATH_PREFIX,
} from "../../../constants";
import { CommunityGQL, CommunityPathsArgs, CommunityPaths } from "./types";
import {
  CreatePageFn,
  CreatePageFnArgs,
  GraphQLFunction,
} from "../../../types";

export const createCommunityPage = (
  createPage: CreatePageFn,
  context: any,
): CreatePageFn => {
  const communityTemplate: string = resolve(
    __dirname,
    "../../../../src/views/community/index.tsx",
  );

  return (props: CreatePageFnArgs) => {
    createPage({
      ...props,
      component: communityTemplate,
      context: {
        ...context,
        ...props.context,
      },
    });
  };
};

export const prepareData = async (
  graphql: GraphQLFunction,
): Promise<DocsGeneratorReturnType> => {
  const docs = await getContent<CommunityGQL>(
    graphql,
    "/content/community/",
    `docInfo {
      id
      type
      fileName
    }`,
  );

  return docsGenerator<CommunityGQL>(docs, "community", extractFn);
};

const extractFn = (
  doc: CommunityGQL,
  docsGroup: string,
  topicId: string,
): DocsContentDocs | null => {
  const {
    rawMarkdownBody,
    fields: {
      docInfo: { id, type, fileName },
    },
    frontmatter: { title, type: docType },
  } = doc;

  if (!(docsGroup === type && topicId === id)) {
    return null;
  }

  const obj: DocsContentDocs = {
    order: fileName,
    title,
    source: rawMarkdownBody,
  };

  if (docType) {
    obj.type = docType;
  }

  return obj;
};

export const prepareWebsitePaths = ({
  topicsKeys,
  docsType,
  topic,
}: CommunityPathsArgs): CommunityPaths => {
  const assetsPath = `/${ASSETS_DIR}${COMMUNITY_DIR}${topic}/${DOCS_DIR}${ASSETS_DIR}`;
  const rootPagePath = `/${COMMUNITY_PATH_PREFIX}`;
  const pagePath = `/${COMMUNITY_PATH_PREFIX}/${
    topicsKeys.length > 1 ? `${docsType}/` : ""
  }${topic}`;

  return {
    assetsPath,
    pagePath,
    rootPagePath,
  };
};

export const preparePreviewPaths = ({
  topicsKeys,
  docsType,
  topic,
}: CommunityPathsArgs): CommunityPaths => {
  const assetsPath = `/${ASSETS_DIR}${COMMUNITY_DIR}${topic}/${DOCS_DIR}${ASSETS_DIR}`;
  const rootPagePath = `/`;
  const pagePath = `/${topicsKeys.length > 1 ? `${docsType}/` : ""}${topic}`;

  return {
    assetsPath,
    pagePath,
    rootPagePath,
  };
};

export const addCommunityPrefixInInternalLinks = (
  content: DocsContentItem,
): DocsContentItem => {
  const MD_LINKS_REGEX = /\[([^\[]+)\]\(([^\)]+)\)/g;

  content.docs = content.docs.map(doc => ({
    ...doc,
    source: doc.source.replace(MD_LINKS_REGEX, occurrence => {
      MD_LINKS_REGEX.lastIndex = 0;
      const href = MD_LINKS_REGEX.exec(occurrence);

      if (!href || !href[2]) {
        return occurrence;
      }

      const h = href[2];

      if (
        h.startsWith("http") ||
        h.startsWith("./assets") ||
        h.startsWith("assets") ||
        h.startsWith("#")
      ) {
        return occurrence;
      }

      occurrence = occurrence.replace(h, oldHref =>
        oldHref.startsWith("/")
          ? `/community${oldHref}`
          : `/community/${oldHref}`,
      );

      return occurrence;
    }),
  }));

  return content;
};
