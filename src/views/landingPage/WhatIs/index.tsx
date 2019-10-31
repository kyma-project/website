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

import {
  FormattedMessage,
  getTranslation,
  injectIntl,
  FunctionComponentIntl,
} from "@common/i18n";

const gt = getTranslation("landingPage.whatIs");

const WhatIsRaw: FunctionComponentIntl = ({ formatMessage }) => (
  <StyledGridContainer as="section">
    <Grid.Row space={true}>
      <Grid.Unit df={6} lg={6} md={12} withoutMargin={true}>
        <ParagraphWrapper>
          <FormattedMessage
            id={gt("paragraph")}
            values={{
              spelling: (
                <SpellingOfText>
                  {formatMessage({ id: "whatIs.spelling" })}
                </SpellingOfText>
              ),
            }}
          />
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

export const WhatIs = injectIntl("landingPage")(WhatIsRaw);
