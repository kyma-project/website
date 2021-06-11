import { Specification } from "@typings/docs";
import { ImageSpec } from "../../../../types";

export interface ContentGQL<T = any> {
  rawMarkdownBody: string;
  fields: {
    slug: string;
    filePath?: string;
    imagesSpec: ImageSpec[];
  } & T;
  frontmatter: {
    title: string;
    type: string;
    specifications?: string[];
  };
  fileAbsolutePath: string;
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
  [topic: string]: DocsContentItem;
}

export interface DocsContentItem {
  id: string;
  type: string;
  displayName: string;
  description: string;
  docs: DocsContentDocs[];
  specifications?: Specification[];
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
  imagesSpec: ImageSpec[];
  type?: string;
}

/* Navigation */
export interface DocsNavigation {
  [group: string]: DocsNavigationTopic[];
}

export interface DocsNavigationTopic {
  noContent: boolean;
  displayName: string;
  id: string;
  children: DocsNavigationTopic[];
}

/* Manifest */
export interface DocsManifest {
  spec: ManifestSpec;
}
export type ManifestSpec = DocsNavigation;
export type ManifestItem = DocsNavigationTopic;
