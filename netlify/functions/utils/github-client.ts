import Octokit, { Response, PullsListFilesResponse } from "@octokit/rest";
import { PullRequest } from "github-webhook-event-types";

export class GitHubClient {
  private octokit: Octokit;

  constructor() {
    this.octokit = new Octokit();
    this.octokit.authenticate({
      type: "token",
      token: process.env.BOT_GITHUB_TOKEN,
    });
  }

  getFilesFromPullRequest = async (
    event: PullRequest,
  ): Promise<PullsListFilesResponse> => {
    const response: Response<
      PullsListFilesResponse
    > = await this.octokit.pulls.listFiles({
      owner: event.repository.owner.login,
      repo: event.repository.name,
      pull_number: event.number,
    });

    return response ? response.data : null;
  };
}
