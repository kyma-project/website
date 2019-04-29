/* Roadmap Page Context */
export interface RoadmapPageContext {
  slug: string;
  capabilitiesNavigation: NavigationItem[];
  ids: { [key: string]: CapabilityEnum };
  ticket: Ticket;
}

export interface NavigationItem {
  displayName: string;
  id: string;
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
  id: string;
}

export enum CapabilityEnum {
  API = "api-gateway",
  APPLICATION_CONNECTIVITY = "application-connectivity",
  CORE_AND_SUPPORTING = "core-and-supporting",
  EVENTING = "eventing",
  FUNCTIONS = "functions",
  MICRO_FRONTEND = "micro-frontend",
  MONITORING = "monitoring",
  PROVISIONING = "provisioning",
  SERVICE_MANAGEMENT = "service-management",
}

/* Release */

export interface Release {
  displayName: string;
  capabilities: {
    [capability: string]: Ticket[];
  };
}

/* Tickets */
export interface Tickets {
  [release: string]: {
    [capability: string]: Ticket[];
  };
}

export interface Ticket {
  title: string;
  body: string;
  url: string;
  number: number;
  labels: string[];
  release: string;
  zenHubUrl: string;
  dueDate: string;
  repository: string;
  capabilityId: string;
}
