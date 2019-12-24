import to from "await-to-js";

import { writeToJson } from "../helpers";

export interface DocsVersionsInterface {
  releases?: Map<string, string>;
  pre_releases?: Map<string, string>;
  branches?: Map<string, string>;
}

export interface DocsGeneratedVersions {
  releases: DocsReleasesVersion[];
  pre_releases: DocsReleasesVersion[];
  branches: DocsBranchesVersion[];
}

export interface DocsReleasesVersion {
  name: string;
  tag: string;
}

export interface DocsBranchesVersion {
  name: string;
  commit: string;
}

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
    if (err) {
      throw err;
    }
  }

  private forReleases(releases?: Map<string, string>) {
    const versions: DocsReleasesVersion[] = [];
    if (!releases) {
      return versions;
    }

    releases.forEach((tag, name) => {
      versions.push({
        name,
        tag,
      });
    });

    return versions;
  }

  private forBranches(branches?: Map<string, string>) {
    const versions: DocsBranchesVersion[] = [];
    if (!branches) return versions;

    branches.forEach((commit, branch) => {
      versions.push({
        name: branch,
        commit,
      });
    });

    return versions;
  }
}

export default new DocsVersions();
