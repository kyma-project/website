import to from "await-to-js";
import { VError } from "verror";
import coreConfig, { CoreConfig } from "../src/config";
import GitClient from "../src/github-client/git-client";
import prepareCommunityContent from "../src/prepare-community";
import communityConfig from "../src/prepare-community/config";
import prepareDocs from "../src/prepare-docs";

const prepareDocsContentFn = async () => {
  const config: CoreConfig = {
    ...coreConfig,
  };

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

const main = async () => {
  const errors: Error[] = [];
  let err: Error | null = null;

  if (!coreConfig.token) {
    console.warn(
      "APP_TOKEN is not defined. Token is not necessary, but is needed for more queries to GitHub API.",
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

  if (errors.length) {
    errors.forEach(e => {
      console.error(e.stack);
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
