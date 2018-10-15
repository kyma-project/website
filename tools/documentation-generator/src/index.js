const config = require("./config");
const github = require("./helpers/github");
const fs = require("fs-extra");
const { Git } = require("./helpers/git");
const { generateDocumentation } = require("./generators/documentation");
const { generateConfiguration } = require("./generators/configuration");
const { generateNavigation } = require("./generators/navigation");
const { generateManifest } = require("./generators/manifest");
const {
  groupReleaseByName,
  getNewestReleases,
  getReleasesToUpdate,
} = require("./helpers/release");
var path = require("path");

async function run(config) {
  const outputPath = path.resolve(config.output);
  const configPath = path.resolve(config.documentationConfig);
  const tempPath = path.resolve(config.temp);

  const kymaGitHub = new github.GitHub(
    config.organization,
    config.repository,
    config.token,
  );

  console.log(`Reading current configuration from ${configPath}`);
  const currentConfiguration = fs.pathExistsSync(configPath)
    ? fs.readJsonSync(configPath, { encoding: "utf8" })
    : {};

  console.log(
    `Checking releases for ${config.organization}/${config.repository}`,
  );
  const releases = await kymaGitHub.getReleases();
  const latestRelease = await kymaGitHub.getLatestRelease();
  const groupedReleases = groupReleaseByName(releases);
  const newestReleases = getNewestReleases(groupedReleases);
  const outdatedReleases = getReleasesToUpdate(
    currentConfiguration,
    newestReleases,
  );

  if (outdatedReleases.size > 0) {
    fs.mkdirsSync(tempPath);

    const git = new Git(config.organization, config.repository, tempPath);
    console.log(`Cloning ${config.organization}/${config.repository}`);
    git.clone();

    outdatedReleases.forEach((release, key) => {
      console.log(
        `Generating documentation for release ${key} from tag ${release}`,
      );
      git.checkout(release);
      const docsDir = `${tempPath}/docs`;
      const manifestFile = `${docsDir}/manifest.yaml`;
      const output = `${outputPath}/${key}`;
      const navigationOutput = `${output}/navigation.json`;
      const manifestOutput = `${output}/manifest.json`;

      console.log(`Generating documentation to ${output}`);
      generateDocumentation(docsDir, output);
      console.log(`Generating navigation to ${navigationOutput}`);
      generateNavigation(output, navigationOutput);
      console.log(`Generating manifest to ${manifestOutput}`);
      generateManifest(manifestFile, manifestOutput);
    });
  } else {
    console.log("Documentation is up-to-date");
  }

  console.log(`Generation documentation config to ${configPath}`);
  generateConfiguration(latestRelease, newestReleases, configPath);
}

(async () => {
  await run(config);
})();
