import { createComponentCommunityPage } from "./componentPage";
import {
  createCommunityPage,
  prepareData,
  prepareWebsitePaths,
  preparePreviewPaths,
} from "./helpers";
import { CreatePageFn, GraphQLFunction } from "../../../types";

import { BuildFor } from "../../../../src/types/common";

export interface CreateCommunityPages {
  graphql: GraphQLFunction;
  createPage: CreatePageFn;
  buildFor: BuildFor;
}

export const createCommunityPages = async ({
  graphql,
  createPage: createPageFn,
  buildFor,
}: CreateCommunityPages) => {
  const preparePaths =
    buildFor === BuildFor.COMMUNITY_PREVIEW
      ? preparePreviewPaths
      : prepareWebsitePaths;
  const { content, navigation, manifest } = await prepareData(graphql);

  Object.keys(content).map(docsType => {
    const topics = content[docsType];
    const topicsKeys = Object.keys(topics);

    topicsKeys.map(topic => {
      const { assetsPath, pagePath, rootPagePath } = preparePaths({
        topicsKeys,
        docsType,
        topic,
      });

      const context = {
        content: content[docsType][topic],
        navigation,
        manifest,
        assetsPath,
        docsType,
        topic,
      };

      const createPage = createCommunityPage(createPageFn, context);
      createComponentCommunityPage({
        createPage,
        context,
        path: pagePath,
        rootPath: rootPagePath,
      });
    });
  });
};
