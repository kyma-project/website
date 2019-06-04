import { writeJSON } from "fs-extra";
import to from "await-to-js";
import { VError } from "verror";

import coreConfig from "../config";
import roadmapConfig from "./config";

import GitHubGraphQLClient from "../github-client/github-graphql-client";
import ZenHubClient from "../github-client/zenhub-client";

import TicketsExtractor from "./tickets-extractor";

import {
  Repository,
  Release,
  Issue,
  ReleaseIssue,
  ReleasesIssuesData,
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
    if (err) {
      throw new VError(err, `while query repositories`);
    }

    const repositories: Repository[] = data.organization.repositories.edges.map(
      repo => {
        const result: Repository = {
          name: repo.node.name,
          id: repo.node.databaseId,
          issues: [],
        };

        return result;
      },
    );

    return repositories;
  };

  queryEpicIssues = async (repository: Repository): Promise<Issue[]> => {
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

    const firstLabels = 7;
    const firstIssues = Math.floor(500 / firstLabels);

    const options = {
      organization: coreConfig.organization,
      labels: roadmapConfig.labels,
      firstIssues,
      firstLabels,
      issuesStates: ["OPEN"],
    };

    const [err, data] = await to<any>(
      GitHubGraphQLClient.query(query, {
        ...options,
        repositoryName: repository.name,
      }),
    );
    if (err) {
      throw new VError(
        err,
        `while query epics for repository: ${repository.name}`,
      );
    }

    const issues: Issue[] = data.organization.repository.issues.edges.map(
      issue => {
        const node = issue.node;
        const labels: string[] = node.labels.edges
          .map(label => label.node.name)
          .filter((label: string) => !roadmapConfig.labels.includes(label));

        return {
          ...node,
          githubUrl: node.url,
          labels,
          repository: {
            ...repository,
            issues: [],
          },
        } as Issue;
      },
    );

    return issues;
  };

  queryEpics = async (repositories: Repository[]): Promise<Repository[]> => {
    const result: Repository[] = [];
    for (const repository of repositories) {
      const [err, issues] = await to<Issue[]>(this.queryEpicIssues(repository));
      if (err) {
        throw err;
      }

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
      if (err) {
        throw err;
      }

      releases = [...releases, ...data];
    }
    releases = TicketsExtractor.removeDuplicatedReleases(releases);
    return TicketsExtractor.removeClosedReleases(releases);
  };

  queryIssuesReleases = async (
    releases: Release[],
  ): Promise<ReleasesIssuesData> => {
    const releaseIssues: ReleasesIssuesData = {};

    for (const release of releases) {
      const [err, data] = await to<ReleaseIssue[]>(
        ZenHubClient.issuesForRelease(String(release.release_id)),
      );
      if (err) {
        throw err;
      }

      releaseIssues[release.title] = data;
    }
    return releaseIssues;
  };
}

export default new TicketsFetcher();
