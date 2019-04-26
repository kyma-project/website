import { resolve } from "path";
import to from "await-to-js";
import { VError } from "verror";

import { CoreConfig } from "../config";
import roadmapConfig, { RoadmapConfig } from "./config";
import GitClient from "../github-client/git-client";

import CapabilitiesFetcher from "./capabilities-fetcher";
import TicketsFetcher from "./tickets-fetcher";
import TicketsHelper from "./tickets-helper";

import { Attributes, Repository, Release, ReleasesData, Tickets } from "./types";

const prepareRoadmapContent = async (coreConfig: CoreConfig) => {
  const capabilitiesDir = resolve(`${roadmapConfig.tempPath}/${roadmapConfig.capabilitiesDir}`);
  const capabilitiesOutput = resolve(roadmapConfig.capabilitiesOutput);
  const ticketsOutput = resolve(roadmapConfig.ticketsOutput);

  let err: Error | null;

  console.log(`Cloning ${coreConfig.organization}/${roadmapConfig.repository}`);
  [err] = await to(CapabilitiesFetcher.copyCommunityRepository(coreConfig));
  if (err) throw err;

  console.log(`Copying capabilities`);
  [err] = await to(CapabilitiesFetcher.copyCapabilities(capabilitiesDir, capabilitiesOutput));
  if (err) throw err;

  console.log(`Extracting metadata of capabilities`);
  let attributes: Attributes[] = [];
  [err, attributes] = await to(CapabilitiesFetcher.extractCapabilitiesMetadata(capabilitiesDir));
  if (err) throw err;

  console.log(`Querying or repositories of ${coreConfig.organization}`);
  let repositories: Repository[];
  [err, repositories] = await to(TicketsFetcher.queryRepositories());
  if (err) throw err;

  console.log(`Querying for issues with Epic label`);
  let repositoriesWithEpics: Repository[];
  [err, repositoriesWithEpics] = await to(TicketsFetcher.queryEpics(repositories));
  if (err) throw err;

  console.log(`Querying for releases`);
  let releases: Release[];
  [err, releases] = await to(TicketsFetcher.queryRepositoriesReleases(repositories));
  if (err) throw err;

  console.log(`Querying for issues in releases`);
  let releasesData: ReleasesData; 
  [err, releasesData] = await to(TicketsFetcher.queryIssuesReleases(releases));
  if (err) throw err;

  console.log(`Generating tickets`);
  const tickets: Tickets = TicketsHelper.prepareTickets(repositoriesWithEpics, releasesData, releases, attributes);

  console.log(`Writing tickets to ${ticketsOutput}`);
  [err] = await to (TicketsHelper.writeTickets(ticketsOutput, tickets));
  if (err) throw err;
};

export default prepareRoadmapContent;
