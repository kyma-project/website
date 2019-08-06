import fetch from "node-fetch";
import { PullsListFilesResponse } from "@octokit/rest";
import { PullRequest } from "github-webhook-event-types";

export class GitHubClient {
  private static apiPath: string = "https://api.github.com";
  private static options = {
    headers: {
      Authorization: `token ${process.env.BOT_GITHUB_TOKEN}`,
    },
  };

  getFilesFromPullRequest = async (
    event: PullRequest,
  ): Promise<PullsListFilesResponse> => {
    let data: PullsListFilesResponse;
    try {
      const subPath = `repos/${event.repository.owner.login}/${event.repository.name}/pulls/${event.number}/files`;

      const response = await fetch(
        `${GitHubClient.apiPath}/${subPath}`,
        GitHubClient.options,
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      data = await response.json();
    } catch (err) {
      throw new Error(err);
    }

    return data ? data : null;
  };
}
