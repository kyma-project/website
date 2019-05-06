import to from "await-to-js";
import { VError } from "verror";

import GitHubClient from "../github-client/github-client";

export class BranchesSerializer {
  async get(configBranches: string[]) {
    const currentBranches = configBranches ? configBranches : [];
    const branches = new Map<string, string>();

    for (const branchName of currentBranches) {
      const [err, commit] = await to(
        GitHubClient.getLatestCommitFromBranch(branchName),
      );
      if (err) {
        throw new VError(
          err,
          `while getting last commit from branch: ${branchName}`,
        );
      }

      if (commit) branches.set(branchName, commit);
    }

    return branches;
  }
}

export default new BranchesSerializer();
