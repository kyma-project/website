import { writeJSON } from "fs-extra";
import to from "await-to-js";
import { VError } from "verror";
import {
  ReposListReleasesResponse,
  ReposGetReleaseResponse,
  ReposGetBranchResponse,
  ReposListTagsResponse,
} from "@octokit/rest";

import { writeToJson } from "../helpers";

export type DocsVersionsInterface = {
  releases?: Map<string, string>;
  pre_releases?: Map<string, string>;
  branches?: Map<string, string>;
};

export type DocsGeneratedVersions = {
  releases: DocsReleasesVersion[];
  pre_releases: DocsReleasesVersion[];
  branches: DocsBranchesVersion[];
};

export type DocsReleasesVersion = {
  name: string;
  tag: string;
};

export type DocsBranchesVersion = {
  name: string;
  commit: string;
};

export class DocsVersions {
  async generate(v: DocsVersionsInterface, outputPath: string) {
    const releasesVersions = this.forReleases(v.releases);
    const prereleasesVersions = this.forReleases(v.pre_releases);
    const branchesVersions = this.forBranches(v.branches);

    const versions: DocsGeneratedVersions = {
      releases: releasesVersions,
      pre_releases: prereleasesVersions,
      branches: branchesVersions,
    };

    const [err] = await to(writeToJson(outputPath, versions));
    if (err) throw err;
  }

  private forReleases(releases?: Map<string, string>) {
    const versions = [];
    if (!releases) return versions;

    releases.forEach((tag, name) => {
      versions.push({
        name: name,
        tag: tag,
      });
    });

    return versions;
  }

  private forBranches(branches?: Map<string, string>) {
    const versions = [];
    if (!branches) return versions;

    branches.forEach((commit, branch) => {
      versions.push({
        name: branch,
        commit: commit,
      });
    });

    return versions;
  }
}

export default new DocsVersions();
