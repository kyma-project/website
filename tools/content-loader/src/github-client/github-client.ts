import to from "await-to-js";
import { VError } from "verror";
import Octokit = require("@octokit/rest");
import {
  Response,
  ReposGetReleaseResponse,
  ReposGetBranchResponse,
  ReposListTagsResponseItem,
} from "@octokit/rest";

import { CoreConfig } from "../config";

export class GitHubClient {
  private config: CoreConfig;
  private octokit: Octokit;

  constructor() {
    this.config = {} as CoreConfig;
    this.octokit = new Octokit();
  }

  withConfig = (config: CoreConfig) => {
    this.config = config;
    if (!!config.token) {
      this.octokit = new Octokit({
        auth: config.token,
      });
    }
  };

  getReleases = async () => {
    const [err, response] = await to<Response<ReposGetReleaseResponse[]>>(
      this.octokit.repos.listReleases({
        owner: this.config.organization,
        repo: this.config.repository,
        per_page: 100,
      }),
    );
    if (err) {
      throw new VError(err, `while getting list of releases`);
    }

    return response ? response.data : null;
  };

  getLatestCommitFromBranch = async (branch: string) => {
    const [err, response] = await to<Response<ReposGetBranchResponse>>(
      this.octokit.repos.getBranch({
        owner: this.config.organization,
        repo: this.config.repository,
        branch,
      }),
    );
    if (err) {
      throw new VError(err, `while getting data from branch: ${branch}`);
    }

    return response ? response.data.commit.sha : null;
  };

  getTags = async () => {
    const [err, response] = await to<Response<ReposListTagsResponseItem[]>>(
      this.octokit.repos.listTags({
        owner: this.config.organization,
        repo: this.config.repository,
        per_page: 100,
      }),
    );
    if (err) {
      throw new VError(err, `while getting list of tags`);
    }

    return response ? response.data : null;
  };
}

export default new GitHubClient();
