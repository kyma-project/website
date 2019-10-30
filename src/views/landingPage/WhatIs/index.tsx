import React from "react";
import Youtube from "react-youtube";
import Grid from "@styled/Grid";
import Paragraph from "@components/shared/Paragraph";
import { Termynal } from "./Termynal/Termynal";
import config from "@config";
import {
  ParagraphWrapper,
  StyledGridContainer,
  SpellingOfText,
  YoutubeWrapper,
} from "./styled";

import { CenteredLink } from "../styled";
import Button from "@components/shared/Button";

import { FormattedMessage, getTranslation } from "@common/i18n";

const gt = getTranslation("landingPage.whatIs");
const installDoc = `docs/root/kyma#installation-installation`;

export const WhatIs: React.FunctionComponent = () => (
  <StyledGridContainer as="section">
    <Grid.Row space={true}>
      <Grid.Unit df={6} lg={6} md={12} withoutMargin={true}>
        <ParagraphWrapper>
          <FormattedMessage id={gt("paragraphs.0")}>
            {paragraph => <Paragraph inline={true}>{paragraph}</Paragraph>}
          </FormattedMessage>
          <FormattedMessage id={gt("paragraphs.1")}>
            {paragraph => <SpellingOfText>{paragraph}</SpellingOfText>}
          </FormattedMessage>
          <FormattedMessage id={gt("paragraphs.2")}>
            {paragraph => <Paragraph inline={true}>{paragraph}</Paragraph>}
          </FormattedMessage>
        </ParagraphWrapper>
        <Termynal />
        <CenteredLink to={config.links.DOCS_INSTALLATION}>
          <Button.Emphasized size="sm">
            <FormattedMessage id={gt("installButton")} />
          </Button.Emphasized>
        </CenteredLink>
      </Grid.Unit>
      <Grid.Unit df={6} lg={6} md={12} withoutMargin={true}>
        <YoutubeWrapper>
          <Youtube videoId={config.quickWalkthroughYoutubeVideo} />
        </YoutubeWrapper>
      </Grid.Unit>
    </Grid.Row>
  </StyledGridContainer>
);
