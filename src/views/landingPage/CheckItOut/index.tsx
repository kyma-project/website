import React from "react";
import Grid from "@styled/Grid";
import { Termynal } from "./Termynal/Termynal";
import config from "@config";
import {
  ParagraphWrapper,
  ParagraphWrapper2,
  CLIIcon,
  SvgWrapper,
  ProjectIcon,
  StyledGridContainer,
} from "./styled";
import { CenteredLink } from "../styled";
import Button from "@components/shared/Button";

import {
  FormattedMessage,
  FunctionComponentIntl,
  getTranslation,
  injectIntl,
} from "@common/i18n";
import imagePNG1 from "../assets/landing-page/landing-page-1.png";
import imagePNG2 from "../assets/landing-page/landing-page-2.png";
import imagePNGCLI from "../assets/landing-page/landing-page-3.png";

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
    <Grid.Row space={true}>
      <Grid.Unit df={6} lg={6} md={12} withoutMargin={true}>
        <SvgWrapper>
          <ProjectIcon src={image1.src} alt={image1.alt} />
          <ParagraphWrapper2>
            Get yourself a local kyma runtime
          </ParagraphWrapper2>
        </SvgWrapper>

        <ParagraphWrapper>
          <FormattedMessage id={gt("firstParagraph1")} />
        </ParagraphWrapper>
        <ParagraphWrapper>
          <FormattedMessage
            id={gt("firstParagraph2")}
            values={{
              options: (
                <CenteredLink to={config.links.DOCS_INSTALL_CLI}>
                  options
                </CenteredLink>
              ),
            }}
          />
        </ParagraphWrapper>
        <ParagraphWrapper>
          <FormattedMessage id={gt("firstParagraph3")} />
        </ParagraphWrapper>
        <Termynal />

        <SvgWrapper>
          <ProjectIcon src={image2.src} alt={image2.alt} />
          <ParagraphWrapper2>Ready to explore</ParagraphWrapper2>
        </SvgWrapper>
        <ParagraphWrapper>
          <FormattedMessage id={gt("secondParagraph1")} />
        </ParagraphWrapper>
        <ParagraphWrapper>
          <FormattedMessage id={gt("secondParagraph2")} />
        </ParagraphWrapper>
        <CenteredLink to={config.links.GETTING_STARTED}>
          <Button.Normal size="lg">
            <FormattedMessage id={gt("learnMore")} />
          </Button.Normal>
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
