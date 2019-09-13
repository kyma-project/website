import { resolve } from "path";
import { mkdirs } from "fs-extra";
import to from "await-to-js";
import { VError } from "verror";

import { CoreConfig } from "../config";
import docsConfig, { DocsConfig } from "./config";
import GitClient from "../github-client/git-client";
import CheckingDocs from "./branches-checking";
import CopyDocs from "./copy-docs";
import DocsVersions from "./docs-versions";
import { makeDir } from "../helpers";

const prepareDocs = async (coreConfig: CoreConfig) => {
  const configBranches = docsConfig.branches;
  const outputPath = resolve(docsConfig.outputPath);
  const outputDocsVersion = resolve(docsConfig.outputDocsVersion);
  const tempPath = resolve(docsConfig.tempPath);

  let err: Error | null;
  let result;
  // [err, result] = await to(CheckingDocs.releases());
  // if (err) {
  //   throw new VError(err, `while checking releases`);
  // }

  // let releases;
  // let prereleases;
  // if (result) {
  //   releases = result.releases;
  //   prereleases = result.prereleases;
  // }

  let branches;
  [err, branches] = await to(CheckingDocs.branches(configBranches));
  if (err) {
    throw new VError(err, `while checking branches`);
  }

  [err] = await to(makeDir(outputPath));
  if (err) {
    throw err;
  }

  [err] = await to(makeDir(tempPath, true));
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

  let releases = new Map<string, string>();
  releases.set("0.9", "0.9.1");
  [err] = await to(
    CopyDocs.releases({
      releases,
      source: tempPath,
      output: outputPath,
    }),
  );
  if (err) {
    throw err;
  }

  // [err] = await to(
  //   CopyDocs.releases({
  //     releases: prereleases,
  //     source: tempPath,
  //     output: outputPath,
  //   }),
  // );
  // if (err) {
  //   throw err;
  // }

  [err] = await to(
    CopyDocs.branches({
      branches,
      source: tempPath,
      output: outputPath,
    }),
  );
  if (err) {
    throw err;
  }

  console.log(`Generating documentation versions file to ${outputDocsVersion}`);
  [err] = await to(
    DocsVersions.generate(
      {
        releases: undefined,
        pre_releases: undefined, //prereleases,
        branches,
      },
      outputDocsVersion,
    ),
  );
  if (err) {
    throw err;
  }
};

export default prepareDocs;
