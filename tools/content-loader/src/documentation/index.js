const path = require("path");
const fs = require("fs-extra");

const docsConfig = require("./config");

const GitClient = require("../helpers/gitClient");
const GithubClient = require("../helpers/githubClient");

const checking = require("./checking");
const copy = require("./copy");

const docsReleases = require("./docsReleases");
const docsBranches = require("./docsBranches");

const generateDocsVersions = require("./generateDocsVersions");

module.exports = async coreConfig => {
  const commit = docsConfig.commit;
  const outputPath = path.resolve(docsConfig.outputPath);
  const outputDocsVersion = path.resolve(docsConfig.outputDocsVersion);
  const tempPath = path.resolve(docsConfig.tempPath);

  const gitHubClient = new GithubClient(
    coreConfig.organization,
    coreConfig.repository,
    coreConfig.token,
  );

  const currentDocsVersions = checking.currentDocsVersions(outputDocsVersion);
  const {
    newestReleases,
    filteredPrereleases,
    outdatedReleases,
    outdatedPrereleases,
  } = await checking.releases({
    gitHubClient,
    coreConfig,
    docsReleases,
    currentDocsVersions,
  });
  const { branches, outdatedBranches } = checking.branches({
    coreConfig,
    commit,
    docsBranches,
    currentDocsVersions,
  });

  if (
    !(
      outdatedReleases.size > 0 ||
      outdatedPrereleases.size > 0 ||
      outdatedBranches.size > 0
    )
  ) {
    console.log("Documentation is up-to-date");
    return;
  }

  fs.mkdirsSync(outputPath);
  fs.mkdirsSync(tempPath);

  const gitClient = new GitClient(
    coreConfig.organization,
    coreConfig.repository,
    tempPath,
  );
  console.log(`Cloning ${coreConfig.organization}/${coreConfig.repository}`);
  gitClient.clone();

  await copy.releases({
    releases: outdatedReleases,
    source: tempPath,
    output: outputPath,
    gitClient,
  });
  await copy.releases({
    releases: outdatedPrereleases,
    source: tempPath,
    output: outputPath,
    gitClient,
  });
  await copy.branches({
    branches: outdatedBranches,
    source: tempPath,
    output: outputPath,
    gitClient,
  });

  console.log(`Generating documentation versions file to ${outputDocsVersion}`);
  generateDocsVersions({
    releases: newestReleases,
    prereleases: filteredPrereleases,
    branches,
    output: outputDocsVersion,
  });
};
