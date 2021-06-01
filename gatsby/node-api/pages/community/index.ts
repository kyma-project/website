import { createComponentCommunityPage } from "./componentPage";
import {
  createCommunityPage,
  prepareData,
  prepareWebsitePaths,
  addCommunityPrefixInInternalLinks,
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
  const preparePaths = prepareWebsitePaths;
  const { content, navigation, manifest } = await prepareData(graphql);

  const topicsKeys = Object.keys(content);

  topicsKeys.map(topic => {
    const { assetsPath, pagePath, rootPagePath } = preparePaths({ topic });

    // tslint:disable-next-line:no-console
    console.log(pagePath);

    let sources = content[topic];
    if (buildFor !== BuildFor.COMMUNITY_PREVIEW) {
      sources = addCommunityPrefixInInternalLinks(sources);
    }

    const context = {
      content: sources,
      navigation,
      manifest,
      assetsPath,
      docsType: "",
      basePath: "",
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
};
