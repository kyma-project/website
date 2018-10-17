const fs = require("fs-extra");

function generateConfiguration(newestReleases, output) {
  const releases = [];
  newestReleases.forEach((release, name) => {
    releases.push({ name: name, tag: release.tag_name });
  });

  const config = {
    releases: releases,
  };

  fs.writeJsonSync(output, config, { encoding: "utf8" });
}

module.exports = {
  generateConfiguration,
};
