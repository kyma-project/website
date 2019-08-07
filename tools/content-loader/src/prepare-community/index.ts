import { resolve } from "path";
import to from "await-to-js";
import { VError } from "verror";

import { CoreConfig } from "../config";
import communityConfig, { CommunityConfig } from "./config";
import GitClient from "../github-client/git-client";
import CopyCommunity from "./copy-community";
import { makeDir } from "../helpers";

const prepareCommunity = async (coreConfig: CoreConfig) => {
  const outputPath = resolve(communityConfig.outputPath);
  const tempPath = resolve(communityConfig.tempPath);

  let err: Error | null;
  [err] = await to(makeDir(outputPath));
  if (err) {
    throw err;
  }

  [err] = await to(makeDir(tempPath));
  if (err) {
    throw err;
  }

  console.log(`Cloning ${coreConfig.organization}/${coreConfig.repository}`);
  [err] = await to(GitClient.clone());
  if (err) {
    throw new VError(
      err,
      `while cloning ${coreConfig.organization}/${coreConfig.repository}`,
    );
  }

  [err] = await to(CopyCommunity.do(tempPath, outputPath));
  if (err) {
    throw err;
  }
};

export default prepareCommunity;
