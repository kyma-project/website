import { resolve } from "path";
import { fixLinks } from "./fixLinks";
import { getDocsVersions, sortGroupOfNavigation } from "./helpers";
import {
  docsGenerator,
  DocsGeneratorReturnType,
  getContent,
  DocsContentDocs,
  DocsContentItem,
  DocsNavigation,
} from "../utils";
import { DocGQL } from "./types";
import {
  DOCS_DIR,
  ASSETS_DIR,
  DOCS_PATH_PREFIX,
  DOCS_LATEST_VERSION,
  DOCS_ROOT_TYPE,
  DOCS_KYMA_ID,
} from "../../../constants";
import { CreatePageFn, GraphQLFunction } from "../../../types";

const extractFn = (version: string) => (
  doc: DocGQL,
  docsGroup: string,
  topicId: string,
): DocsContentDocs | null => {
  const {
    rawMarkdownBody,
    fields: {
      docInfo: { id, type, version: v, fileName },
    },
    frontmatter: { title, type: docType },
  } = doc;

  if (version === v && docsGroup === type && topicId === id) {
    let obj: DocsContentDocs = {
      order: fileName,
      title: title,
      source: rawMarkdownBody,
    };

    if (docType) {
      obj.type = docType;
    }

    return obj;
  }
  return null;
};

export interface CreateDocsPages {
  graphql: GraphQLFunction;
  createPage: CreatePageFn;
}

export const createDocsPages = async ({
  graphql,
  createPage,
}: CreateDocsPages) => {
  const docsTemplate: string = resolve(
    __dirname,
    "../../../../src/views/docs/index.tsx",
  );

  const versions = getDocsVersions(
    require("../../../../content/docs/versions"),
  );
  if (Object.keys(versions).length === 0) {
    console.error("No docs versions found");
    return;
  }
  const latestVersion = versions.releases[0];

  const docs = await getContent<DocGQL>(
    graphql,
    "/content/docs/",
    `docInfo {
      id
      type
      version
      fileName
    }`,
  );

  const docsArch: { [version: string]: DocsGeneratorReturnType } = {};
  for (const versionType in versions) {
    for (const version of versions[versionType]) {
      docsArch[version] = docsGenerator<DocGQL>(
        docs,
        "docs",
        extractFn(version),
        version,
      );
    }
  }

  docsArch[DOCS_LATEST_VERSION] = JSON.parse(
    JSON.stringify(docsArch[latestVersion]),
  );
  docsArch[""] = JSON.parse(JSON.stringify(docsArch[latestVersion]));

  Object.keys(docsArch).map(version => {
    const { content, navigation, manifest } = docsArch[version];
    const sortedNavigation: DocsNavigation = sortGroupOfNavigation(navigation);

    Object.keys(content).map(docsType => {
      const topics = content[docsType];

      Object.keys(topics).map(topic => {
        const assetsPath = `/${ASSETS_DIR}${DOCS_DIR}${
          !version || version === DOCS_LATEST_VERSION ? latestVersion : version
        }/${topic}/${DOCS_DIR}${ASSETS_DIR}`;

        let newContent = content[docsType][topic] as DocsContentItem;
        newContent = fixLinks({
          content: newContent,
          version,
          latestVersion,
        });

        createPage({
          path: `/${DOCS_PATH_PREFIX}/${
            version ? `${version}/` : ""
          }${docsType}/${topic}`,
          component: docsTemplate,
          context: {
            version,
            versions,
            content: newContent,
            navigation: sortedNavigation,
            manifest: sortedNavigation,
            assetsPath,
            docsType,
            topic,
          },
        });

        // for root path: /docs -> /docs/root/kyma
        if (DOCS_ROOT_TYPE === docsType && DOCS_KYMA_ID === topic) {
          createPage({
            path: `/${DOCS_PATH_PREFIX}/${version}`,
            component: docsTemplate,
            context: {
              version,
              versions,
              content: newContent,
              navigation: sortedNavigation,
              manifest: sortedNavigation,
              assetsPath,
              docsType,
              topic,
            },
          });
        }
      });
    });
  });
};
