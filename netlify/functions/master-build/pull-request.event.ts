import { PullRequest } from "github-webhook-event-types";
import { PullsListFilesResponse } from "@octokit/rest";

import { GitHubClient } from "../utils/github-client";

enum PullRequestActionType {
  CLOSED = "closed",
}

enum RepositoryName {
  KYMA = "kyma",
  COMMUNITY = "community",
}

const REPOSITORY_NAMES: string[] = [
  RepositoryName.KYMA,
  RepositoryName.COMMUNITY,
];

const REGEX: { [repository: string]: RegExp } = {
  [RepositoryName.KYMA]: /^(docs\/)|(resources\/core\/charts\/docs\/charts\/content-ui\/templates\/)/,
};

export const checkPullRequestEvent = async (
  event: PullRequest,
): Promise<boolean> => {
  const repositoryName = event.repository.name;
  if (!REPOSITORY_NAMES.includes(repositoryName)) {
    return false;
  }

  if (
    (event.action as PullRequestActionType) === PullRequestActionType.CLOSED &&
    event.pull_request.merged
  ) {
    const files = await fetchChangedFiles(event);
    if (!files || !files.length) {
      return false;
    }

    return checkChangedFiles(repositoryName, files);
  }

  return false;
};

const checkChangedFiles = (
  repositoryName: string,
  files: PullsListFilesResponse,
): boolean => {
  switch (repositoryName) {
    case RepositoryName.KYMA:
      return checkChangedFileNames(files, REGEX[RepositoryName.KYMA]);
    case RepositoryName.COMMUNITY:
      return true;
    default:
      return false;
  }
};

const checkChangedFileNames = (
  files: PullsListFilesResponse,
  regex: RegExp,
): boolean => {
  return files.some(file => regex.test(file.filename));
};

const fetchChangedFiles = async (
  event: PullRequest,
): Promise<PullsListFilesResponse> => {
  const client = new GitHubClient();
  return await client.getFilesFromPullRequest(event);
};
