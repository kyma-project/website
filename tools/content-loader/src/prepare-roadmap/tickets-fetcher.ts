import to from "await-to-js";
import { VError } from "verror";

import coreConfig from "../config";
import roadmapConfig from "./config";

import GitHubGraphQLClient from "../github-client/github-graphql-client";

import { Repository, Issue, Milestone } from "./types";

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

  queryMilestones = async (repository: Repository): Promise<Milestone[]> => {
    const query = `
      query milestones($organization: String!, $repositoryName: String!, $firstMilestones: Int!) {
        repository(name:$repositoryName , owner: $organization) {
          milestones(first: $firstMilestones) {
            edges {
              node {
                title
                number
                dueOn
              }
            }
          }
        }
      }
    `;

    const options = {
      organization: coreConfig.organization,
      firstMilestones: 20,
    };

    const [err, data] = await to<any>(
      GitHubGraphQLClient.query(query, {
        ...options,
        repositoryName: repository.name,
      }),
    );
    if (err) {
      throw new VError(err, `while querying milestones`);
    }

    const milestones: Milestone[] = data.repository.milestones.edges.map(
      milestone => {
        const result: Milestone = {
          title: milestone.node.title,
          number: milestone.node.number,
          dueOn: milestone.node.dueOn,
        };

        return result;
      },
    );

    milestones.sort((a, b) => {
      const dateA = new Date(a.dueOn);
      const dateB = new Date(b.dueOn);
      return dateA.getDate() - dateB.getDate();
    });

    return milestones;
  };

  queryEpicIssues = async (repository: Repository): Promise<Issue[]> => {
    const query = `
      query epics(
        $organization: String!, 
        $repositoryName: String!, 
        $labels: [String!], 
        $firstMilestones: Int!, 
        $firstIssues: Int!, 
        $firstLabels: Int!, 
        $issuesStates: [IssueState!]
        $milestonesStates: [MilestoneState!]
      ) {
        organization(login: $organization) {
          repository(name: $repositoryName) {
            name
            id
             milestones(first: $firstMilestones, states: $milestonesStates) {
              edges {
                node {
                  title
                  number
                  dueOn
                  description
                  createdAt
                  closedAt
                  state
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
            }
          }
        }
    `;

    const firstMilestones = 10;
    const firstLabels = 7;
    const firstIssues = Math.floor(500 / firstLabels);

    const options = {
      organization: coreConfig.organization,
      labels: roadmapConfig.labels,
      firstMilestones,
      firstIssues,
      firstLabels,
      issuesStates: ["OPEN"],
      milestonesStates: ["OPEN"],
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

    const issues: Issue[] = [];
    data.organization.repository.milestones.edges.map(milestone => {
      return milestone.node.issues.edges.map(issue => {
        const node = issue.node;
        const labels: string[] = node.labels.edges
          .map(label => label.node.name)
          .filter((label: string) => !roadmapConfig.labels.includes(label));
        issues.push({
          ...node,
          githubUrl: node.url,
          labels,
          dueDate: milestone.node.dueOn,
          release: {
            release_id: milestone.node.number,
            start_date: milestone.node.createdAt,
            desired_end_date: milestone.node.dueOn,
            title: milestone.node.title,
            state: milestone.node.state,
          },
          milestone: {
            title: milestone.node.title,
            number: milestone.node.number,
          },
          repository: {
            id: data.organization.repository.id,
            name: data.organization.repository.name,
            issues: [],
          },
        } as Issue);
      });
    });
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

  getMilestoneTitles = async (
    repositories: Repository[],
  ): Promise<Set<string>> => {
    const milestoneTitlesSet = new Set<string>();
    let err: Error | null = null;
    let milestones: Milestone[];
    for (const repo of repositories) {
      [err, milestones] = await to(this.queryMilestones(repo));
      milestones.forEach(m => {
        milestoneTitlesSet.add(m.title);
      });
      if (err) {
        throw err;
      }
    }
    return milestoneTitlesSet;
  };
}

export default new TicketsFetcher();
