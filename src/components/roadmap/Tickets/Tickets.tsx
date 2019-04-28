import React, { useState } from "react";

import Grid from "@styled/Grid";

import Header from "@components/roadmap/Tickets/Header";
import ReleaseComponent from "@components/roadmap/Tickets/Release";

import { Release, Capability, Tickets as TicketsType } from "../types";

import { Wrapper } from "./styled";

import tickets from "../../../../content/roadmap/tickets.json";

interface TicketsWrapperProps {
  capabilities: Capability[];
}

export const TicketsWrapper: React.FunctionComponent<TicketsWrapperProps> = ({
  capabilities,
  children,
}) => (
  <Wrapper>
    <Grid.Container>
      <Grid.Row>
        <Grid.Unit df={12} md={0}>
          <Header capabilities={capabilities} />
        </Grid.Unit>
        <Grid.Unit df={12} md={12}>
          {children}
        </Grid.Unit>
      </Grid.Row>
    </Grid.Container>
  </Wrapper>
);

interface TicketsProps {
  capabilities: Capability[];
}

const Tickets: React.FunctionComponent<TicketsProps> = ({ capabilities }) => {
  interface ReleaseWithNumber {
    release: Release;
    orderNumber: number;
  }

  const prepareReleases = (): ReleaseWithNumber[] => {
    const releases: Release[] = [];

    Object.keys(tickets).map(release => {
      releases.push({
        displayName: release,
        capabilities: tickets[release],
      });
    });

    const filteredReleases = releases
      .sort((a, b) =>
        a.displayName > b.displayName
          ? 1
          : b.displayName > a.displayName
          ? -1
          : 0,
      )
      // filter capabilities without tickets
      .map(release => ({
        displayName: release.displayName,
        capabilities: Object.keys(release.capabilities)
          .filter(key => release.capabilities[key].length)
          .reduce(
            (res: any, key) => ((res[key] = release.capabilities[key]), res),
            {},
          ),
      }))
      // filter release without capabilities
      .filter(release =>
        Object.keys(release.capabilities).some(
          capability => release.capabilities[capability].length > 0,
        ),
      );

    let order = 0;
    const releasesWithOrder: ReleaseWithNumber[] = filteredReleases.map(
      release => {
        const r = {
          release,
          orderNumber: order,
        };
        order += Object.keys(release.capabilities).length;

        return r;
      },
    );

    return releasesWithOrder;
  };

  return (
    <TicketsWrapper capabilities={capabilities}>
      {prepareReleases().map((release, idx) => (
        <ReleaseComponent
          key={idx}
          release={release.release}
          orderNumber={release.orderNumber}
        />
      ))}
    </TicketsWrapper>
  );
};

export default Tickets;
