import React from "react";

import Grid from "@styled/Grid";
import H from "@components/shared/H";

import {
  EarlyAdoptersWrapper,
  EarlyAdoptersContent,
  EarlyAdoptersList,
} from "../styled";

import { EarlyAdoptersListItem } from "./EarlyAdoptersListItem";

import Sprites, { getSapGradientDef, getTwiggleGradientDef } from "../Sprites";

import { FormattedMessage, getTranslation } from "@common/i18n";

interface EarlyAdopter {
  name: string;
  link: string;
}

interface Props {
  earlyAdopters: EarlyAdopter[];
}

const gt = getTranslation("landingPage.earlyAdopters");

const EarlyAdopters: React.FunctionComponent<Props> = ({ earlyAdopters }) => {
  const getLink = (company: string): string => {
    const comp = earlyAdopters.find(c => c.name === company);
    return comp ? comp.link : "";
  };

  return (
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
                <EarlyAdoptersListItem
                  company="twiggle"
                  link={getLink("twiggle")}
                >
                  {getTwiggleGradientDef()}
                </EarlyAdoptersListItem>
                <EarlyAdoptersListItem
                  company="netconomy"
                  link={getLink("netconomy")}
                />
                <EarlyAdoptersListItem company="sap" link={getLink("sap")}>
                  {getSapGradientDef()}
                </EarlyAdoptersListItem>
                <EarlyAdoptersListItem company="mgm" link={getLink("mgm")} />
                <EarlyAdoptersListItem
                  company="accenture-interactive"
                  link={getLink("accenture-interactive")}
                />
              </EarlyAdoptersList>
              <EarlyAdoptersList>
                <EarlyAdoptersListItem
                  company="arithnea"
                  link={getLink("arithnea")}
                />
                <EarlyAdoptersListItem company="saas" link={getLink("saas")} />
              </EarlyAdoptersList>
            </EarlyAdoptersContent>
          </Grid.Unit>
        </Grid.Row>
      </Grid.Container>
    </EarlyAdoptersWrapper>
  );
};

export default EarlyAdopters;
