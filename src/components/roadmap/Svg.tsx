import React from "react";

import Api from "@components/roadmap/Svgs/Api";
import ApplicationConnectivity from "@components/roadmap/Svgs/ApplicationConnectivity";
import CoreAndSupporting from "@components/roadmap/Svgs/CoreAndSupporting";
import Eventing from "@components/roadmap/Svgs/Eventing";
import Functions from "@components/roadmap/Svgs/Functions";
import MicroFrontend from "@components/roadmap/Svgs/MicroFrontend";
import Monitoring from "@components/roadmap/Svgs/Monitoring";
import Provisioning from "@components/roadmap/Svgs/Provisioning";
import ServiceManagement from "@components/roadmap/Svgs/ServiceManagement";

interface CapabilitySvgProps {
  capability: string;
}

const CapabilitySvg: React.FunctionComponent<CapabilitySvgProps> = ({
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
      case "functions":
        return <Functions />;
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

export default CapabilitySvg;
