import { CapabilityEnum } from "./types";

export const extractCapabilityByDisplayName = (displayName: string) => {
  switch (displayName) {
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
    default:
      return CapabilityEnum.API;
  }
};

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
