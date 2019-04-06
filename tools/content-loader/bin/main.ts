import to from 'await-to-js';
import { VError } from 'verror';

import config from "../src/config";
import docsConfig from "../src/prepare-docs/config";
import GitClient from "../src/github-client/git-client";
import GitHubClient from "../src/github-client/github-client";
import prepareDocs from "../src/prepare-docs";

const setConfigs = () => {
  GitClient.withConfig(config, docsConfig.tempPath)
  GitHubClient.withConfig(config)
}

const main = async () => {
  setConfigs();

  let [err] = await to(prepareDocs(config));
  if (err) throw new VError(err, "while preparing documentation");
};

(async () => {
  const [err] = await to(main());
  if(err) {
    console.error(err);
    process.exit(1);
  }
})();
