import { CreatePageFn, CreateRedirectFn } from "../../types";

export interface CreateRoadmapPages {
  graphql: Function;
  createPage: CreatePageFn;
  createRedirect: CreateRedirectFn;
}

export interface CapabilityQL {
  frontmatter: {
    displayName: string;
    epicsLabels: string[];
    id: string;
  };
}

export interface RoadmapNavigationNode {
  displayName: string;
  id: string;
}

export interface CapabilityDisplayNameReferencesToId {
  [displayName: string]: string;
}
