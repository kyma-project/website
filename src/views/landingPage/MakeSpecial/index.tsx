import React from "react";

import Grid from "@styled/Grid";
import Paragraph from "@components/shared/Paragraph";
import H from "@components/shared/H";

import { FormattedMessage, getTranslation } from "@common/i18n";

import { MakeSpecialWrapper } from "./styled";
import { UsedProjectIcons } from "./UsedProjectIcons";

const gt = getTranslation("landingPage.makeSpecial");

export const MakeSpecial: React.FunctionComponent = () => (
  <MakeSpecialWrapper>
    <Grid.Container as="section">
      <Grid.Row space={true} alignCenter={true}>
        <Grid.Unit df={6} lg={6} md={12}>
          <FormattedMessage id={gt("monolithes.headline")}>
            {headline => (
              <H as="h2" center={true}>
                {headline}
              </H>
            )}
          </FormattedMessage>
          <>
            <FormattedMessage id={gt("monolithes.paragraph")}>
              {paragraph => <Paragraph>{paragraph}</Paragraph>}
            </FormattedMessage>
          </>
        </Grid.Unit>
        <Grid.Unit df={6} lg={6} md={12}>
          <FormattedMessage id={gt("rightTechnologies.headline")}>
            {headline => (
              <H as="h2" center={true}>
                {headline}
              </H>
            )}
          </FormattedMessage>
          <>
            <FormattedMessage id={gt("rightTechnologies.paragraph")}>
              {paragraph => <Paragraph>{paragraph}</Paragraph>}
            </FormattedMessage>
          </>
        </Grid.Unit>
      </Grid.Row>
      <UsedProjectIcons />
    </Grid.Container>
  </MakeSpecialWrapper>
);
