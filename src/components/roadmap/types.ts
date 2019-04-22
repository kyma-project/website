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
  type: string;
  displayName: string;
}

/* Capability Metadata */
export interface CapabilityMetadata {
  displayName: string;
  epicsLabels: string[];
}

export enum CapabilityEnum {
  API = "api",
  APPLICATION_CONNECTIVITY = "application-connectivity",
  CORE_AND_SUPPORTING = "core-and-supporting",
  EVENTING = "eventing",
  FUNCTIONS = "functions",
  MICRO_FRONTEND = "micro-frontend",
  MONITORING = "monitoring",
  PROVISIONING = "provisioning",
  SERVICE_MANAGEMENT = "service-management",
}
