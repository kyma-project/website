import { readFile } from "fs-extra";
import to from "await-to-js";
import { VError } from "verror";
const fm = require("front-matter");

import { CoreConfig } from "../config";
import roadmapConfig from "./config";

import GitClient from "../github-client/git-client";
import GitHubGraphQLClient from "../github-client/github-graphql-client";

import { copyResources, getFilesPaths } from "../helpers";
import { Capability } from "./types";

export class CapabilitiesFetcher {
  private allowedFilesRegex = /^((?!(README\.md|display-name\.md|assets)).)*$/;

  copyCommunityRepository = async (config: CoreConfig) => {
    console.log(`Cloning ${config.organization}/${config.repository}`);
    const [err] = await to(GitClient.clone());
    if (err) {
      throw new VError(
        err,
        `while cloning ${config.organization}/${config.repository}`,
      );
    }
  };

  copyCapabilities = async (capabilitiesDir: string, output: string) => {
    console.log(`Copy capabilities to ${output}`);
    const [err] = await to(
      copyResources(capabilitiesDir, output, this.allowedFilesRegex),
    );
    if (err) {
      throw new VError(err, `while copying capabilities to ${output}`);
    }
  };

  extractCapabilitiesMetadata = async (
    capabilitiesDir: string,
  ): Promise<Capability[]> => {
    let err: Error | null;
    let files: any;
    [err, files] = await to(getFilesPaths(capabilitiesDir));
    if (err) {
      throw new VError(err, `while getting files paths`);
    }

    const filteredFiles = files.filter(file =>
      Boolean(this.allowedFilesRegex.exec(file)),
    );

    const extractedMetadata = filteredFiles.map(
      async (file: string): Promise<Capability> => {
        const [e, result] = await to(readFile(file, "utf8"));
        if (e) {
          throw new VError(e, `cannot read file: ${file}`);
        }
        return fm(result).attributes;
      },
    );

    let capabilities: any;
    [err, capabilities] = await to(Promise.all(extractedMetadata));
    if (err) {
      throw new VError(err, `while extracting metadata from capabilities`);
    }

    return capabilities as Capability[];
  };
}

export default new CapabilitiesFetcher();
