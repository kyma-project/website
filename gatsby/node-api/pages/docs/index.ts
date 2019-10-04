import { createComponentDocsPage } from "./componentPage";
import { createModalDocsPage } from "./modalPage";
import { fixLinks } from "./fixLinks";
import { createDocsPage, prepareData, sortGroupOfNavigation } from "./helpers";
import { DocsContentItem, DocsNavigation } from "../utils";
import {
  DOCS_DIR,
  ASSETS_DIR,
  DOCS_PATH_PREFIX,
  DOCS_LATEST_VERSION,
  DOCS_SPECIFICATIONS_PATH,
} from "../../../constants";
import { CreatePageFn, GraphQLFunction } from "../../../types";

export interface CreateDocsPages {
  graphql: GraphQLFunction;
  createPage: CreatePageFn;
}

export const createDocsPages = async ({
  graphql,
  createPage: createPageFn,
}: CreateDocsPages) => {
  const preparedData = await prepareData({ graphql });
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
        const assetsPath = `/${ASSETS_DIR}${DOCS_DIR}${
          !version || version === DOCS_LATEST_VERSION ? latestVersion : version
        }/${topic}/${DOCS_DIR}${ASSETS_DIR}`;
        const specificationsPath = `/${ASSETS_DIR}${DOCS_DIR}${
          !version || version === DOCS_LATEST_VERSION ? latestVersion : version
        }/${topic}/${DOCS_SPECIFICATIONS_PATH}`;
        const modalUrlPrefix = `/${DOCS_PATH_PREFIX}/${
          !version || version === DOCS_LATEST_VERSION ? latestVersion : version
        }/${docsType}/${topic}/${DOCS_SPECIFICATIONS_PATH}`;

        let fixedContent = content[docsType][topic];
        fixedContent = fixLinks({
          content: fixedContent,
          version,
          latestVersion,
        });
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
        createComponentDocsPage({ createPage, context });
        createModalDocsPage({ createPage, context });
      });
    });
  });
};
