import React, { useRef } from "react";

import Grid from "@styled/Grid";

import Modal from "@components/roadmap/Modal/Modal";
import Overview from "@components/roadmap/Overview";
import Capabilities from "@components/roadmap/Capabilities/Capabilities";
import Tickets from "@components/roadmap/Tickets/Tickets";

import { Provider } from "@components/roadmap/service";
import { Provider as TicketsProvider } from "@components/roadmap/Tickets/service";
import { Provider as UrlObserver } from "@components/roadmap/UrlObserver";

import { Location } from "@common/types";
import { RoadmapPageContext, Capability, NavigationItem } from "./types";

interface RoadmapPageProps {
  pageContext: RoadmapPageContext;
  capabilities: Capability[];
  location: any;
  isInitialRenderComplete: boolean;
}

const RoadmapPage: React.FunctionComponent<RoadmapPageProps> = ({
  ...props
}) => (
  <Provider {...props}>
    <UrlObserver>
      <TicketsProvider>
        <Overview />
        <Capabilities />
        <Tickets />
        {props.pageContext.ticket ? <Modal /> : null}
      </TicketsProvider>
    </UrlObserver>
  </Provider>
);

export default RoadmapPage;
