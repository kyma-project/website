import React from "react";

import Grid from "@styled/Grid";

import { Wrapper } from "./styled";

export const BlogPageWrapper: React.FunctionComponent = ({ children }) => (
  <Grid.Container>
    <Grid.Row>
      <Grid.Unit df={1} md={0} />
      <Grid.Unit df={10} md={12}>
        <Wrapper>{children}</Wrapper>
      </Grid.Unit>
      <Grid.Unit df={1} md={0} />
    </Grid.Row>
  </Grid.Container>
);
