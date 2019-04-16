import React from "react";

import Grid from "@styled/Grid";
import H from "@components/shared/H";

import {
  EarlyAdoptersWrapper,
  EarlyAdoptersContent,
  EarlyAdoptersList,
  StyledEarlyAdoptersListItem,
} from "./styled";

import Sprites, { getSapGradientDef, getTwiggleGradientDef } from "./Sprites";

import { FormattedMessage, getTranslation } from "@common/i18n";

const gt = getTranslation("landingPage.earlyAdopters");

interface ListItemProps {
  company: string;
}
const EarlyAdoptersListItem: React.FunctionComponent<ListItemProps> = ({
  company,
  children,
}) => (
  <StyledEarlyAdoptersListItem>
    <svg
      className={`sprite-icon sprite-icon--${company}`}
      role="img"
      aria-labelledby={company}
    >
      {children}
      <title id={company}>{company}</title>
      <use xlinkHref={`#${company}`} />
    </svg>
  </StyledEarlyAdoptersListItem>
);

const EarlyAdopters: React.FunctionComponent = () => (
  <EarlyAdoptersWrapper>
    <Sprites />
    <Grid.Container as="section">
      <Grid.Row>
        <Grid.Unit df={12}>
          <FormattedMessage id={gt("headline")}>
            {headline => (
              <H as="h2" center={true}>
                {headline}
              </H>
            )}
          </FormattedMessage>
        </Grid.Unit>
        <Grid.Unit df={12}>
          <EarlyAdoptersContent className="adopters">
            <EarlyAdoptersList>
              <EarlyAdoptersListItem company="twiggle">
                {getTwiggleGradientDef()}
              </EarlyAdoptersListItem>
              <EarlyAdoptersListItem company="netconomy" />
              <EarlyAdoptersListItem company="sap">
                {getSapGradientDef()}
              </EarlyAdoptersListItem>
              <EarlyAdoptersListItem company="mgm" />
              <EarlyAdoptersListItem company="accenture-interactive" />
              <EarlyAdoptersListItem company="arithnea" />
            </EarlyAdoptersList>
          </EarlyAdoptersContent>
        </Grid.Unit>
      </Grid.Row>
    </Grid.Container>
  </EarlyAdoptersWrapper>
);

export default EarlyAdopters;
