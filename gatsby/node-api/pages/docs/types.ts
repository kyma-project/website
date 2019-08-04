export interface DocQL {
  rawMarkdownBody: string;
  fields: {
    docInfo: {
      id: string;
      type: string;
      version: string;
      fileName: string;
    };
    slug: string;
  };
  frontmatter: {
    title: string;
    type: string;
  };
}

export interface DocsVersions {
  [type: string]: string[];
}

export interface Docs {
  [version: string]: {
    content: DocsContent;
    navigation: DocsNavigation;
    manifest: ManifestSpec;
  };
}

/* Docs Content */
export interface DocsContent {
  root: DocsContentItems;
  components: DocsContentItems;
  [type: string]: DocsContentItems;
}

export interface DocsContentItems {
  [key: string]: DocsContentItem;
}

export interface DocsContentItem {
  id: string;
  type: DocsType;
  displayName: string;
  description: string;
  docs: DocsContentDocs[];
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
  type?: string;
  source: string;
  [key: string]: string;
}

/* Docs Navigation */
export type DocsType = "root" | "component";

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
  metadata: {
    name: string;
  };
  spec: ManifestSpec;
}

export interface ManifestSpec {
  root: ManifestItem[];
  components: ManifestItem[];
  [type: string]: ManifestItem[];
}

export interface ManifestItem {
  displayName: string;
  id: string;
}
