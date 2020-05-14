import React from "react";

import Grid from "@styled/Grid";

import { Wrapper } from "./styled";

export const BlogPageWrapper: React.FunctionComponent = ({ children }) => (
  <Grid.Container>
    <Grid.Row>
      <Grid.Unit df={2} md={1} sm={0} withoutPadding={true} />
      <Grid.Unit df={8} md={10} sm={12} withoutPadding={true}>
        <Wrapper>{children}</Wrapper>
      </Grid.Unit>
      <Grid.Unit df={2} md={1} sm={0} withoutPadding={true} />
    </Grid.Row>
  </Grid.Container>
);
