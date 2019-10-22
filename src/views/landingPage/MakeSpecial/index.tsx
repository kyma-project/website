import React from "react";

import Grid from "@styled/Grid";
import Paragraph from "@components/shared/Paragraph";
import H from "@components/shared/H";
import Button from "@components/shared/Button";

import { FormattedMessage, getTranslation } from "@common/i18n";

import { MakeSpecialWrapper, CenteredLink, StyledGridUnit } from "./styled";

const gt = getTranslation("landingPage.makeSpecial");
const sidePadding = 21;

// yes, 21, it's so that "Docs" and "Features" buttons are aligned
const sidePadding = 21;

export const MakeSpecial: React.FunctionComponent = () => (
  <MakeSpecialWrapper>
    <Grid.Container as="section" padding={"padding: 0 30px 0 30px"}>
      <Grid.Row space={true}>
        <StyledGridUnit df={6} lg={6} md={12} rightPadding={sidePadding}>
          <FormattedMessage id={gt("extend.headline")}>
            {headline => (
              <H as="h2" center={true}>
                {headline}
              </H>
            )}
          </FormattedMessage>
          <FormattedMessage id={gt("extend.paragraph")}>
            {paragraph => <Paragraph justify={true}>{paragraph}</Paragraph>}
          </FormattedMessage>
          <CenteredLink to="/docs/#overview-in-a-nutshell">
            <Button.Emphasized>
              <FormattedMessage id={gt("extend.readDocsButton")} />
            </Button.Emphasized>
          </CenteredLink>
        </StyledGridUnit>
        <StyledGridUnit df={6} lg={6} md={12} leftPadding={sidePadding}>
          <FormattedMessage id={gt("rightTools.headline")}>
            {headline => (
              <H as="h2" center={true}>
                {headline}
              </H>
            )}
          </FormattedMessage>
          <FormattedMessage id={gt("rightTools.paragraph")}>
            {paragraph => <Paragraph justify={true}>{paragraph}</Paragraph>}
          </FormattedMessage>
          <CenteredLink to="/docs/#details-components">
            <Button.Emphasized>
              <FormattedMessage id={gt("rightTools.readDocsButton")} />
            </Button.Emphasized>
          </CenteredLink>
        </StyledGridUnit>
      </Grid.Row>
    </Grid.Container>
  </MakeSpecialWrapper>
);
