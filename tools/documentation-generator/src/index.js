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
  groupReleaseByType,
  getNewestReleases,
  getOutdatedReleases,
  filterInvalidReleases,
  filterReleased,
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
  const allReleases = await gitHubApi.getReleases();
  const tags = await gitHubApi.getTags();
  const validReleases = filterInvalidReleases(allReleases, tags);
  const releasesByType = groupReleaseByType(validReleases);

  const releases = groupReleaseByName(releasesByType.get("releases"));
  const prereleases = groupReleaseByName(releasesByType.get("prereleases"));

  const newestReleases = getNewestReleases(releases);
  const newestPrereleases = getNewestReleases(prereleases);

  const filteredPrereleases = filterReleased(newestPrereleases, newestReleases);

  const outdatedReleases = getOutdatedReleases(
    currentConfiguration.releases,
    newestReleases,
  );
  const outdatedPrereleases = getOutdatedReleases(
    currentConfiguration.pre_releases,
    filteredPrereleases,
  );

  console.log(
    `Checking branches for ${config.organization}/${config.repository}`,
  );

  const branches = getBranches(config.commit, currentConfiguration.branches);
  const outdatedBranches = getOutdatedBranches(
    branches,
    currentConfiguration.branches,
  );

  if (
    outdatedReleases.size > 0 ||
    outdatedPrereleases.size > 0 ||
    outdatedBranches.size > 0
  ) {
    fs.mkdirsSync(outputPath);
    fs.mkdirsSync(tempPath);

    const git = new Git(config.organization, config.repository, tempPath);
    console.log(`Cloning ${config.organization}/${config.repository}`);
    git.clone();

    await generateForReleases(outdatedReleases, tempPath, outputPath, git);
    await generateForReleases(outdatedPrereleases, tempPath, outputPath, git);
    await generateForBranches(outdatedBranches, tempPath, outputPath, git);

    console.log(`Generating documentation config to ${configPath}`);
    generateConfiguration(
      newestReleases,
      filteredPrereleases,
      branches,
      configPath,
    );
  } else {
    console.log("Documentation is up-to-date");
  }
}

// Fixed to master branch
function getBranches(commit, configBranches) {
  const currentBranches = configBranches ? configBranches : [];
  const master = currentBranches.find(current => current.name === "master");

  let masterCommit = commit;
  if (!commit && master) {
    masterCommit = master.commit;
  }

  return new Map([["master", masterCommit]]);
}

function getOutdatedBranches(branches, configBranches) {
  const result = new Map();
  const currentBranches = configBranches ? configBranches : [];

  branches.forEach((commit, branch) => {
    const current = currentBranches.find(current => current.name === branch);

    if (commit && (!current || current.commit !== commit)) {
      result.set(branch, commit);
    }
  });

  return result;
}

async function generateForReleases(releases, source, output, git) {
  for (const key of releases.keys()) {
    const tag = releases.get(key);
    console.log(`Generating documentation for release ${key} from tag ${tag}`);
    git.checkoutTag(tag);

    const out = `${output}/${key}`;
    await generate(source, out);
  }
}

async function generateForBranches(branches, source, output, git) {
  for (const branch of branches.keys()) {
    const commit = branches.get(branch);
    console.log(
      `Generating documentation for commit ${commit} from branch ${branch}`,
    );
    git.checkout(commit);

    const out = `${output}/${branch}`;
    await generate(source, out);
  }
}

async function generate(source, output) {
  const docsDir = `${source}/docs`;
  const manifestFile = `${docsDir}/manifest.yaml`;
  const navigationOutput = `${output}/navigation.json`;
  const manifestOutput = `${output}/manifest.json`;

  console.log(`Generating documentation to ${output}`);
  await generateDocumentation(docsDir, output);
  console.log(`Generating navigation to ${navigationOutput}`);
  generateNavigation(output, navigationOutput);
  console.log(`Generating manifest to ${manifestOutput}`);
  generateManifest(manifestFile, manifestOutput);
}

(async () => {
  try {
    await run(config);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
