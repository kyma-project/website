export interface RoadmapConfig {
  zenHubToken: string;
  outputPath: string;
  tempPath: string;
  repository: string;
  capabilitiesDir: string;
  capabilitiesOutput: string;
  ticketsOutput: string;
  labels: string[];
  releaseForNonCategorizedEpics: string;
}

const config: RoadmapConfig = {
  zenHubToken: process.env.APP_ZEN_HUB_TOKEN || null,
  outputPath: process.env.APP_ROADMAP_OUTPUT || "roadmap",
  tempPath: process.env.APP_ROADMAP_TEMP_DIR || "tempRoadmapDir",
  repository: process.env.APP_ROADMAP_REPOSITORY || "community",
  capabilitiesDir: process.env.APP_ROADMAP_CAPABILITIES_DIR || "capabilities",
  capabilitiesOutput: process.env.APP_ROADMAP_CAPABILITIES_OUTPUT || "roadmap/capabilities",
  ticketsOutput: process.env.APP_ROADMAP_TICKETS_OUTPUT || "roadmap/tickets",
  labels: process.env.APP_ROADMAP_LABELS ? process.env.APP_ROADMAP_LABELS.replace(/ /g, "").split(",") : ["Epic"],
  releaseForNonCategorizedEpics: process.env.APP_ROADMAP_NON_CATEGORIZED_RELEASE || "Future",
};

export default config;
