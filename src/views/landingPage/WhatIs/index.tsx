import React from "react";
import Terminal from "react-animated-term";
import "react-animated-term/dist/react-animated-term.css";
import Grid from "@styled/Grid";
import Paragraph from "@components/shared/Paragraph";
import WhatIsSvg from "../assets/landing-page/WhatIs";
import {
  ParagraphWrapper,
  StyledGridContainer,
  SpellingOfText,
} from "./styled";

import kymaGif from "../assets/landing-page/test.gif";

import { FormattedMessage, getTranslation } from "@common/i18n";

const gt = getTranslation("landingPage.whatIs");

const spinner = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
const termLines = [
  {
    text: "node example.js",
    cmd: true,
    delay: 80,
  },
  {
    text: "✔ Loaded app",
    cmd: false,
    repeat: true,
    repeatCount: 5,
    frames: spinner.map(function(spinner) {
      return {
        text: spinner + " Loading app",
        delay: 40,
      };
    }),
  },
  {
    text: "",
    cmd: true,
  },
];

export const WhatIs: React.FunctionComponent = () => (
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
        <Terminal lines={termLines} interval={80} height={200} />
      </Grid.Unit>
    </Grid.Row>
  </StyledGridContainer>
);
