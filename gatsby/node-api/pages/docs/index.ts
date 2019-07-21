import { resolve } from "path";
import { generator } from "./generator";
import { fixLinks } from "./fixLinks";
import { getDocs, getDocsVersions, populateObject } from "./helpers";
import {
  DocsContentItems,
  DocsContentItem,
  ManifestItem,
  DocsType,
} from "./types";
import {
  DOCS_DIR,
  ASSETS_DIR,
  DOCS_PATH_PREFIX,
  DOCS_LATEST_VERSION,
  DOCS_ROOT_TYPE,
  DOCS_KYMA_ID,
} from "../../../constants";
import { CreatePageFn, CreateRedirectFn } from "../../../types";

export interface CreateDocsPages {
  graphql: Function;
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
  const docs = await getDocs(graphql);

  const versions = getDocsVersions(
    require("../../../../content/docs/versions"),
  );
  if (Object.keys(versions).length === 0) {
    console.error("No docs versions found");
    return;
  }
  const latestVersion = versions.releases[0];

  const docsArch = generator(docs, versions);
  docsArch[DOCS_LATEST_VERSION] = JSON.parse(
    JSON.stringify(docsArch[latestVersion]),
  );
  docsArch[""] = JSON.parse(JSON.stringify(docsArch[latestVersion]));

  Object.keys(docsArch).map(version => {
    const { content, navigation, manifest } = docsArch[version];

    Object.keys(content).map(docsType => {
      const topics = content[docsType];

      Object.keys(topics).map(topic => {
        const topicContent = topics[topic];

        Object.keys(manifest).map(key => {
          manifest[key] = populateObject<ManifestItem>(manifest[key]);
        });

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
            navigation,
            manifest,
            assetsPath,
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
              navigation,
              manifest,
              assetsPath,
            },
          });
        }
      });
    });
  });
};
