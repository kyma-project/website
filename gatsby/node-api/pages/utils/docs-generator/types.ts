import { Specification } from "@typings/docs";

export interface ContentGQL<T = any> {
  rawMarkdownBody: string;
  fields: {
    slug: string;
  } & T;
  frontmatter: {
    title: string;
    type: string;
  };
}

export interface DocsVersions {
  [type: string]: string[];
}

export interface Docs {
  content: DocsContent;
  navigation: DocsNavigation;
  manifest: ManifestSpec;
}

/* Content */
export interface DocsContent {
  [group: string]: {
    [topic: string]: DocsContentItem;
  };
}

export interface DocsContentItem {
  id: string;
  type: string;
  displayName: string;
  description: string;
  docs: DocsContentDocs[];
  specifications: Specification[];
}

export interface DocsConfig {
  spec: {
    id: string;
    displayName: string;
    description: string;
    type: string;
  };
}

export interface DocsContentDocs {
  order: string;
  title: string;
  source: string;
  type?: string;
}

/* Navigation */
export interface DocsNavigation {
  [group: string]: DocsNavigationTopic[];
}

export interface DocsNavigationTopic {
  displayName: string;
  id: string;
}

/* Manifest */
export interface DocsManifest {
  spec: ManifestSpec;
}
export type ManifestSpec = DocsNavigation;
export type ManifestItem = DocsNavigationTopic;
