export interface CommunityConfig {
  outputPath: string;
  tempPath: string;
  repository: string;
}

const config: CommunityConfig = {
  outputPath: process.env.APP_COMMUNITY_OUTPUT || "community",
  tempPath: process.env.APP_COMMUNITY_TEMP_DIR || "tempCommunityDir",
  repository: process.env.APP_COMMUNITY_REPOSITORY || "community",
};

export default config;
