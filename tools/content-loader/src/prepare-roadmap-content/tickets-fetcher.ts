import { writeJSON } from "fs-extra";
import to from "await-to-js";
import { VError } from "verror";

import coreConfig from "../config";
import roadmapConfig from "./config";

import GitHubGraphQLClient from "../github-client/github-graphql-client";
import ZenHubClient from "../github-client/zenhub-client";

import TicketsHelper from "./tickets-helper";

import {
  Repository,
  Release,
  Issue,
  ReleasesData,
  ReleaseIssues,
} from "./types";

export class TicketsFetcher {
  queryRepositories = async (): Promise<Repository[]> => {
    const query = `
      query repositories($organization: String!, $firstRepositories: Int!) {
        organization(login: $organization) {
          repositories(first: $firstRepositories) {
            edges {
              node {
                name
                databaseId
              }
            }
          }
        }
      }
    `;

    const options = {
      organization: coreConfig.organization,
      firstRepositories: 100,
    };

    const [err, data] = await to<any>(
      GitHubGraphQLClient.query(query, options),
    );
    if (err) throw new VError(err, `while query repositories`);

    return data.organization.repositories.edges.map(
      repo => ({ ...repo.node, id: repo.node.databaseId } as Repository),
    ) as Repository[];
  };

  queryEpics = async (repositories: Repository[]): Promise<Repository[]> => {
    const query = `
      query epics(
        $organization: String!, 
        $repositoryName: String!, 
        $labels: [String!], 
        $firstIssues: Int!, 
        $firstLabels: Int!, 
        $issuesStates: [IssueState!]
      ) {
        organization(login: $organization) {
          repository(name: $repositoryName) {
            name
            issues(first: $firstIssues, labels: $labels, states: $issuesStates) {
              edges {
                node {
                  title
                  body
                  url
                  number
                  labels(first: $firstLabels) {
                    edges {
                      node {
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const firstLabels = 10;
    const firstIssues = Math.floor(500 / firstLabels);

    const options = {
      organization: coreConfig.organization,
      labels: roadmapConfig.labels,
      firstIssues,
      firstLabels,
      issuesStates: ["OPEN"],
    };

    let result: Repository[] = [];
    for (const repository of repositories) {
      const [err, data] = await to<any>(
        GitHubGraphQLClient.query(query, {
          ...options,
          repositoryName: repository.name,
        }),
      );
      if (err)
        throw new VError(
          err,
          `while query epics for repository: ${repository.name}`,
        );

      const issues: Issue[] = data.organization.repository.issues.edges.map(
        issue => {
          const node = issue.node;
          const labels: string[] = node.labels.edges
            .map(label => label.node.name)
            .filter((label: string) => !roadmapConfig.labels.includes(label));

          return { ...node, labels };
        },
      );

      result.push({
        ...repository,
        issues,
      });
    }

    return result;
  };

  queryRepositoriesReleases = async (
    repositories: Repository[],
  ): Promise<Release[]> => {
    let releases: Release[] = [];
    for (const repository of repositories) {
      const [err, data] = await to<Release[]>(
        ZenHubClient.reportForReleases(String(repository.id)),
      );
      if (err) throw err;

      releases = [...releases, ...data];
    }
    releases = TicketsHelper.removeDuplicateOfReleases(releases);
    return TicketsHelper.removeClosedReleases(releases);
  };

  queryIssuesReleases = async (releases: Release[]): Promise<ReleasesData> => {
    let releaseIssues: ReleasesData = {};

    for (const release of releases) {
      const [err, data] = await to<ReleaseIssues[]>(
        ZenHubClient.issuesForRelease(String(release.release_id)),
      );
      if (err) throw err;

      releaseIssues[release.title] = data;
    }
    return releaseIssues;
  };
}

export default new TicketsFetcher();
