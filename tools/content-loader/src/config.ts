export enum PrepareFor {
  WEBSITE = "website",
  DOCS_PREVIEW = "docs-preview",
  COMMUNITY_PREVIEW = "community-preview",
}

export interface CoreConfig {
  prepareFor: PrepareFor;
  token: string | null;
  organization: string;
  repository: string;
}

const config: CoreConfig = {
  prepareFor: (process.env.APP_PREPARE_FOR as PrepareFor) || PrepareFor.WEBSITE,
  token: process.env.APP_TOKEN || null,
  organization: process.env.APP_ORGANIZATION || "kyma-project",
  repository: "",
};

export default config;
