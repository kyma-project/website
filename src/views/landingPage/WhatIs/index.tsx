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
      new arg.Termynal("#termynal", {
        lineData: [
          { type: "input", value: "pip install spacy" },
          { value: "Are you sure you want to install 'spaCy'?" },
          { type: "input", typeDelay: 1000, prompt: "(y/n)", value: "y" },
          { delay: 1000, value: "Installing spaCy..." },
        ],
      });
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
          <div id="termynal" data-termynal={true} />
        </Grid.Unit>
      </Grid.Row>
    </StyledGridContainer>
  );
};
