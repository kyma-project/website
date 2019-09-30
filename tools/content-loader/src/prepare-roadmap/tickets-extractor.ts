import to from "await-to-js";

import coreConfig from "../config";
import roadmapConfig from "./config";

import { getUnique, writeToJson, removeHTMLComments } from "../helpers";
import {
  Tickets,
  Repository,
  Release,
  ReleasesIssuesData,
  Capability,
  ReleaseIssue,
  Issue,
} from "./types";

export interface ExtractTicketsArgs {
  repositoriesWithEpics: Repository[];
  releaseIssuesData: ReleasesIssuesData;
  releases: Release[];
  capabilities: Capability[];
}

export class TicketsExtractor {
  extractTickets = ({
    repositoriesWithEpics,
    releaseIssuesData,
    releases,
    capabilities,
  }: ExtractTicketsArgs) => {
    const filteredReleaseDate: ReleasesIssuesData = this.filterIssuesByEpics(
      repositoriesWithEpics,
      releaseIssuesData,
    );
    const tickets: Tickets = this.createTickets(
      repositoriesWithEpics,
      filteredReleaseDate,
      releases,
      capabilities,
    );

    return tickets;
  };

  writeTickets = async (outputPath: string, tickets: Tickets) => {
    const [err] = await to(writeToJson(outputPath, tickets));
    if (err) {
      throw err;
    }
  };

  removeDuplicatedReleases = (releases: Release[]): Release[] =>
    getUnique<Release>(releases, "release_id");

  removeClosedReleases = (releases: Release[]): Release[] =>
    releases.filter(release => release.state === "open");

  private filterIssuesByEpics = (
    repositoriesWithEpics: Repository[],
    releaseIssuesData: ReleasesIssuesData,
  ): ReleasesIssuesData => {
    const newReleaseData: ReleasesIssuesData = {};
    for (const release of Object.keys(releaseIssuesData)) {
      newReleaseData[release] = releaseIssuesData[release].filter(issue => {
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
    ] = this.filterIssuesForFutureRelease(
      repositoriesWithEpics,
      releaseIssuesData,
    );
    return newReleaseData;
  };

  private createTickets = (
    repositoriesWithEpics: Repository[],
    releaseData: ReleasesIssuesData,
    releases: Release[],
    capabilities: Capability[],
  ): Tickets => {
    const tickets: Tickets = {};
    for (const release of Object.keys(releaseData)) {
      tickets[release] = {};

      capabilities.map(capability => {
        tickets[release][capability.displayName] = releaseData[release]
          .map(issue => {
            for (const repository of repositoriesWithEpics) {
              if (issue.repo_id === Number(repository.id)) {
                for (const repositoryIssue of repository.issues) {
                  const isLabels = repositoryIssue.labels.filter(
                    label => capability.epicsLabels.indexOf(label) > -1,
                  ).length;
                  if (
                    issue.issue_number === repositoryIssue.number &&
                    isLabels
                  ) {
                    return this.extractIssue(
                      repositoryIssue,
                      releases.find(r => r.title === release),
                      repository,
                      capability,
                    );
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

  private filterIssuesForFutureRelease = (
    repositoriesWithEpics: Repository[],
    releaseIssuesData: ReleasesIssuesData,
  ): ReleaseIssue[] => {
    const futureReleaseIssues: ReleaseIssue[] = [];

    for (const repository of repositoriesWithEpics) {
      for (const repositoryIssue of repository.issues) {
        let add: boolean = true;

        for (const release of Object.keys(releaseIssuesData)) {
          for (const releaseIssue of releaseIssuesData[release]) {
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
          futureReleaseIssues.push({
            repo_id: Number(repository.id),
            issue_number: repositoryIssue.number,
          });
        }
      }
    }
    return futureReleaseIssues;
  };

  private extractIssue = (
    issue: Issue,
    release: Release,
    repository: Repository,
    capability: Capability,
  ): Issue => ({
    ...issue,
    body: removeHTMLComments(issue.body),
    dueDate: release.desired_end_date,
    zenHubUrl: this.createZenHubUrl(repository.name, issue.number),
    release,
    repository: {
      ...repository,
      issues: [],
    },
    capability,
  });

  private createZenHubUrl = (
    repository: string,
    issueNumber: number,
  ): string => {
    const prefix: string = roadmapConfig.zenHubUrlPrefix.endsWith("/")
      ? roadmapConfig.zenHubUrlPrefix
      : `${roadmapConfig.zenHubUrlPrefix}/`;
    return `${prefix}${coreConfig.organization}/${repository}/${issueNumber}`;
  };
}

export default new TicketsExtractor();
