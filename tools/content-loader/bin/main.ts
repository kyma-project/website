import to from "await-to-js";
import { VError } from "verror";

import coreConfig, { CoreConfig } from "../src/config";
import docsConfig from "../src/prepare-docs/config";
import roadmapConfig from "../src/prepare-roadmap-content/config";

import GitClient from "../src/github-client/git-client";
import GitHubClient from "../src/github-client/github-client";
import GitHubGraphQLClient from "../src/github-client/github-graphql-client";
import ZenHubCLient from "../src/github-client/zenhub-client";

import prepareDocs from "../src/prepare-docs";
import prepareRoadmapContent from "../src/prepare-roadmap-content";

const prepareDocsFn = async () => {
  const config: CoreConfig = {
    ...coreConfig,
    repository: docsConfig.repository,
  };

  GitClient.withConfig(config, docsConfig.tempPath);
  GitHubClient.withConfig(config);

  let [err] = await to(prepareDocs(config));
  if (err) throw err;
};

const prepareRoadmapContentFn = async () => {
  const config: CoreConfig = {
    ...coreConfig,
    repository: roadmapConfig.repository,
  };

  GitClient.withConfig(config, roadmapConfig.tempPath);
  GitHubClient.withConfig(config);
  GitHubGraphQLClient.withConfig(config);
  ZenHubCLient.withConfig(roadmapConfig.zenHubToken);

  let [err] = await to(prepareRoadmapContent(config));
  if (err) throw err;
};

const main = async () => {
  let err: Error | null;
  const errors: Error[] = [];

  [err] = await to(prepareDocsFn());
  if (err) {
    errors.push(new VError(err, "while preparing documentation"));
  }

  [err] = await to(prepareRoadmapContentFn());
  if (err) {
    errors.push(new VError(err, "while preparing content for roadmap"));
  }

  if (errors.length) {
    errors.forEach(e => {
      console.error(e.message);
    })
    throw new VError("while preparing content for website");
  }
};

(async () => {
  const [err] = await to(main());
  if (err) {
    console.error(err);
    process.exit(1);
  }
})();
