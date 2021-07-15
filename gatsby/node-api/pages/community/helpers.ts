import { join, resolve } from "path";
import {
  ASSETS_DIR,
  COMMUNITY_DIR,
  COMMUNITY_PATH_PREFIX,
  DOCS_DIR,
} from "../../../constants";
import {
  CreatePageFn,
  CreatePageFnArgs,
  GraphQLFunction,
} from "../../../types";
import {
  DocsContentDocs,
  DocsContentItem,
  docsGenerator,
  DocsGeneratorReturnType,
  getContent,
} from "../utils";
import { CommunityGQL, CommunityPaths, CommunityPathsArgs } from "./types";

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
    }`,
  );

  return docsGenerator<CommunityGQL>(docs, "community");
};

export const prepareWebsitePaths = ({
  topic,
}: CommunityPathsArgs): CommunityPaths => {
  // remove `README` for nodes
  if (topic.endsWith("README")) {
    topic = topic.replace("README", "");
  }

  // remove name of file
  const tmp = topic.split("/");
  tmp.pop();
  const subtopic = tmp.join("/");

  const assetBasePath = join("/", ASSETS_DIR, COMMUNITY_DIR);
  const assetsPath = join(assetBasePath, subtopic, ASSETS_DIR);

  const rootPagePath = join("/", COMMUNITY_PATH_PREFIX);

  if (topic.endsWith("README")) {
    topic = topic.replace("README", "");
  }
  const pagePath = join("/", COMMUNITY_PATH_PREFIX, topic);

  return {
    assetsPath,
    pagePath,
    rootPagePath,
  };
};

export const processInternalLinks = (
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

      return occurrence.replace(".md", "");
    }),
  }));

  return content;
};
