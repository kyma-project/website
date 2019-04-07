/* Roadmap Page Context */
export interface RoadmapPageContext {
  capability: string;
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