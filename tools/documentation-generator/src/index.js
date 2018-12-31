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
  validateExistanceOfTag,
} = require("./helpers/release");
var path = require("path");

async function run(config) {
  const outputPath = path.resolve(config.output);
  const configPath = path.resolve(config.documentationConfig);
  const tempPath = path.resolve(config.temp);

  const gitHubApi = new github.GitHub(
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
  const releases = await gitHubApi.getReleases();

  const tags = await gitHubApi.getTags();
  const tagsArray = tags.map(tag => tag.name);

  const existingReleases = validateExistanceOfTag(releases, tagsArray);
  const groupedReleases = groupReleaseByName(existingReleases);

  const newestReleases = getNewestReleases(groupedReleases);
  const outdatedReleases = getReleasesToUpdate(
    currentConfiguration,
    newestReleases,
  );

  fs.mkdirsSync(outputPath);
  fs.mkdirsSync(tempPath);
  if (outdatedReleases.size > 0) {
    const git = new Git(config.organization, config.repository, tempPath);
    console.log(`Cloning ${config.organization}/${config.repository}`);
    git.clone();

    for (const key of outdatedReleases.keys()) {
      const release = outdatedReleases.get(key);

      if (key === "master") {
        console.log(
          `Generating documentation for release ${key} from branch ${release}`,
        );
        git.checkout(release);
      } else {
        console.log(
          `Generating documentation for release ${key} from tag ${release}`,
        );
        git.checkoutTag(release);
      }

      const docsDir = `${tempPath}/docs`;
      const manifestFile = `${docsDir}/manifest.yaml`;
      const output = `${outputPath}/${key}`;
      const navigationOutput = `${output}/navigation.json`;
      const manifestOutput = `${output}/manifest.json`;

      console.log(`Generating documentation to ${output}`);
      await generateDocumentation(docsDir, output);
      console.log(`Generating navigation to ${navigationOutput}`);
      generateNavigation(output, navigationOutput);
      console.log(`Generating manifest to ${manifestOutput}`);
      generateManifest(manifestFile, manifestOutput);
    }

    console.log(`Generating documentation config to ${configPath}`);
    generateConfiguration(newestReleases, configPath);
  } else {
    console.log("Documentation is up-to-date");
  }
}

(async () => {
  try {
    await run(config);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
