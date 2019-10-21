import React, { useEffect, useRef } from "react";
import Grid from "@styled/Grid";
import Paragraph from "@components/shared/Paragraph";

import {
  ParagraphWrapper,
  StyledGridContainer,
  SpellingOfText,
} from "./styled";

import { FormattedMessage, getTranslation } from "@common/i18n";

const gt = getTranslation("landingPage.whatIs");

export const WhatIs: React.FunctionComponent = () => {
  const scriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    const recordID = 276125;
    script.async = true;
    script.src = `https://asciinema.org/a/${recordID}.js`;
    script.id = `asciicast-${recordID}`;

    script.setAttribute("data-theme", "solarized-dark");
    script.setAttribute("data-rows", "20");
    script.setAttribute("data-cols", "75");
    script.setAttribute("data-preload", "true");

    scriptRef.current && scriptRef.current.appendChild(script);

    return () => {
      while (scriptRef.current && scriptRef.current.firstElementChild) {
        scriptRef.current.firstElementChild.remove();
      }
    };
  }, []);

  return (
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
        </Grid.Unit>
        <Grid.Unit df={6} lg={6} md={12} ref={scriptRef} noMargin={true} />
      </Grid.Row>
    </StyledGridContainer>
  );
};
