import to from "await-to-js";

import { writeToJson } from "../helpers";
import {
  Tickets,
  Repository,
  Capability,
} from "./types";

export interface ExtractTicketsArgs {
  repositoriesWithEpics: Repository[];
  milestoneTitlesSet: Set<string>;
  capabilities: Capability[];
}

export class TicketsExtractor {
  extractTicketsNEW = ({
    repositoriesWithEpics,
    milestoneTitlesSet,
    capabilities,
  }:  ExtractTicketsArgs) => {
    const tickets: Tickets = this.createTicketsNEW(
      repositoriesWithEpics,
      milestoneTitlesSet,
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

  private createTicketsNEW = (
    repositoriesWithEpics: Repository[],
    milestoneTitlesSet: Set<string>,
    capabilities: Capability[],
  ): Tickets => {
    const tickets: Tickets = {};
    for (const milestoneTitle of milestoneTitlesSet) {
      tickets[milestoneTitle] = {};
      capabilities.forEach(capability => {
        tickets[milestoneTitle][capability.displayName] = []
        repositoriesWithEpics.forEach(repo => {
          repo.issues.forEach(issue => {
            capability.epicsLabels.forEach(label => {
              if (issue.milestone.title === milestoneTitle && issue.labels.indexOf(label) > -1) {
                issue.capability = {
                  id: capability.id,
                  displayName: capability.displayName,
                  epicsLabels: capability.epicsLabels
                }
                tickets[milestoneTitle][capability.displayName].push(issue)
              }
            })
          })
        })
      })
    }
    return tickets;
  };
}

export default new TicketsExtractor();
