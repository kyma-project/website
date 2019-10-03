import React from "react";

import Grid from "@styled/Grid";

import { HeaderComponent } from "./Header";
import { ReleaseComponent } from "./Release";

import { useTicketsService } from "../Services";

import { Wrapper } from "./styled";

const TicketsWrapper: React.FunctionComponent = ({ children }) => (
  <Wrapper>
    <Grid.Container>
      <Grid.Row>
        <Grid.Unit df={12}>
          <HeaderComponent />
        </Grid.Unit>
        <Grid.Unit df={12}>{children}</Grid.Unit>
      </Grid.Row>
    </Grid.Container>
  </Wrapper>
);

export const Tickets: React.FunctionComponent = () => {
  const { prepareReleases } = useTicketsService();

  const releases = prepareReleases().map((release, idx) => (
    <ReleaseComponent
      key={idx}
      release={release.release}
      orderNumber={release.orderNumber}
    />
  ));

  return <TicketsWrapper>{releases}</TicketsWrapper>;
};

export default Tickets;
