import { resolve } from "path";

import {
  docsGenerator,
  DocsGeneratorReturnType,
  getContent,
  DocsContentDocs,
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

  if (docsGroup === type && topicId === id) {
    const obj: DocsContentDocs = {
      order: fileName,
      title,
      source: rawMarkdownBody,
    };

    if (docType) {
      obj.type = docType;
    }

    return obj;
  }
  return null;
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
