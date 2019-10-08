import React from "react";

import Grid from "@styled/Grid";
import H from "@components/shared/H";

import { AdoptersGallery } from "./AdoptersGallery";

import { FormattedMessage, getTranslation } from "@common/i18n";

import { Adopter } from "@typings/landingPage";

import { AdoptersWrapper } from "./styled";

interface Props {
  adopters: Adopter[];
}

const gt = getTranslation("landingPage.adopters");

export const Adopters: React.FunctionComponent<Props> = ({ adopters }) => (
  <AdoptersWrapper>
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
          <AdoptersGallery adopters={adopters} />
        </Grid.Unit>
      </Grid.Row>
    </Grid.Container>
  </AdoptersWrapper>
);
