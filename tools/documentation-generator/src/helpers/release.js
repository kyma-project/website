const compareVersions = require("compare-versions");

function validateExistanceOfTag(releases, tags) {
  return releases.filter(release => {
    const fullName = release.name ? release.name : release.tag_name;
    return tags.includes(fullName);
  });
}

function groupReleaseByName(releases) {
  const releaseMap = new Map();
  releases.forEach(release => {
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
        versionFirst = first.tag_name.split("-")[0];
        versionSecond = second.tag_name.split("-")[0];
        return compareVersions(versionFirst, versionSecond);
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

    if (!current || current.tag !== release.tag_name) {
      result.set(key, release.tag_name);
    }
  });

  result.set("master", "master");

  return result;
}

function getReleaseName(release) {
  const fullName = release.name ? release.name : release.tag_name;
  return release.prerelease ? fullName : fullName.match(/^v?[0-9]+.[0-9]+/)[0];
}

module.exports = {
  getReleaseName,
  groupReleaseByName,
  getNewestReleases,
  getReleasesToUpdate,
  validateExistanceOfTag,
};
