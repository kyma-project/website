import to from "await-to-js";
import { resolve } from "path";
import { VError } from "verror";
import { CoreConfig, PrepareFor } from "../config";
import GitClient from "../github-client/git-client";
import { makeDir } from "../helpers";
import communityConfig from "./config";
import CopyCommunity from "./copy-community";

const prepareCommunity = async (coreConfig: CoreConfig) => {
  const outputPath = resolve(communityConfig.outputPath);
  const sourcePath = resolve(communityConfig.sourcePath);

  let err: Error | null;
  [err] = await to(makeDir(outputPath));
  if (err) {
    throw err;
  }

  [err] = await to(makeDir(sourcePath, true));
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

  const hash = "8c269a6c2e42da6ef92a57d8e04add7bcdbe8e90";
  [err] = await to(GitClient.checkout(hash));
  if (err) {
    throw new VError(err, `while checkingout out ${hash}`);
  }

  [err] = await to(CopyCommunity.do(sourcePath, outputPath));
  if (err) {
    throw err;
  }
};

const preparePreviewCommunity = async () => {
  const outputPath = resolve(communityConfig.outputPath);
  const sourcePath = resolve(communityConfig.sourcePath);

  let [err] = await to(makeDir(outputPath));
  if (err) {
    throw err;
  }

  [err] = await to(CopyCommunity.do(sourcePath, outputPath));
  if (err) {
    throw err;
  }
};

export default async (coreConfig: CoreConfig) => {
  if (coreConfig.prepareFor === PrepareFor.COMMUNITY_PREVIEW) {
    return preparePreviewCommunity();
  }
  if (coreConfig.prepareFor === PrepareFor.WEBSITE) {
    return prepareCommunity(coreConfig);
  }
  return;
};
