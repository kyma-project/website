const fs = require("fs-extra");

function generateVersionsForReleases(releases) {
  const versions = [];

  releases.forEach((release, name) => {
    versions.push({
      name: name,
      tag: release.tag_name,
    });
  });

  return versions;
}

function generateVersionsForBranches(branches) {
  const versions = [];

  branches.forEach((commit, branch) => {
    versions.push({
      name: branch,
      commit: commit,
    });
  });

  return versions;
}

function generateDocsVersions({ releases, prereleases, branches, output }) {
  const releasesVersions = generateVersionsForReleases(releases);
  const prereleasesVersions = generateVersionsForReleases(prereleases);
  const branchesVersions = generateVersionsForBranches(branches);

  const versions = {
    releases: releasesVersions,
    pre_releases: prereleasesVersions,
    branches: branchesVersions,
  };

  fs.writeJsonSync(output, versions, { encoding: "utf8" });
}

module.exports = generateDocsVersions;
