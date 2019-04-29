import React, { useState, useEffect, useContext } from "react";

import Grid from "@styled/Grid";

import Header from "@components/roadmap/Tickets/Header";
import ReleaseComponent from "@components/roadmap/Tickets/Release";

import RoadmapService from "@components/roadmap/service";
import TicketsService from "@components/roadmap/Tickets/service";

import { Wrapper } from "./styled";

export const TicketsWrapper: React.FunctionComponent = ({ children }) => (
  <Wrapper>
    <Grid.Container>
      <Grid.Row>
        <Grid.Unit df={12} md={0}>
          <Header />
        </Grid.Unit>
        <Grid.Unit df={12} md={12}>
          {children}
        </Grid.Unit>
      </Grid.Row>
    </Grid.Container>
  </Wrapper>
);

const Tickets: React.FunctionComponent = () => {
  const { ticketsReference } = useContext(RoadmapService);
  const { prepareReleases } = useContext(TicketsService);

  return (
    <div ref={ticketsReference}>
      <TicketsWrapper>
        {prepareReleases().map((release, idx) => (
          <ReleaseComponent
            key={idx}
            release={release.release}
            orderNumber={release.orderNumber}
          />
        ))}
      </TicketsWrapper>
    </div>
  );
};

export default Tickets;
