const fs = require("fs-extra");

function generateConfiguration(newestReleases, output) {
  const releases = [];
  newestReleases.forEach((release, name) => {
    releases.push({
      name: name,
      tag: release.tag_name,
      type: release.prerelease ? "prerelease" : "release",
    });
  });

  releases.push({ name: "master", tag: "master", type: "master" });

  const config = {
    releases: releases,
  };

  fs.writeJsonSync(output, config, { encoding: "utf8" });
}

module.exports = {
  generateConfiguration,
};
