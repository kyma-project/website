export interface CoreConfig {
  token: string | null;
  organization: string;
  repository: string;
}

const config: CoreConfig = {
  token: process.env.APP_TOKEN || "ececf5dc69bb326c3d215debf7713543f5e49547",
  organization: process.env.APP_ORGANIZATION || "kyma-project",
  repository: "",
};

export default config;
