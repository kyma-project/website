/* Roadmap Page Context */
export interface RoadmapPageContext {
  slug: string;
  capabilitiesNavigation: NavigationItem[];
}

export interface NavigationItem {
  displayName: string;
  path: string;
}

export interface Capability {
  rawMarkdownBody: string;
  fields: CapabilityFields;
  frontmatter: CapabilityMetadata;
}

/* Capability fields */
export interface CapabilityFields {
  slug: string;
}

/* Capability Metadata */
export interface CapabilityMetadata {
  displayName: string;
  epicsLabels: string[];
}