import { resolve } from "path";
import { mkdirs } from "fs-extra";
import to from "await-to-js";
import { VError } from "verror";

import { CoreConfig } from "../config";
import communityConfig, { CommunityConfig } from "./config";
import GitClient from "../github-client/git-client";
import CopyCommunity from "./copy-community";

const prepareCommunity = async (coreConfig: CoreConfig) => {
  const outputPath = resolve(communityConfig.outputPath);
  const tempPath = resolve(communityConfig.tempPath);

  let err: Error | null;
  [err] = await to(mkdirs(outputPath));
  if (err) {
    throw new VError(err, `while creating dir ${outputPath}`);
  }

  [err] = await to(mkdirs(tempPath));
  if (err) {
    throw new VError(err, `while creating dir ${tempPath}`);
  }

  console.log(`Cloning ${coreConfig.organization}/${coreConfig.repository}`);
  [err] = await to(GitClient.clone());
  if (err) {
    throw new VError(
      err,
      `while cloning ${coreConfig.organization}/${coreConfig.repository}`,
    );
  }

  [err] = await to(GitClient.checkout("kyma-project-io"));
  if (err) {
    throw err;
  }

  [err] = await to(CopyCommunity.do(tempPath, outputPath));
  if (err) {
    throw err;
  }
};

export default prepareCommunity;
