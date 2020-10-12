import React from "react";
import { Adopter } from "@typings/landingPage";
import { StyledGridRow } from "./styled";
import Grid from "@styled/Grid";
import { Card } from "./Card";

export type CustomerPairArray = Array<[Adopter, Adopter?]>;

export const CustomerPair: React.FunctionComponent<{
  customers: CustomerPairArray;
}> = ({ customers }) => (
  <React.Fragment>
    {customers.map(([first, second]) => (
      <StyledGridRow key={first.company}>
        <Grid.Unit df={6}>
          <Card {...first} />
        </Grid.Unit>
        {!!second ? (
          <Grid.Unit df={6}>
            <Card {...second} />
          </Grid.Unit>
        ) : null}
      </StyledGridRow>
    ))}
  </React.Fragment>
);
