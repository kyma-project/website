import React from "react";
import Grid from "@styled/Grid";
import Paragraph from "@components/shared/Paragraph";
import Youtube from "react-youtube";
import { Termynal } from "./Termynal/Termynal";

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
      <Grid.Unit df={6} lg={6} md={12} noMargin={true}>
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
        <CenteredLink to={installDoc}>
          <Button.Emphasized size="sm">
            <FormattedMessage id={gt("installButton")} />
          </Button.Emphasized>
        </CenteredLink>
      </Grid.Unit>
      <Grid.Unit df={6} lg={6} md={12} noMargin={true}>
        <YoutubeWrapper>
          <Youtube videoId={"kP7mSELIxXw"} />
        </YoutubeWrapper>
      </Grid.Unit>
    </Grid.Row>
  </StyledGridContainer>
);
