export interface CapabilityGQL {
  rawMarkdownBody: string;
  fields: CapabilityFields;
  frontmatter: CapabilityMetadata;
}

export interface CapabilityFields {
  slug: string;
  type: string;
  displayName: string;
}

export interface CapabilityMetadata {
  displayName: string;
  epicsLabels: string[];
  id: string;
}
export interface RoadmapNavigationNode {
  displayName: string;
  id: string;
}

export interface CapabilityDisplayNameReferencesToId {
  [displayName: string]: string;
}
