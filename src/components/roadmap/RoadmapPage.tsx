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
  isModal: boolean;
}

const RoadmapPage: React.FunctionComponent<RoadmapPageProps> = ({
  ...props
}) => (
  <Provider {...props}>
    <TicketsProvider>
      {props.isModal ||
      (!props.isModal && !/\/roadmap\/[a-z]/.test(props.location.pathname)) ? (
        <>
          <Overview />
          <Capabilities />
          <Tickets />
        </>
      ) : null}
      {props.pageContext.ticket ? <Modal /> : null}
    </TicketsProvider>
  </Provider>
);

export default RoadmapPage;
