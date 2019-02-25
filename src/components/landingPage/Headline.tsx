import React from "react";

import Grid from "@styled/Grid";
import WhatIsSvg from "./assets/landing-page/WhatIs";

import { FormattedMessage, getTranslation } from "@common/i18n";

import { HeadlineWrapper } from "./styled";

const gt = getTranslation("landingPage");

const Headline: React.FunctionComponent = () => {
  return (
    <Grid.Container as="header">
      <Grid.Row>
        <Grid.Unit df={6} lg={7} md={8} sm={10} xs={12}>
          <HeadlineWrapper>
            <FormattedMessage id={gt("headline")} />
          </HeadlineWrapper>
        </Grid.Unit>
      </Grid.Row>
    </Grid.Container>
  );
};

export default Headline;
