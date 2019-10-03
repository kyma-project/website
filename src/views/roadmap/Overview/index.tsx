import React from "react";

import Grid from "@styled/Grid";

import { FormattedMessage, getTranslation } from "@common/i18n";

import H from "@components/shared/H";
import Paragraph from "@components/shared/Paragraph";

import { OverviewWrapper, OverviewHeader } from "./styled";

const gt = getTranslation("roadmap.overview");

export const Overview: React.FunctionComponent = () => (
  <Grid.Container>
    <Grid.Row>
      <OverviewWrapper>
        <Grid.Row>
          <Grid.Unit df={2} md={0} />
          <Grid.Unit df={8} md={12}>
            <OverviewHeader>
              <FormattedMessage id={gt("header")}>
                {data => <H as="h2">{data}</H>}
              </FormattedMessage>
              <FormattedMessage id={gt("subHeader")}>
                {data => <H as="h4">{data}</H>}
              </FormattedMessage>
              <FormattedMessage id={gt("description")}>
                {data => <Paragraph>{data}</Paragraph>}
              </FormattedMessage>
            </OverviewHeader>
          </Grid.Unit>
          <Grid.Unit df={2} md={0} />
        </Grid.Row>
      </OverviewWrapper>
    </Grid.Row>
  </Grid.Container>
);
