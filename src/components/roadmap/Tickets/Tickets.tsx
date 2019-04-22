import React from "react";

import Grid from "@styled/Grid";

import Header from "@components/roadmap/Tickets/Header";
import Ticket from "@components/roadmap/Tickets/Ticket";

import { Wrapper } from "./styled";

export const TicketsWrapper: React.FunctionComponent = ({ children }) => (
  <Wrapper>
    <Grid.Container>
      <Grid.Row>
        <Grid.Unit df={12} md={0}>
          <Header />
        </Grid.Unit>
        <Grid.Unit df={9} md={12}>
          {children}
        </Grid.Unit>
      </Grid.Row>
    </Grid.Container>
  </Wrapper>
);

const Tickets: React.FunctionComponent = () => (
  <TicketsWrapper>
    <Ticket title="dupa" ticketNumber={1} />
  </TicketsWrapper>
);

export default Tickets;
