/* Docs */
// export interface Docs {}

export type DocsType = "root" | "component";

/* Docs Page Context */
export interface DocsPageContext {
  version: string;
  versions: DocsVersions;
  navigation: DocsNavigation;
  content: DocsContentItem;
  manifest: DocsManifest;
  assetsPath: string;
}

/* Docs Versions */
export interface DocsVersions {
  releases: string[];
  prereleases: string[];
  branches: string[];
}

/* Docs Content */
export interface DocsContent {
  root: { [key: string]: DocsContentItem };
  components: { [key: string]: DocsContentItem };
}

export interface DocsContentItem {
  id: string;
  type: DocsType;
  displayName: string;
  description: string;
  docs: DocsContentDocs[];
}

export interface DocsContentDocs {
  order: string;
  title: string;
  type?: string;
  source: string;
}

export interface DocsTypesLength {
  [key: string]: number;
}

/* Docs Navigation */
export interface DocsNavigation {
  topics: DocsNavigationTopic[];
}

export interface DocsNavigationTopic {
  id: string;
  contentType: DocsType;
  sections: DocsNavigationTopicSection[];
}

export interface DocsNavigationTopicSection {
  topicType?: string;
  anchor: string;
  name: string;
  titles?: DocsNavigationSectionTitles[];
}

export interface DocsNavigationSectionTitles {
  name: string;
  anchor: string;
}

/* Docs Manifest */
export interface DocsManifest {
  root: DocsManifestItem[];
  components: DocsManifestItem[];
  [type: string]: DocsManifestItem[];
}

export interface DocsManifestItem {
  displayName: string;
  id: string;
}
