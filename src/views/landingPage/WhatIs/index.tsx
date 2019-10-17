import React from "react";
import Grid from "@styled/Grid";

import Paragraph from "@components/shared/Paragraph";
import WhatIsSvg from "../assets/landing-page/WhatIs";
import { ParagraphWrapper, StyledGridContainer } from "./styled";

import { FormattedMessage, getTranslation } from "@common/i18n";

const gt = getTranslation("landingPage.whatIs");

export const WhatIs: React.FunctionComponent = () => (
  <StyledGridContainer as="section">
    <Grid.Row space={true}>
      <Grid.Unit df={6} lg={6} md={12}>
        <ParagraphWrapper>
          <FormattedMessage id={gt("paragraphs.0")}>
            {paragraph => <Paragraph key="paragraphs.0">{paragraph}</Paragraph>}
          </FormattedMessage>
          <FormattedMessage id={gt("paragraphs.1")}>
            {paragraph => <Paragraph key="paragraphs.1">{paragraph}</Paragraph>}
          </FormattedMessage>
        </ParagraphWrapper>
      </Grid.Unit>
      <Grid.Unit df={6} lg={6} md={12}>
        <WhatIsSvg />
      </Grid.Unit>
    </Grid.Row>
  </StyledGridContainer>
);
