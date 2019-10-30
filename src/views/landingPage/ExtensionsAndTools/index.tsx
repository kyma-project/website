import React from "react";

import Grid from "@styled/Grid";
import Paragraph from "@components/shared/Paragraph";
import H from "@components/shared/H";
import Button from "@components/shared/Button";

import { FormattedMessage, getTranslation } from "@common/i18n";

import { UsedProjectIcons } from "./UsedProjectIcons";

import { ExtensionsAndToolsWrapper, StyledGridUnit } from "./styled";
import { CenteredLink } from "../styled";
import config from "@config";

const gt = getTranslation("landingPage.extensionsAndTools");

// yes, 21, it's so that "Docs" and "Features" buttons are aligned
const sidePadding = 21;

export const ExtensionsAndTools: React.FunctionComponent = () => (
  <ExtensionsAndToolsWrapper>
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
          <CenteredLink to={config.links.DOCS_OVERVIEW_NUTSHELL}>
            <Button.Emphasized>
              <FormattedMessage id={gt("extend.readDocsButton")} />
            </Button.Emphasized>
          </CenteredLink>
        </StyledGridUnit>
        <StyledGridUnit df={6} lg={6} md={12} leftPadding={sidePadding}>
          <FormattedMessage id={gt("tools.headline")}>
            {headline => (
              <H as="h2" center={true}>
                {headline}
              </H>
            )}
          </FormattedMessage>
          <FormattedMessage id={gt("tools.paragraph")}>
            {paragraph => <Paragraph justify={true}>{paragraph}</Paragraph>}
          </FormattedMessage>
          <CenteredLink to={config.links.DOCS_DETAILS_COMPONENTS}>
            <Button.Emphasized>
              <FormattedMessage id={gt("tools.readDocsButton")} />
            </Button.Emphasized>
          </CenteredLink>
        </StyledGridUnit>
      </Grid.Row>
      <UsedProjectIcons />
    </Grid.Container>
  </ExtensionsAndToolsWrapper>
);
