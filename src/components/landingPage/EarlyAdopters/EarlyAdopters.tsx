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

export interface EarlyAdopter {
  company: string;
  title: string;
  link: string;
}

interface Props {
  earlyAdopters: EarlyAdopter[];
}

const gt = getTranslation("landingPage.earlyAdopters");

const EarlyAdopters: React.FunctionComponent<Props> = ({ earlyAdopters }) => {
  const getCompanyData = (company: string) =>
    earlyAdopters.find(c => c.company === company) as EarlyAdopter;

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
                <EarlyAdoptersListItem {...getCompanyData("twiggle")}>
                  {getTwiggleGradientDef()}
                </EarlyAdoptersListItem>
                <EarlyAdoptersListItem {...getCompanyData("netconomy")} />
                <EarlyAdoptersListItem {...getCompanyData("sap")}>
                  {getSapGradientDef()}
                </EarlyAdoptersListItem>
                <EarlyAdoptersListItem {...getCompanyData("mgm")} />
                <EarlyAdoptersListItem
                  {...getCompanyData("accenture-interactive")}
                />
              </EarlyAdoptersList>
              <EarlyAdoptersList>
                <EarlyAdoptersListItem {...getCompanyData("arithnea")} />
                <EarlyAdoptersListItem {...getCompanyData("saas")} />
              </EarlyAdoptersList>
            </EarlyAdoptersContent>
          </Grid.Unit>
        </Grid.Row>
      </Grid.Container>
    </EarlyAdoptersWrapper>
  );
};

export default EarlyAdopters;
