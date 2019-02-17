const fs = require("fs-extra");

class Checking {
  constructor() {}

  currentDocsVersions(outputDocsVersion) {
    console.log(`Reading current configuration from ${outputDocsVersion}`);

    const currentDocsVersions = fs.pathExistsSync(outputDocsVersion)
      ? fs.readJsonSync(outputDocsVersion, { encoding: "utf8" })
      : {};

    return currentDocsVersions;
  }

  async releases({
    gitHubClient,
    coreConfig,
    currentDocsVersions,
    docsReleases,
  }) {
    console.log(
      `Checking releases for ${coreConfig.organization}/${
        coreConfig.repository
      }`,
    );

    const allReleases = await gitHubClient.getReleases();
    const tags = await gitHubClient.getTags();

    const validReleases = docsReleases.filterInvalidReleases(allReleases, tags);
    const releasesByType = docsReleases.groupReleaseByType(validReleases);

    const releases = docsReleases.groupReleaseByName(
      releasesByType.get("releases"),
    );
    const prereleases = docsReleases.groupReleaseByName(
      releasesByType.get("prereleases"),
    );

    const newestReleases = docsReleases.getNewestReleases(releases);
    const newestPrereleases = docsReleases.getNewestReleases(prereleases);

    const filteredPrereleases = docsReleases.filterReleased(
      newestPrereleases,
      newestReleases,
    );

    const outdatedReleases = docsReleases.getOutdatedReleases(
      currentDocsVersions.releases,
      newestReleases,
    );
    const outdatedPrereleases = docsReleases.getOutdatedReleases(
      currentDocsVersions.pre_releases,
      filteredPrereleases,
    );

    return {
      newestReleases,
      filteredPrereleases,
      outdatedReleases,
      outdatedPrereleases,
    };
  }

  branches({ coreConfig, commit, docsBranches, currentDocsVersions }) {
    console.log(
      `Checking branches for ${coreConfig.organization}/${
        coreConfig.repository
      }`,
    );

    const branches = docsBranches.getBranches(
      commit,
      currentDocsVersions.branches,
    );
    const outdatedBranches = docsBranches.getOutdatedBranches(
      branches,
      currentDocsVersions.branches,
    );

    return { branches, outdatedBranches };
  }
}

module.exports = new Checking();
