import { resolve } from "path";
import compareVersions from "compare-versions";

import { DocsVersions, DocGQL, DocsPathsArgs, DocsPaths } from "./types";
import {
  DocsGeneratedVersions,
  DocsBranchesVersion,
  DocsReleasesVersion,
} from "../../../../tools/content-loader/src/prepare-docs/docs-versions";
import {
  docsGenerator,
  DocsGeneratorReturnType,
  getContent,
  DocsContentDocs,
  DocsNavigation,
} from "../utils";
import {
  ASSETS_DIR,
  DOCS_DIR,
  DOCS_SPECIFICATIONS_PATH,
  DOCS_PATH_PREFIX,
  DOCS_LATEST_VERSION,
} from "../../../constants";
import {
  GraphQLFunction,
  CreatePageFn,
  CreatePageFnArgs,
} from "../../../types";
import { BuildFor } from "../../../../src/types/common";

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
}

export const prepareData = async ({ graphql, buildFor }: PrepareDataArgs) => {
  const versions = getDocsVersions(
    require("../../../../content/docs/versions"),
  );
  if (Object.keys(versions).length === 0) {
    console.error("No docs versions found");
    return;
  }
  const latestVersion = getLatestVersion(versions);

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

  if (buildFor === BuildFor.DOCS_PREVIEW) {
    docsArch[""] = docsGenerator<DocGQL>(
      docs,
      "docs",
      extractDocsFn(latestVersion),
      latestVersion,
    );

    return {
      versions,
      latestVersion,
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
        "docs",
        extractDocsFn(version),
        version,
      );
    }
  }

  // for copying data
  docsArch[DOCS_LATEST_VERSION] = JSON.parse(
    JSON.stringify(docsArch[latestVersion]),
  );
  docsArch[""] = JSON.parse(JSON.stringify(docsArch[latestVersion]));

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
    },
    frontmatter: { title, type: docType },
  } = doc;

  if (version === v && docsGroup === type && topicId === id) {
    const obj: DocsContentDocs = {
      order: fileName,
      title,
      source: rawMarkdownBody,
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
  version,
  latestVersion,
  docsType,
  topic,
}: DocsPathsArgs): DocsPaths => {
  const v =
    !version || version === DOCS_LATEST_VERSION ? latestVersion : version;

  const assetsPath = `/${ASSETS_DIR}${DOCS_DIR}${v}/${topic}/${DOCS_DIR}${ASSETS_DIR}`;
  const specificationsPath = `/${ASSETS_DIR}${DOCS_DIR}${v}/${topic}/${DOCS_SPECIFICATIONS_PATH}`;
  const pagePath = `/${DOCS_PATH_PREFIX}/${
    version ? `${version}/` : ""
  }${docsType}/${topic}`;
  const rootPagePath = `/${DOCS_PATH_PREFIX}/${version}`;
  const modalUrlPrefix = `/${DOCS_PATH_PREFIX}/${v}/${docsType}/${topic}/${DOCS_SPECIFICATIONS_PATH}`;

  return {
    assetsPath,
    specificationsPath,
    pagePath,
    rootPagePath,
    modalUrlPrefix,
  };
};

export const preparePreviewPaths = ({
  version,
  latestVersion,
  docsType,
  topic,
}: DocsPathsArgs): DocsPaths => {
  const v =
    !version || version === DOCS_LATEST_VERSION ? latestVersion : version;

  const assetsPath = `/${ASSETS_DIR}${DOCS_DIR}${v}/${topic}/${DOCS_DIR}${ASSETS_DIR}`;
  const specificationsPath = `/${ASSETS_DIR}${DOCS_DIR}${v}/${topic}/${DOCS_SPECIFICATIONS_PATH}`;
  const pagePath = `/${version ? `${version}/` : ""}${docsType}/${topic}`;
  const rootPagePath = `/${version}`;
  const modalUrlPrefix = `/${docsType}/${topic}/${DOCS_SPECIFICATIONS_PATH}`;

  return {
    assetsPath,
    specificationsPath,
    pagePath,
    rootPagePath,
    modalUrlPrefix,
  };
};
