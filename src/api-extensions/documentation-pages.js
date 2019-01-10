const { resolve } = require("path");

const compareVersions = require("compare-versions");
const ui = require("../locales/en/UI.json");
const DocsLoader = require("./DocsLoader");
const { DOCS_PATH_NAME } = require("../constants/docs");
const registry = require("../../static/documentation/config.json");
const linksParser = require("./links-parser");
const { LATEST_VERSION } = require("./constants");

function getDocsVersions() {
  const versionsByType = {};

  appendType("releases", registry.releases, versionsByType);
  appendType("prereleases", registry.pre_releases, versionsByType);
  appendType("branches", registry.branches, versionsByType);

  return versionsByType;
}

function appendType(type, versions, versionsByType) {
  if (!versions || versions.length === 0) {
    return;
  }

  const sortedVersions = versions
    .map(version => version.name)
    .sort(compareVersions)
    .reverse();

  versionsByType[type] = sortedVersions;
}

function createDocsPages({ createPage }) {
  const template = resolve(`src/templates/Documentation.js`);
  const versions = getDocsVersions();
  if (Object.keys(versions).length === 0) {
    console.error("No docs versions found");
    return;
  }

  const versionsWithoutLatest = JSON.parse(JSON.stringify(versions));
  const latestVersion = versions.releases[0];
  const loader = new DocsLoader(latestVersion);

  try {
    createMainDocsPage({
      version: latestVersion,
      includeVersionInPath: false,
      versions: versionsWithoutLatest,
      displayName: ui.navigation.documentation,
      path: `/${DOCS_PATH_NAME}`,
      template,
      createPage,
      loader,
    });

    const manifest = loader.loadManifest();
    const navigation = loader.loadNavigation();

    createDocsSubpages({
      version: latestVersion,
      includeVersionInPath: false,
      versions: versionsWithoutLatest,
      manifest,
      createPage,
      loader,
      navigation,
      template,
    });
  } catch (err) {
    console.error(err);
    return;
  }

  versions.releases.push(LATEST_VERSION);
  for (let key in versions) {
    versions[key].forEach(version => {
      const isLatestVersion = version === LATEST_VERSION;
      const currentVersion = isLatestVersion
        ? versionsWithoutLatest.releases[0]
        : version;
      const loader = new DocsLoader(currentVersion);

      try {
        createMainDocsPage({
          path: `/${DOCS_PATH_NAME}/${version}`,
          displayName: `${version} - ${ui.navigation.documentation}`,
          version: version,
          versions: versionsWithoutLatest,
          template,
          createPage,
          loader,
        });
      } catch (err) {
        console.error(err);
        return;
      }

      const manifest = loader.loadManifest();
      const navigation = loader.loadNavigation();
      createDocsSubpages({
        version: version,
        versions: versionsWithoutLatest,
        manifest,
        createPage,
        loader,
        navigation,
        template,
      });
    });
  }
}

function populateDocsPages(obj) {
  if (Array.isArray(obj)) {
    return obj;
  }

  if (typeof obj === "object") {
    return [obj];
  }

  return [];
}

function getFirstTopicId(typeObj) {
  let id;
  if (Array.isArray(typeObj) && typeObj.length > 0) {
    id = typeObj[0].id;
  } else if (typeof typeObj === "object") {
    id = typeObj.id;
  }

  return id;
}

function getFirstDocType(manifest) {
  const specKeys = Object.keys(manifest.spec);
  if (specKeys.length === 0) {
    return;
  }

  return specKeys[0];
}

function createMainDocsPage({
  version,
  includeVersionInPath = true,
  versions,
  path,
  template,
  displayName,
  createPage,
  loader,
}) {
  const navigation = loader.loadNavigation();
  const manifest = loader.loadManifest();

  if (!manifest.spec) {
    throw new Error(`Incorrect manifest for version ${version}`);
  }

  const type = getFirstDocType(manifest);
  if (!type) {
    throw new Error(`No spec keys detected. Skipping version ${version}`);
  }

  const id = getFirstTopicId(manifest.spec[type]);
  if (typeof id === "undefined") {
    throw new Error(`Couldn't find id for type ${type}`);
  }

  let content = loader.loadContent(type, id);
  // for copy object
  content = JSON.parse(JSON.stringify(content));

  const versionForAssets =
    version === LATEST_VERSION || !includeVersionInPath
      ? versions.releases[0]
      : version;

  createPage({
    path,
    component: template,
    context: {
      includeVersionInPath,
      currentVersion: version,
      versions,
      content: linksParser({
        content,
        type,
        id,
        version,
        includeVersionInPath,
        versionForAssets,
      }),
      displayName,
      navigation,
      manifest,
    },
  });
}

function createDocsSubpages({
  version,
  includeVersionInPath = true,
  versions,
  manifest,
  createPage,
  loader,
  template,
}) {
  const navigation = loader.loadNavigation();

  Object.keys(manifest.spec).forEach(contentType => {
    const obj = manifest.spec[contentType];
    const pages = populateDocsPages(obj);

    const versionPathPart = includeVersionInPath ? `${version}/` : "";

    pages.forEach(page => {
      let content = loader.loadContent(contentType, page.id);
      // for copy object
      content = JSON.parse(JSON.stringify(content));

      const versionForAssets =
        version === LATEST_VERSION || !includeVersionInPath
          ? versions.releases[0]
          : version;

      createPage({
        path: `/${DOCS_PATH_NAME}/${versionPathPart}${contentType}/${page.id}`,
        component: template,
        context: {
          displayName: `${page.displayName} - ${ui.navigation.documentation}`,
          content: linksParser({
            content,
            contentType,
            id: page.id,
            version,
            includeVersionInPath,
            versionForAssets,
          }),
          navigation,
          includeVersionInPath,
          currentVersion: version,
          versions,
          manifest,
        },
      });
    });
  });
}

module.exports = createDocsPages;
