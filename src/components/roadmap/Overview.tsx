import React from "react";

import Grid from "@styled/Grid";

import {
  OverviewWrapper,
  OverviewHeader,
} from "./styled";

const Overview: React.FunctionComponent = () => {
  return (
    <Grid.Container>
      <Grid.Row>
        <OverviewWrapper>
            <Grid.Row>
              <Grid.Unit df={2} />
              <Grid.Unit df={8}>
                <OverviewHeader>
                  <h2>Capabilities</h2>
                  <p>Give Kyma organization minimal Kyma usage statistics. We should know how ofter Kyma is  privisioned daily on local and cluster and with what configration to understand which components are used less Have proper components in place to enable analytics. They should be preconfigured in the way the basic analytics are available out of the box</p>
                </OverviewHeader>
              </Grid.Unit>
              <Grid.Unit df={2} />
            </Grid.Row>
        </OverviewWrapper>
      </Grid.Row>
    </Grid.Container>
  )
};

export default Overview;
