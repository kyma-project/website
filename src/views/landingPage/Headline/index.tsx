import React from "react";

import Grid from "@styled/Grid";

import { FormattedMessage, getTranslation } from "@common/i18n";

import { HeadlineWrapper } from "./styled";

const gt = getTranslation("landingPage");

export const Headline: React.FunctionComponent = () => (
  <Grid.Container as="header">
    <Grid.Row>
      <Grid.Unit df={12} lg={12} md={12} sm={12} xs={12}>
        <HeadlineWrapper>
          <FormattedMessage id={gt("headline")} />
        </HeadlineWrapper>
      </Grid.Unit>
    </Grid.Row>
  </Grid.Container>
);
