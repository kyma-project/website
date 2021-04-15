import { resolve } from "path";
import to from "await-to-js";
import { VError } from "verror";

import { CoreConfig, PrepareFor } from "../config";
import docsConfig, { DocsRepository } from "./config";
import GitClient from "../github-client/git-client";
import GitHubClient from "../github-client/github-client";
import CheckingDocs from "./branches-checking";
import CopyDocs from "./copy-docs";
import DocsVersions from "./docs-versions";
import { makeDir } from "../helpers";

const configJSON = require("../../../../config.json");

const prepareDocs = async (coreConfig: CoreConfig) => {
  for (const [repositoryName, repository] of Object.entries(
    docsConfig.docsRepositories,
  )) {
    await prepareDocsPerSource(repositoryName, repository, coreConfig);
  }
};

const prepareDocsPerSource = async (
  repositoryName: string,
  repository: DocsRepository,
  coreConfig: CoreConfig,
) => {
  const outputPath = resolve(`${docsConfig.outputPath}/${repositoryName}`);
  const outputDocsVersion = resolve(
    `${docsConfig.outputPath}/${repositoryName}/${docsConfig.outputDocsVersion}`,
  );
  const sourcePath = resolve(repositoryName);

  let err: Error | null = null;

  [err] = await to(makeDir(outputPath));
  if (err) {
    throw err;
  }

  const config: CoreConfig = {
    ...coreConfig,
    repository: repository.repository,
    organization: repository.organization,
  };

  [err] = await to(makeDir(sourcePath, true));
  if (err) {
    throw err;
  }

  GitClient.withConfig(config, repositoryName);
  GitHubClient.withConfig(config);

  [err] = await to(GitClient.clone());
  if (err) {
    throw new VError(
      err,
      `while cloning ${repository.organization}/${repository.repository}`,
    );
  }

  let releases = undefined;
  let prereleases = undefined;
  if (repository.lastReleases) {
    let result;
    [err, result] = await to(CheckingDocs.releases(repository.lastReleases));
    if (err) {
      throw new VError(
        err,
        `while checking releases of repo ${repositoryName}`,
      );
    }

    if (result) {
      releases = result.releases;
      prereleases = result.prereleases;
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
  }

  let branches;
  [err, branches] = await to(CheckingDocs.branches(repository.branches));
  if (err) {
    throw new VError(err, `while checking branches`);
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

const preparePreviewDocs = async (coreConfig: CoreConfig) => {
  const branchName = docsConfig.branches[0];
  const sourceName = coreConfig.prepareForRepo;
  const source: DocsRepository = configJSON.docs[sourceName];
  if (!source) {
    throw new Error(`for preview APP_PREPARE_FOR_REPO env must be defined`);
  }

  let outputPath = resolve(`${docsConfig.outputPath}/${sourceName}`);
  if (!outputPath.endsWith(branchName)) {
    outputPath = outputPath.endsWith("/")
      ? `${outputPath}${branchName}`
      : `${outputPath}/${branchName}`;
  }
  const outputDocsVersion = resolve(
    `${docsConfig.outputPath}/${sourceName}/${docsConfig.outputDocsVersion}`,
  );
  const sourcePath = resolve(docsConfig.sourcePreviewPath);

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

  // commit must be defined :(
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
  if (coreConfig.prepareFor === PrepareFor.WEBSITE) {
    return prepareDocs(coreConfig);
  }
  return preparePreviewDocs(coreConfig);
};
