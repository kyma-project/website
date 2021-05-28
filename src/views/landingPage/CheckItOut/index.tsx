import React from "react";
import Grid from "@styled/Grid";
import { Termynal } from "./Termynal/Termynal";
import { StyledGridUnit } from "../ExtensionsAndTools/styled";
import H from "@components/shared/H";
import config from "@config";
import {
  ParagraphWrapper,
  ParagraphTitleWrapper,
  CLIIcon,
  SvgWrapper,
  ProjectIcon,
  LearnMoreButton,
  StyledGridContainer,
  HeaderWrapper,
} from "./styled";
import { CenteredLink } from "../styled";

import {
  FormattedMessage,
  FunctionComponentIntl,
  getTranslation,
  injectIntl,
} from "@common/i18n";
import imagePNG1 from "../assets/landing-page/checkItOut/1.png";
import imagePNG2 from "../assets/landing-page/checkItOut/2.png";
import imagePNGCLI from "../assets/landing-page/checkItOut/terminal.png";

const gt = getTranslation("landingPage.checkItOut");

const image1 = {
  src: imagePNG1,
  alt: "1",
};

const image2 = {
  src: imagePNG2,
  alt: "2",
};

const imageCLI = {
  src: imagePNGCLI,
  alt: "CLI",
};

const CheckItOutRaw: FunctionComponentIntl = ({ formatMessage }) => (
  <StyledGridContainer as="section">
    <HeaderWrapper>
      <H as="h2">
        <FormattedMessage id={gt("headline")} tagName={React.Fragment} />
      </H>
    </HeaderWrapper>

    <Grid.Row space={true}>
      <Grid.Unit df={6} lg={6} md={12} withoutMargin={true}>
        <SvgWrapper>
          <ProjectIcon src={image1.src} alt={image1.alt} />
          <ParagraphTitleWrapper>
            <FormattedMessage id={gt("firstParagraphTitle")} />
          </ParagraphTitleWrapper>
        </SvgWrapper>

        <ParagraphWrapper>
          <FormattedMessage
            id={gt("firstParagraph1")}
            values={{
              options: (
                <CenteredLink to={config.links.DOCS_INSTALL_CLI}>
                  options
                </CenteredLink>
              ),
            }}
          />
        </ParagraphWrapper>

        <ParagraphWrapper />
        <ParagraphWrapper>
          <FormattedMessage id={gt("firstParagraph2")} />
        </ParagraphWrapper>
        <Termynal />

        <SvgWrapper>
          <ProjectIcon src={image2.src} alt={image2.alt} />
          <ParagraphTitleWrapper>
            <FormattedMessage id={gt("secondParagraphTitle")} />
          </ParagraphTitleWrapper>
        </SvgWrapper>
        <ParagraphWrapper>
          <FormattedMessage id={gt("secondParagraph1")} />
        </ParagraphWrapper>
        <CenteredLink to={config.links.GETTING_STARTED}>
          <LearnMoreButton size="md">
            <FormattedMessage id={gt("learnMore")} />
          </LearnMoreButton>
        </CenteredLink>
      </Grid.Unit>
      <Grid.Unit df={6} lg={6} md={12} withoutMargin={true}>
        <SvgWrapper>
          <CLIIcon src={imageCLI.src} alt={imageCLI.alt} />
        </SvgWrapper>
      </Grid.Unit>
    </Grid.Row>
  </StyledGridContainer>
);

export const CheckItOut = injectIntl("landingPage")(CheckItOutRaw);
