import { existsSync } from "fs";
import { resolve } from "path";
import { createComponentDocsPage } from "./componentPage";
import { createModalDocsPage } from "./modalPage";
import { fixLinks } from "./fixLinks";
import {
  createDocsPage,
  prepareData,
  sortGroupOfNavigation,
  prepareWebsitePaths,
  preparePreviewPaths,
} from "./helpers";
import { DocsNavigation } from "../utils";
import {
  CreatePageFn,
  CreateRedirectFn,
  GraphQLFunction,
} from "../../../types";
import { BuildFor } from "../../../../src/types/common";
import { DocsRepository } from "./types";

import config from "../../../../config.json";

export interface CreateDocsPages {
  graphql: GraphQLFunction;
  createPage: CreatePageFn;
  createRedirect: CreateRedirectFn;
  buildFor: BuildFor;
  prepareForRepo?: string;
}

export const createDocsPages = async (options: CreateDocsPages) => {
  const reposData: { [repo: string]: DocsRepository } = config.docs;
  const repositoryName = options.prepareForRepo;

  if (repositoryName) {
    await createDocsPagesPerRepo(
      repositoryName,
      reposData[repositoryName],
      options,
    );
    return;
  }

  for (const [repoName, repository] of Object.entries(config.docs)) {
    await createDocsPagesPerRepo(repoName, repository, options);
  }
};

const createDocsPagesPerRepo = async (
  repositoryName: string,
  repository: DocsRepository,
  {
    graphql,
    createPage: createPageFn,
    createRedirect,
    buildFor,
  }: CreateDocsPages,
) => {
  const pathToRepo = resolve(
    __dirname,
    `../../../../content/docs/${repositoryName}`,
  );
  if (!existsSync(pathToRepo)) {
    return;
  }

  const preparePaths =
    buildFor === BuildFor.DOCS_PREVIEW
      ? preparePreviewPaths
      : prepareWebsitePaths;

  const preparedData = await prepareData({ graphql, buildFor, repositoryName });
  if (!preparedData) {
    return;
  }
  const { versions, latestVersion, docsArch } = preparedData;

  Object.keys(docsArch).map(version => {
    const { content, navigation } = docsArch[version];
    const sortedNavigation: DocsNavigation = sortGroupOfNavigation(navigation);

    Object.keys(content).map(docsType => {
      const topics = content[docsType];

      Object.keys(topics).map(topic => {
        const {
          assetsPath,
          specificationsPath,
          modalUrlPrefix,
          pagePath,
          rootPagePath,
        } = preparePaths({
          repositoryName,
          version,
          latestVersion: latestVersion || "",
          docsType,
          topic,
        });

        let fixedContent = content[docsType][topic];
        if (buildFor !== BuildFor.DOCS_PREVIEW) {
          fixedContent = fixLinks({
            content: fixedContent,
            version,
          });
        }
        const specifications = fixedContent.specifications.map(
          specification => ({
            ...specification,
            assetPath: `${specificationsPath}/${specification.assetPath}`,
            pageUrl: `${modalUrlPrefix}/${specification.id}`,
          }),
        );

        const context = {
          content: fixedContent,
          navigation: sortedNavigation,
          manifest: sortedNavigation,
          versions,
          version,
          assetsPath,
          docsType,
          topic,
          specifications,
          repositoryName,
        };

        const createPage = createDocsPage(createPageFn, context);
        createComponentDocsPage({
          createPage,
          createRedirect,
          context,
          path: pagePath,
          rootPath: rootPagePath,
          repository,
        });
        createModalDocsPage({ createPage, context });
      });
    });
  });
};
