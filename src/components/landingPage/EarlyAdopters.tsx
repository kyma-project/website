import React from "react";

import Grid from "@styled/Grid";
import H from "@components/shared/H";

import {
  EarlyAdoptersWrapper,
  EarlyAdoptersContent,
  EarlyAdoptersList,
  EarlyAdoptersListItem,
} from "./styled";

import Sprites, { getSapGradientDef, getTwiggleGradientDef } from "./Sprites";

import { FormattedMessage, getTranslation } from "@common/i18n";

const gt = getTranslation("landingPage.earlyAdopters");

const EarlyAdopters: React.FunctionComponent = () => {
  return (
    <EarlyAdoptersWrapper>
      <Sprites />
      <Grid.Container as="section">
        <Grid.Row>
          <Grid.Unit df={12}>
            <FormattedMessage id={gt("headline")}>
              {headline => (
                <H as="h2" center>
                  {headline}
                </H>
              )}
            </FormattedMessage>
          </Grid.Unit>
          <Grid.Unit df={12}>
            <EarlyAdoptersContent className="adopters">
              <EarlyAdoptersList>
                <EarlyAdoptersListItem>
                  <svg
                    className="sprite-icon sprite-icon--twiggle"
                    role="img"
                    aria-labelledby="twiggle"
                  >
                    {getTwiggleGradientDef()}
                    <title id="twiggle">twiggle</title>
                    <use xlinkHref="#twiggle" />
                  </svg>
                </EarlyAdoptersListItem>
                <EarlyAdoptersListItem>
                  <svg
                    className="sprite-icon sprite-icon--netconomy"
                    role="img"
                    aria-labelledby="netconomy"
                  >
                    <title id="netconomy">netconomy</title>
                    <use xlinkHref="#netconomy" />
                  </svg>
                </EarlyAdoptersListItem>
                <EarlyAdoptersListItem>
                  <svg
                    className="sprite-icon sprite-icon--sap"
                    role="img"
                    aria-labelledby="sap"
                  >
                    {getSapGradientDef()}
                    <title id="sap">sap</title>
                    <use xlinkHref="#sap" />
                  </svg>
                </EarlyAdoptersListItem>
                <EarlyAdoptersListItem>
                  <svg
                    className="sprite-icon sprite-icon--mgm"
                    role="img"
                    aria-labelledby="mgm"
                  >
                    <title id="mgm">mgm</title>
                    <use xlinkHref="#mgm" />
                  </svg>
                </EarlyAdoptersListItem>
                <EarlyAdoptersListItem>
                  <svg
                    className="sprite-icon sprite-icon--accenture-interactive"
                    role="img"
                    aria-labelledby="accenture-interactive"
                  >
                    <title id="accenture-interactive">
                      accenture-interactive
                    </title>
                    <use xlinkHref="#accenture-interactive" />
                  </svg>
                </EarlyAdoptersListItem>
              </EarlyAdoptersList>
            </EarlyAdoptersContent>
          </Grid.Unit>
        </Grid.Row>
      </Grid.Container>
    </EarlyAdoptersWrapper>
  );
};

export default EarlyAdopters;
