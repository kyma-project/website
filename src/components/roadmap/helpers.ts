import { CapabilityEnum, Capability } from "./types";

export const extractCapabilityByArea = (area: string) => {
  switch (area) {
    case "API Gateway":
      return CapabilityEnum.API;
    case "Application Connectivity":
      return CapabilityEnum.APPLICATION_CONNECTIVITY;
    case "Core and Supporting":
      return CapabilityEnum.CORE_AND_SUPPORTING;
    case "Eventing":
      return CapabilityEnum.EVENTING;
    case "Service Management":
      return CapabilityEnum.SERVICE_MANAGEMENT;
  }
};

export const sortCapabilities = (capabilities: Capability[]) =>
  capabilities.sort((a, b) => {
    const orderA = a.frontmatter.displayName.toLowerCase();
    const orderB = b.frontmatter.displayName.toLowerCase();

    if (orderA > orderB) {
      return 1;
    } else if (orderA < orderB) {
      return -1;
    }
    return 0;
  });
