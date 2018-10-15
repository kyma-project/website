const compareVersions = require("compare-versions");

function groupReleaseByName(releases) {
  const releaseMap = new Map();

  releases.forEach(release => {
    if (release.prerelease) {
      return;
    }

    const name = getReleaseName(release);
    let rel = releaseMap.get(name);
    if (!rel) {
      rel = [];
      releaseMap.set(name, rel);
    }

    rel.push(release);
  });

  return releaseMap;
}

function getNewestReleases(groupedReleases) {
  const result = new Map();

  groupedReleases.forEach((value, key) => {
    const sorted = value
      .sort((first, second) => {
        return compareVersions(first.tag_name, second.tag_name);
      })
      .reverse();

    result.set(key, sorted[0]);
  });

  return result;
}

function getReleasesToUpdate(documentationConfig, newestReleases) {
  const result = new Map();
  const currentReleases = documentationConfig.releases
    ? documentationConfig.releases
    : [];

  newestReleases.forEach((release, key) => {
    const current = currentReleases.find(current => current.name === key);

    if (!current || compareVersions(current.tag, release.tag_name) < 0) {
      result.set(key, release.tag_name);
    }
  });

  return result;
}

function getReleaseName(release) {
  const fullName = release.name ? release.name : release.tag_name;
  return fullName.match(/^[0-9]+.[0-9]+/)[0];
}

module.exports = {
  getReleaseName,
  groupReleaseByName,
  getNewestReleases,
  getReleasesToUpdate,
};
