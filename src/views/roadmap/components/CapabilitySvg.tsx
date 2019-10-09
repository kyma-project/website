import React from "react";

import Api from "./Svgs/Api";
import ApplicationConnectivity from "./Svgs/ApplicationConnectivity";
import CoreAndSupporting from "./Svgs/CoreAndSupporting";
import Eventing from "./Svgs/Eventing";
import Serverless from "./Svgs/Serverless";
import MicroFrontend from "./Svgs/MicroFrontend";
import Monitoring from "./Svgs/Monitoring";
import Provisioning from "./Svgs/Provisioning";
import ServiceManagement from "./Svgs/ServiceManagement";

interface CapabilitySvgProps {
  capability: string;
}

export const CapabilitySvg: React.FunctionComponent<CapabilitySvgProps> = ({
  capability,
}) => {
  const svg = (c: string) => {
    switch (c) {
      case "api":
      case "api-gateway":
        return <Api />;
      case "application-connectivity":
        return <ApplicationConnectivity />;
      case "core-and-supporting":
        return <CoreAndSupporting />;
      case "eventing":
        return <Eventing />;
      case "serverless":
        return <Serverless />;
      case "console-microfrontends":
        return <MicroFrontend />;
      case "logging-tracing-monitoring":
        return <Monitoring />;
      case "provisioning":
        return <Provisioning />;
      case "service-management":
        return <ServiceManagement />;
      default:
        return null;
    }
  };

  return svg(capability);
};
