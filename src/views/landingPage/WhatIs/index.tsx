import { useStaticQuery, graphql } from "gatsby";
import React, { useEffect } from "react";
import Grid from "@styled/Grid";
import Paragraph from "@components/shared/Paragraph";
import WhatIsSvg from "../assets/landing-page/WhatIs";
import {
  ParagraphWrapper,
  StyledGridContainer,
  SpellingOfText,
} from "./styled";
import "./termynal.css";
import kymaGif from "../assets/landing-page/test.gif";

import { FormattedMessage, getTranslation } from "@common/i18n";

const gt = getTranslation("landingPage.whatIs");

export const WhatIs: React.FunctionComponent = () => {
  const loadJS = () => import("@static/js/termynal.min.js");
  const loadTermynal = (): void => {
    loadJS().then((arg: any) => {
      // tslint:disable-next-line: no-unused-expression
      new arg.Termynal("#termynal");
    });
  };

  useEffect(() => {
    loadTermynal();
  }, []);

  return (
    <StyledGridContainer as="section">
      <Grid.Row space={true}>
        <Grid.Unit df={6} lg={6} md={12}>
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
            {/* <FormattedMessage id={gt("paragraphs.3")}>
            {paragraph => (
              <Paragraph key="paragraphs.3" marginTop={"10px"}>
                {paragraph}
              </Paragraph>
            )}
          </FormattedMessage> */}
          </ParagraphWrapper>
        </Grid.Unit>
        <Grid.Unit df={6} lg={6} md={12}>
          {/* <img src={kymaGif} /> */}
          {/* <WhatIsSvg /> */}
          <div id="termynal" data-termynal={true}>
            <span data-ty="input">pip install spacy</span>
            <span data-ty="progress" />
            <span data-ty={true}>Successfully installed spacy</span>
            <span data-ty={true} />
            <span data-ty="input">python -m spacy download en</span>
            <span data-ty="progress" />
            <span data-ty={true}>Installed model 'en'</span>
            <span data-ty={true} />
            <span data-ty="input">python</span>
            <span data-ty="input" data-ty-prompt=">>>">
              import spacy
            </span>
            <span data-ty="input" data-ty-prompt=">>>">
              nlp = spacy.load('en')
            </span>
            <span data-ty="input" data-ty-prompt=">>>">
              doc = nlp(u'Hello world')
            </span>
            <span data-ty="input" data-ty-prompt=">>>">
              print([(w.text, w.pos_) for w in doc])
            </span>
            <span data-ty={true}>[('Hello', 'INTJ'), ('world', 'NOUN')]</span>
          </div>
        </Grid.Unit>
      </Grid.Row>
    </StyledGridContainer>
  );
};
