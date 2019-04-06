export interface CoreConfig {
  token: string | null,
  organization: string,
  repository: string,
}

const config: CoreConfig = {
  token: process.env.APP_TOKEN || null,
  organization: process.env.APP_ORGANIZATION || "kyma-project",
  repository: process.env.APP_REPOSITORY || "kyma",
}

export default config;
