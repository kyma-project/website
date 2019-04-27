import React, { useState } from "react";

import Grid from "@styled/Grid";

import Header from "@components/roadmap/Tickets/Header";
import ReleaseComponent from "@components/roadmap/Tickets/Release";

import { Release, Tickets as TicketsType } from "../types";

import { Wrapper } from "./styled";

import tickets from "../../../../content/roadmap/tickets.json";

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

interface TicketsProps {
  tickets: TicketsType;
}

const Tickets: React.FunctionComponent = () => {
  const prepareReleases = (): Release[] => {
    const releases: Release[] = [];

    Object.keys(tickets).map(release => {
      releases.push({
        displayName: release,
        capabilities: tickets[release],
      });
    });

    return releases
      .sort((a, b) =>
        a.displayName > b.displayName
          ? 1
          : b.displayName > a.displayName
          ? -1
          : 0,
      )
      .filter(release =>
        Object.keys(release.capabilities).some(
          capability => release.capabilities[capability].length > 0,
        ),
      );
  };

  return (
    <TicketsWrapper>
      {prepareReleases().map((release, idx) => (
        <ReleaseComponent key={idx} release={release} />
      ))}
    </TicketsWrapper>
  );
};

export default Tickets;
