import compareVersions from "compare-versions";
import fs from "fs-extra";
import { join, resolve } from "path";
import { BuildFor } from "../../../../src/types/common";
import {
  DocsBranchesVersion,
  DocsGeneratedVersions,
  DocsReleasesVersion,
} from "../../../../tools/content-loader/src/prepare-docs/docs-versions";
import {
  ASSETS_DIR,
  DOCS_DIR,
  DOCS_LATEST_VERSION,
  DOCS_PATH_PREFIX,
  DOCS_SPECIFICATIONS_PATH,
} from "../../../constants";
import {
  CreatePageFn,
  CreatePageFnArgs,
  GraphQLFunction,
} from "../../../types";
import {
  DocsContentDocs,
  docsGenerator,
  DocsGeneratorReturnType,
  DocsNavigation,
  getContent,
} from "../utils";
import { DocGQL, DocsPaths, DocsPathsArgs, DocsVersions } from "./types";

export const createDocsPage = (
  createPage: CreatePageFn,
  context: any,
): CreatePageFn => {
  const docsTemplate: string = resolve(
    __dirname,
    "../../../../src/views/docs/index.tsx",
  );

  return (props: CreatePageFnArgs) => {
    createPage({
      ...props,
      component: docsTemplate,
      context: {
        ...context,
        ...props.context,
      },
    });
  };
};

interface PrepareDataArgs {
  graphql: GraphQLFunction;
  buildFor: BuildFor;
  repositoryName: string;
}

export const prepareData = async ({
  graphql,
  buildFor,
  repositoryName,
}: PrepareDataArgs) => {
  const versions = getDocsVersions(
    require(`../../../../content/docs/${repositoryName}/versions`),
  );
  if (Object.keys(versions).length === 0) {
    console.error(`No docs versions found for ${repositoryName}`);
    return;
  }
  const latestVersion = getLatestVersion(versions);

  const docs = await getContent<DocGQL>(
    graphql,
    `/content/docs/${repositoryName}/`,
    `docInfo {
      id
      version
    }`,
  );
  const docsArch: { [version: string]: DocsGeneratorReturnType } = {};

  if (buildFor === BuildFor.DOCS_PREVIEW) {
    const version = "preview";
    docsArch[version] = docsGenerator<DocGQL>(
      docs,
      `docs/${repositoryName}`,
      version,
    );

    return {
      versions,
      version,
      docsArch,
    };
  }

  for (const versionType in versions) {
    if (!versions.hasOwnProperty(versionType)) {
      continue;
    }
    for (const version of versions[versionType]) {
      docsArch[version] = docsGenerator<DocGQL>(
        docs,
        `docs/${repositoryName}`,
        version,
      );
    }
  }

  docsArch[DOCS_LATEST_VERSION] = JSON.parse(
    JSON.stringify(docsArch[latestVersion]),
  );

  // copy assets
  const assetBasePath = resolve(
    `${__dirname}/../../../../public/assets/docs/${repositoryName}/`,
  );
  const latestVersionAssetSource = resolve(join(assetBasePath, latestVersion));
  const latestAssetDestination = resolve(
    join(assetBasePath, DOCS_LATEST_VERSION),
  );

  await fs.copy(latestVersionAssetSource, latestAssetDestination, {
    recursive: true,
  });

  return {
    versions,
    latestVersion,
    docsArch,
  };
};

const getDocsVersions = (versions: DocsGeneratedVersions): DocsVersions => {
  const versionsByType: DocsVersions = {};

  appendDocsType("releases", versions.releases, versionsByType);
  appendDocsType("prereleases", versions.pre_releases, versionsByType);
  appendDocsType("branches", versions.branches, versionsByType);

  return versionsByType;
};

const getLatestVersion = (versions: DocsVersions): string => {
  if (versions.releases && versions.releases.length) {
    return versions.releases[0];
  }
  if (versions.branches && versions.branches.length) {
    return versions.branches[0];
  }
  throw new Error("Cannot find latest version of docs!");
};

const appendDocsType = (
  type: string,
  versions: Array<DocsReleasesVersion | DocsBranchesVersion>,
  versionsByType: DocsVersions,
) => {
  if (!versions || versions.length === 0) {
    return;
  }

  const sortedVersions = versions
    .map(version => version.name)
    .sort(compareVersions)
    .reverse();

  versionsByType[type] = sortedVersions;
};

const extractDocsFn = (version: string) => (
  doc: DocGQL,
  docsGroup: string,
  topicId: string,
): DocsContentDocs | null => {
  const {
    rawMarkdownBody,
    fields: {
      docInfo: { id, type, version: v, fileName },
      imagesSpec,
    },
    frontmatter: { title, type: docType },
  } = doc;

  if (version === v && topicId === id) {
    const obj: DocsContentDocs = {
      order: fileName,
      title,
      source: rawMarkdownBody,
      imagesSpec,
    };

    if (docType) {
      obj.type = docType;
    }

    return obj;
  }
  return null;
};

export const sortGroupOfNavigation = (
  navigation: DocsNavigation,
): DocsNavigation => {
  const groups = Object.keys(navigation).sort((a, b) => {
    const nameA = a.toString().toLowerCase();
    const nameB = b.toString().toLowerCase();

    if (nameA === "root") {
      return -1;
    }
    if (nameB === "root") {
      return 1;
    }
    return 0;
  });

  const sortedNavigation: DocsNavigation = {};
  groups.map(group => {
    sortedNavigation[group] = navigation[group];
  });

  return sortedNavigation;
};

export const prepareWebsitePaths = ({
  repositoryName,
  version,
  topic,
}: DocsPathsArgs): DocsPaths => {
  const basePath = join("/", DOCS_PATH_PREFIX, repositoryName, version);
  const assetBasePath = join("/", ASSETS_DIR, DOCS_DIR, repositoryName);

  // remove `README` for nodes
  if (topic.endsWith("README")) {
    topic = topic.replace("README", "");
  }

  const tmp = topic.split("/");
  tmp.pop();
  const subtopic = tmp.join("/");

  const assetsPath = join(assetBasePath, version, subtopic, ASSETS_DIR);
  const specificationsPath = join(
    assetBasePath,
    version,
    subtopic,
    DOCS_SPECIFICATIONS_PATH,
  );

  const pagePath = join(basePath, topic);

  const modalUrlPrefix = join(
    DOCS_PATH_PREFIX,
    repositoryName,
    version,
    topic,
    DOCS_SPECIFICATIONS_PATH,
  );

  return {
    assetsPath,
    specificationsPath,
    pagePath,
    basePath,
    modalUrlPrefix,
  };
};
