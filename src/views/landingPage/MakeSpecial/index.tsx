import React from "react";

import Grid from "@styled/Grid";
import Paragraph from "@components/shared/Paragraph";
import H from "@components/shared/H";
import Button from "@components/shared/Button";

import { FormattedMessage, getTranslation } from "@common/i18n";

import { MakeSpecialWrapper, CenteredLink } from "./styled";
import { UsedProjectIcons } from "./UsedProjectIcons";

const gt = getTranslation("landingPage.makeSpecial");

export const MakeSpecial: React.FunctionComponent = () => (
  <MakeSpecialWrapper>
    <Grid.Container as="section">
      <Grid.Row space={true} alignCenter={true}>
        <Grid.Unit df={6} lg={6} md={12}>
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
          {/* make sure this link is correct !!!!!!!!!! */}
          <CenteredLink to="/docs/#overview-in-a-nutshell">
            <Button.Emphasized>
              <FormattedMessage id={gt("extend.readDocsButton")} />
            </Button.Emphasized>
          </CenteredLink>
        </Grid.Unit>
        <Grid.Unit df={6} lg={6} md={12}>
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
          {/* make sure this link is correct !!!!!!!!!! */}
          <CenteredLink to="/docs/#details-components">
            <Button.Emphasized>
              <FormattedMessage id={gt("rightTools.readDocsButton")} />
            </Button.Emphasized>
          </CenteredLink>
        </Grid.Unit>
      </Grid.Row>
      <UsedProjectIcons />
    </Grid.Container>
  </MakeSpecialWrapper>
);
