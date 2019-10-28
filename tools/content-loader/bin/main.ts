import to from "await-to-js";
import { VError } from "verror";

import coreConfig, { CoreConfig } from "../src/config";
import docsConfig from "../src/prepare-docs/config";
import communityConfig from "../src/prepare-community/config";
import roadmapConfig from "../src/prepare-roadmap/config";

import GitClient from "../src/github-client/git-client";
import GitHubClient from "../src/github-client/github-client";
import GitHubGraphQLClient from "../src/github-client/github-graphql-client";
import ZenHubCLient from "../src/github-client/zenhub-client";

import prepareDocs from "../src/prepare-docs";
import prepareCommunityContent from "../src/prepare-community";
import prepareRoadmapContent from "../src/prepare-roadmap";

const prepareDocsContentFn = async () => {
  const config: CoreConfig = {
    ...coreConfig,
    repository: docsConfig.repository,
  };

  GitClient.withConfig(config, docsConfig.sourcePath);
  GitHubClient.withConfig(config);

  const [err] = await to(prepareDocs(config));
  if (err) throw err;
};

const prepareCommunityContentFn = async () => {
  const config: CoreConfig = {
    ...coreConfig,
    repository: communityConfig.repository,
  };

  GitClient.withConfig(config, communityConfig.sourcePath);

  const [err] = await to(prepareCommunityContent(config));
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

  const [err] = await to(prepareRoadmapContent(config));
  if (err) throw err;
};

const main = async () => {
  const errors: Error[] = [];
  let err: Error | null = null;

  if (!coreConfig.token) {
    console.warn(
      "APP_TOKEN is not defined. Token is not necessary, but is needed for more queries to GitHub API.",
    );
  }

  if (!roadmapConfig.zenHubToken) {
    console.warn(
      "APP_ZEN_HUB_TOKEN is not defined. Token is not necessary, but is needed for preparing content for Roadmap.",
    );
  }

  [err] = await to(prepareDocsContentFn());
  if (err) {
    errors.push(new VError(err, "while preparing documentation"));
  }

  [err] = await to(prepareCommunityContentFn());
  if (err) {
    errors.push(new VError(err, "while preparing content for community"));
  }

  [err] = await to(prepareRoadmapContentFn());
  if (err) {
    errors.push(new VError(err, "while preparing content for roadmap"));
  }

  if (errors.length) {
    errors.forEach(e => {
      console.error(e.message);
    });
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
