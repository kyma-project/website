import { writeJSON } from "fs-extra";
import to from "await-to-js";
import { VError } from "verror";

import coreConfig from "../config";
import roadmapConfig from "./config";

import GitHubGraphQLClient from "../github-client/github-graphql-client";

import { getUnique, writeToJson, removeHTMLComments } from "../helpers";
import {
  Tickets,
  Repository,
  Release,
  ReleasesData,
  Attributes,
  ReleaseIssues,
  Issue,
} from "./types";

export class TicketsHelper {
  removeDuplicateOfReleases = (releases: Release[]): Release[] => {
    return getUnique<Release>(releases, "release_id");
  };

  removeClosedReleases = (releases: Release[]): Release[] => {
    return releases.filter(release => release.state === "open");
  };

  prepareTickets = (
    repositoriesWithEpics: Repository[],
    releaseData: ReleasesData,
    releases: Release[],
    attributes: Attributes[],
  ): Tickets => {
    const filteredReleaseDate: ReleasesData = this.filterIssuesByEpics(
      repositoriesWithEpics,
      releaseData,
    );
    const tickets: Tickets = this.createTickets(
      repositoriesWithEpics,
      filteredReleaseDate,
      releases,
      attributes,
    );

    return tickets;
  };

  writeTickets = async (outputPath, tickets) => {
    const [err] = await to(writeToJson(outputPath, tickets));
    if (err) throw err;
  };

  private filterIssuesByEpics = (
    repositoriesWithEpics: Repository[],
    releaseData: ReleasesData,
  ): ReleasesData => {
    const newReleaseData: ReleasesData = {};
    for (const release in releaseData) {
      newReleaseData[release] = releaseData[release].filter(issue => {
        let result: boolean = false;

        for (const repository of repositoriesWithEpics) {
          if (issue.repo_id === Number(repository.id)) {
            for (const repositoryIssue of repository.issues) {
              if (issue.issue_number === repositoryIssue.number) {
                result = true;
                break;
              }
            }
          }
        }

        return result;
      });
    }

    newReleaseData[
      roadmapConfig.releaseForNonCategorizedIssues
    ] = this.filterIssuesForFutureRelease(repositoriesWithEpics, releaseData);
    return newReleaseData;
  };

  private filterIssuesForFutureRelease = (
    repositoriesWithEpics: Repository[],
    releaseData: ReleasesData,
  ): ReleaseIssues[] => {
    const nonCategorizedIssues: ReleaseIssues[] = [];
    for (const repository of repositoriesWithEpics) {
      for (const repositoryIssue of repository.issues) {
        let add: boolean = true;

        for (const release in releaseData) {
          for (const releaseIssue of releaseData[release]) {
            if (release === roadmapConfig.releaseForNonCategorizedIssues) {
              break;
            }

            if (
              releaseIssue.issue_number === repositoryIssue.number &&
              releaseIssue.repo_id === Number(repository.id)
            ) {
              add = false;
              break;
            }
          }
        }

        if (add) {
          nonCategorizedIssues.push({
            repo_id: Number(repository.id),
            issue_number: repositoryIssue.number,
          });
        }
      }
    }
    return nonCategorizedIssues;
  };

  private createTickets = (
    repositoriesWithEpics: Repository[],
    releaseData: ReleasesData,
    releases: Release[],
    attributes: Attributes[],
  ): Tickets => {
    const tickets: Tickets = {};
    for (const release in releaseData) {
      tickets[release] = {};

      attributes.map(attr => {
        tickets[release][attr.displayName] = releaseData[release]
          .map(issue => {
            for (const repository of repositoriesWithEpics) {
              if (issue.repo_id === Number(repository.id)) {
                for (const repositoryIssue of repository.issues) {
                  if (
                    issue.issue_number === repositoryIssue.number &&
                    repositoryIssue.labels.filter(
                      label => attr.epicsLabels.indexOf(label) > -1,
                    ).length
                  ) {
                    return {
                      ...repositoryIssue,
                      body: removeHTMLComments(repositoryIssue.body),
                      release,
                      dueDate: releases
                        .find(r => r.title === release)
                        .desired_end_date,
                      repository: repository.name,
                      zenHubUrl: this.createZenHubUrl(repository.name, repositoryIssue.number),
                      capabilityId: attr.id,
                    };
                  }
                }
              }
            }
          })
          .filter(issue => issue);
      });
    }
    return tickets;
  };

  private createZenHubUrl = (repository: string, issueNumber: number): string => {
    const prefix: string = roadmapConfig.zenHubUrlPrefix.endsWith("/") ? roadmapConfig.zenHubUrlPrefix : `${roadmapConfig.zenHubUrlPrefix}/`;
    return `${prefix}${coreConfig.organization}/${repository}/${issueNumber}`;
  }
}

export default new TicketsHelper();
