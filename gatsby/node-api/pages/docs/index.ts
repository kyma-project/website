import { existsSync } from "fs";
import { resolve } from "path";
import config from "../../../../config.json";
import { BuildFor } from "../../../../src/types/common";
import {
  CreatePageFn,
  CreateRedirectFn,
  GraphQLFunction,
} from "../../../types";
import { createComponentDocsPage } from "./componentPage";
import { fixLinks } from "./fixLinks";
import { createDocsPage, prepareData, prepareWebsitePaths } from "./helpers";
import { createModalDocsPage } from "./modalPage";
import { DocsRepository } from "./types";

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

  const preparedData = await prepareData({ graphql, buildFor, repositoryName });
  if (!preparedData) {
    return;
  }
  const { versions, latestVersion, docsArch } = preparedData;

  Object.keys(docsArch).map(version => {
    const { content, navigation } = docsArch[version];
    navigation.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
    // const sortedNavigation: DocsNavigation = sortGroupOfNavigation({});
    // const sortedNavigation: DocsNavigationElement[] = navigation

    const v = version;
    // if (version === latestVersion) {
    //     v = "latest1"
    // }

    // const v =
    //   !version || version === DOCS_LATEST_VERSION ? latestVersion : version;

    console.log(`version: ${v}`);
    Object.keys(content).map(topic => {
      const {
        assetsPath,
        specificationsPath,
        modalUrlPrefix,
        pagePath,
        basePath,
      } = prepareWebsitePaths({
        repositoryName,
        version: v,
        topic,
      });

      let fixedContent = content[topic];
      fixedContent = fixLinks({ content: fixedContent, version: v });
      // if (buildFor !== BuildFor.DOCS_PREVIEW) {
      //   fixedContent = fixLinks({
      //     content: fixedContent,
      //     version: v,
      //   });
      // }

      const specifications = fixedContent.specifications.map(specification => ({
        ...specification,
        assetPath: `${specificationsPath}/${specification.assetPath}`,
        pageUrl: `${modalUrlPrefix}/${specification.id}`,
      }));

      // console.log(`Register page path: ${pagePath}, asset: ${assetsPath}`);
      const context = {
        content: fixedContent,
        navigation,
        manifest: navigation,
        versions,
        v,
        pagePath,
        assetsPath,
        basePath,
        repoName: repositoryName,
        topic,
        specifications,
      };

      const createPage = createDocsPage(createPageFn, context);
      createComponentDocsPage({
        createPage,
        createRedirect,
        context,
        path: pagePath,
        rootPath: "",
        repository,
      });
      createModalDocsPage({ createPage, context });
    });
  });
  // });
};
