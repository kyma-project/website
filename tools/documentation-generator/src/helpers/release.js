const compareVersions = require("compare-versions");

function filterInvalidReleases(releases, tags) {
  const tagsArray = tags.map(tag => tag.name);

  return releases.filter(release => {
    const fullName = release.name ? release.name : release.tag_name;
    return tagsArray.includes(fullName);
  });
}

function groupReleaseByName(releases) {
  return groupBy(releases, current => {
    return getReleaseName(current);
  });
}

function groupReleaseByType(releases) {
  return groupBy(releases, current => {
    return current.prerelease ? "prereleases" : "releases";
  });
}

function groupBy(array, fn) {
  return array.reduce((prv, curr) => {
    const key = fn(curr);
    let values = prv.get(key);

    if (!values) {
      values = [];
      prv.set(key, values);
    }

    values.push(curr);
    return prv;
  }, new Map());
}

function getNewestReleases(groupedReleases) {
  const result = new Map();

  groupedReleases.forEach((value, key) => {
    const sorted = value
      .sort((first, second) => {
        firstDate = new Date(first.published_at);
        secondDate = new Date(second.published_at);
        return firstDate - secondDate;
      })
      .reverse();
    result.set(key, sorted[0]);
  });

  return result;
}

function filterReleased(prereleases, releases) {
  const result = new Map();

  prereleases.forEach((value, key) => {
    if (!releases.has(key)) {
      result.set(key, value);
    }
  });

  return result;
}

function getOutdatedReleases(documentationConfig, newestReleases) {
  const result = new Map();
  const currentReleases = documentationConfig ? documentationConfig : [];

  newestReleases.forEach((release, key) => {
    const current = currentReleases.find(current => current.name === key);

    if (!current || current.tag !== release.tag_name) {
      result.set(key, release.tag_name);
    }
  });

  return result;
}

function getReleaseName(release) {
  const fullName = release.name ? release.name : release.tag_name;
  return fullName.match(/^v?[0-9]+.[0-9]+/)[0];
}

module.exports = {
  getReleaseName,
  groupReleaseByName,
  groupReleaseByType,
  getNewestReleases,
  getOutdatedReleases,
  filterInvalidReleases,
  filterReleased,
};
