import React from "react";
import H from "@components/shared/H";
import Grid from "@styled/Grid";
import { sizes } from "@styled";

import { FormattedMessage, getTranslation, injectIntl } from "@common/i18n";

import {
  ButtonWrapper,
  HeaderWrapper,
  ImageWrapper,
  StyledWrapper,
} from "./styled";
import { StyledGridContainer } from "../WhatIs/styled";
import { StyledGridUnit } from "../ExtensionsAndTools/styled";
import Link from "@components/shared/Link";
import Button from "@components/shared/Button";

import inTheNutshellPNG from "@views/landingPage/assets/landing-page/nutshell/in-the-nutshell.png";
import { useWindowSize } from "react-use";

const gt = getTranslation("landingPage.inANutshell");

const NutshellRaw: React.FunctionComponent = () => {
  const { width } = useWindowSize();
  const isMobile = width <= sizes.smallPhone; // same as is.smallPhone(), but because we use useWindowSize we get updated width after every browser window resize

  // TODO: work in progress...
  // how it should looks like: https://github.com/kyma-project/website/issues/632
  return (
    <StyledWrapper>
      <StyledGridContainer as="section">
        <Grid.Row>
          <StyledGridUnit>
            <HeaderWrapper marginBottom={10}>
              <H as="h2">
                <FormattedMessage
                  id={gt("headline")}
                  tagName={React.Fragment}
                />
              </H>
              <FormattedMessage tagName="p" id={gt("paragraph")} />
              <ButtonWrapper>
                <Link.External to="https://github.com/kyma-project/kyma">
                  <Button.Normal iconName="github-alt" iconPrefix="fab">
                    <FormattedMessage id={gt("githubButton")} />
                  </Button.Normal>
                </Link.External>
              </ButtonWrapper>
              <ImageWrapper>
                {isMobile ? (
                  <img src={`${inTheNutshellPNG}`} />
                ) : (
                  <img src={`${inTheNutshellPNG}`} />
                )}
              </ImageWrapper>
            </HeaderWrapper>
          </StyledGridUnit>
        </Grid.Row>
      </StyledGridContainer>
    </StyledWrapper>
  );
};

export const Nutshell = injectIntl("landingPage.inANutshell")(NutshellRaw);
