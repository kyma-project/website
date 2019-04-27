import React from "react";

import Grid from "@styled/Grid";

import Header from "@components/roadmap/Tickets/Header";
import ReleaseComponent from "@components/roadmap/Tickets/Release";

import { Release } from "../types";

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

const Tickets: React.FunctionComponent = () => {
  const prepareRelease = () => null;

  return (
    <TicketsWrapper>
      {tickets.map((release: Release) => (
        <ReleaseComponent release={release} />
      ))}
    </TicketsWrapper>
  );
};

export default Tickets;
