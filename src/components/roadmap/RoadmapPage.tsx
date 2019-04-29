import React, { useRef } from "react";

import Grid from "@styled/Grid";

import Modal from "@components/roadmap/Modal/Modal";
import Overview from "@components/roadmap/Overview";
import Capabilities from "@components/roadmap/Capabilities/Capabilities";
import Tickets from "@components/roadmap/Tickets/Tickets";

import { Provider } from "@components/roadmap/service";
import { Provider as TicketsProvider } from "@components/roadmap/Tickets/service";

import { Location } from "@common/types";
import { RoadmapPageContext, Capability, NavigationItem } from "./types";

interface RoadmapPageProps {
  pageContext: RoadmapPageContext;
  capabilities: Capability[];
  location: any;
}

const RoadmapPage: React.FunctionComponent<RoadmapPageProps> = ({
  ...props
}) => (
  <Provider {...props}>
    <Overview />
    <Capabilities />
    <TicketsProvider>
      <Tickets />
    </TicketsProvider>
    {props.pageContext.ticket ? (
      <Modal
        openComponent={null}
        ticket={props.pageContext.ticket}
        capabilityDisplayName={"dupa"}
        show={true}
      />
    ) : null}
  </Provider>
);

export default RoadmapPage;
