export interface RoadmapPageContext {
  slug: string;
  capabilities: Capability[];
  capabilitiesNavigation: NavigationItem[];
  ids: { [key: string]: CapabilityEnum };
}

export interface RoadmapModalContext {
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

/* Tickets */
export interface Tickets {
  [release: string]: {
    [capability: string]: Ticket[];
  };
}

export interface Ticket {
  title: string;
  body: string;
  number: number;
  labels: string[];
  githubUrl: string;
  zenHubUrl: string;
  dueDate: string;
  release: TicketRelease;
  repository: TicketRepository;
  capability: TicketCapability;
}

export interface TicketRelease {
  release_id: string;
  title: string;
  start_date: string;
  desired_end_date: string;
  state: "open" | "closed";
}

export interface TicketRepository {
  name: string;
  id: string | number;
  issues: Ticket[];
}

export interface TicketCapability {
  displayName: string;
  epicsLabels: string[];
  id: string;
}

export interface Release {
  displayName: string;
  capabilities: {
    [capability: string]: Ticket[];
  };
}
