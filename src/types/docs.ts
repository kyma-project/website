import { ImageSpec } from "../../gatsby/types";

export type DocsType = "root" | "component";

/* Docs Page Context */
export interface DocsPageContext {
  version: string;
  v: string;
  versions: DocsVersions;
  navigation: DocsNavigation;
  content: DocsContentItem;
  pagePath: string;
  basePath: string;
  manifest: DocsManifest;
  assetsPath: string;
  repoName: string;
  topic: string;
  specifications: Specification[];
}

export interface DocsModalContext {
  specification: Specification;
  specifications: Specification[];
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
  specifications?: Specification[];
}

export interface DocsConfig {
  spec: {
    id: string;
    displayName: string;
    description: string;
    type: string;
  };
  specifications: Specification[];
}

export interface DocsContentDocs {
  order: string;
  title: string;
  type?: string;
  source: string;
  imagesSpec: ImageSpec[];
}

/* Navigation */
export interface DocsNavigation {
  [group: string]: DocsNavigationElement[];
}

export interface DocsNavigationElement {
  noContent?: boolean;
  displayName: string;
  id: string;
  children?: DocsNavigationElement[];
}

/* Manifest */
export interface DocsManifest {
  spec: ManifestSpec;
}
export type ManifestSpec = DocsNavigation;
export type ManifestItem = DocsNavigationElement;

/* Specification */
export enum SpecificationType {
  MARKDOWN = "markdown",
  OPEN_API = "openapi",
}

export interface Specification {
  type: SpecificationType;
  id: string;
  assetPath: string;
  pageUrl: string;
  githubUrl?: string;
  info: {
    version: string;
    title: string;
    description?: string;
    [key: string]: any;
  };
  spec: any;
}
