import { resolve } from "path";
import to from "await-to-js";
import { VError } from "verror";

import { CoreConfig, PrepareFor } from "../config";
import docsConfig from "./config";
import GitClient from "../github-client/git-client";
import CheckingDocs from "./branches-checking";
import CopyDocs from "./copy-docs";
import DocsVersions from "./docs-versions";
import { makeDir } from "../helpers";

const prepareDocs = async (coreConfig: CoreConfig) => {
  const configBranches = docsConfig.branches;
  const outputPath = resolve(docsConfig.outputPath);
  const outputDocsVersion = resolve(docsConfig.outputDocsVersion);
  const sourcePath = resolve(docsConfig.sourcePath);

  let err: Error | null;
  let result;
  [err, result] = await to(
    CheckingDocs.releases(docsConfig.numberOfProcessedReleases),
  );
  if (err) {
    throw new VError(err, `while checking releases`);
  }

  let releases;
  let prereleases;
  if (result) {
    releases = result.releases;
    prereleases = result.prereleases;
  }

  let branches;
  [err, branches] = await to(CheckingDocs.branches(configBranches));
  if (err) {
    throw new VError(err, `while checking branches`);
  }

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

  [err] = await to(
    CopyDocs.releases({
      releases,
      source: sourcePath,
      output: outputPath,
    }),
  );
  if (err) {
    throw err;
  }

  [err] = await to(
    CopyDocs.releases({
      releases: prereleases,
      source: sourcePath,
      output: outputPath,
    }),
  );
  if (err) {
    throw err;
  }

  [err] = await to(
    CopyDocs.branches({
      branches,
      source: sourcePath,
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
        releases,
        pre_releases: prereleases,
        branches,
      },
      outputDocsVersion,
    ),
  );
  if (err) {
    throw err;
  }
};

const preparePreviewDocs = async () => {
  const branchName = docsConfig.branches[0];

  let outputPath = resolve(docsConfig.outputPath);
  if (!outputPath.endsWith(branchName)) {
    outputPath = outputPath.endsWith("/")
      ? `${outputPath}${branchName}`
      : `${outputPath}/${branchName}`;
  }
  const sourcePath = resolve(docsConfig.sourcePath);
  const outputDocsVersion = resolve(docsConfig.outputDocsVersion);

  let [err] = await to(makeDir(outputPath));
  if (err) {
    throw err;
  }

  [err] = await to(
    CopyDocs.local({
      source: sourcePath,
      output: outputPath,
    }),
  );
  if (err) {
    throw err;
  }

  // :(
  const branches = new Map<string, string>([[branchName, ""]]);

  console.log(`Generating documentation versions file to ${outputDocsVersion}`);
  [err] = await to(
    DocsVersions.generate(
      {
        branches,
      },
      outputDocsVersion,
    ),
  );
  if (err) {
    throw err;
  }
};

export default async (coreConfig: CoreConfig) => {
  if (coreConfig.prepareFor === PrepareFor.DOCS_PREVIEW) {
    return preparePreviewDocs();
  }
  if (coreConfig.prepareFor === PrepareFor.WEBSITE) {
    return prepareDocs(coreConfig);
  }
  return;
};
