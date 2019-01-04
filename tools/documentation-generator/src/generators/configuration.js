const fs = require("fs-extra");

function generateConfigsForReleases(releases) {
  const configs = [];

  releases.forEach((release, name) => {
    configs.push({
      name: name,
      tag: release.tag_name,
    });
  });

  return configs;
}

function generateConfigsForBranches(branches) {
  const configs = [];

  branches.forEach((commit, branch) => {
    configs.push({
      name: branch,
      commit: commit,
    });
  });

  return configs;
}

function generateConfiguration(releases, prereleases, branches, output) {
  const releasesConfig = generateConfigsForReleases(releases);
  const prereleasesConfig = generateConfigsForReleases(prereleases);
  const branchesConfig = generateConfigsForBranches(branches);

  const config = {
    releases: releasesConfig,
    pre_releases: prereleasesConfig,
    branches: branchesConfig,
  };

  fs.writeJsonSync(output, config, { encoding: "utf8" });
}

module.exports = {
  generateConfiguration,
};
