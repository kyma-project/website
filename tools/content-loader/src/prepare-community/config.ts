export interface CommunityConfig {
  outputPath: string;
  sourcePath: string;
  repository: string;
}

const config: CommunityConfig = {
  outputPath: process.env.APP_COMMUNITY_OUTPUT || "community",
  sourcePath: process.env.APP_COMMUNITY_SOURCE_DIR || "tempCommunityDir",
  repository: process.env.APP_COMMUNITY_REPOSITORY || "community",
};

export default config;
