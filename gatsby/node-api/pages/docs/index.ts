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
import { CreatePageFn, GraphQLFunction } from "../../../types";
import { BuildFor } from "../../../../src/types/common";

export interface CreateDocsPages {
  graphql: GraphQLFunction;
  createPage: CreatePageFn;
  buildFor: BuildFor;
}

export const createDocsPages = async ({
  graphql,
  createPage: createPageFn,
  buildFor,
}: CreateDocsPages) => {
  const preparePaths =
    buildFor === BuildFor.DOCS_PREVIEW
      ? preparePreviewPaths
      : prepareWebsitePaths;

  const preparedData = await prepareData({ graphql, buildFor });
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
            latestVersion,
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
        };

        const createPage = createDocsPage(createPageFn, context);
        createComponentDocsPage({
          createPage,
          context,
          path: pagePath,
          rootPath: rootPagePath,
        });
        createModalDocsPage({ createPage, context });
      });
    });
  });
};
