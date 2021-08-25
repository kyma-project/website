import React from "react";

import Grid from "@styled/Grid";
import { Persona } from "./Persona";
import { PersonasI18nTarget } from "@typings/landingPage";
import { injectIntl, IntlInterface } from "@common/i18n";
import H from "@components/shared/H";
import { HeaderWrapper } from "./styled";

const personas = Object.values<PersonasI18nTarget>(PersonasI18nTarget);

const PersonasRaw: React.FunctionComponent<IntlInterface> = ({
  formatMessage,
}) => (
  <Grid.Container as="section">
    <Grid.Row>
      <Grid.Unit df={12}>
        <HeaderWrapper>
          <H as="h2">{formatMessage({ id: `headline` })}</H>
        </HeaderWrapper>
      </Grid.Unit>
      {personas.map((persona, index) => (
        <Grid.Unit df={12} key={persona}>
          <Persona persona={persona} inverted={index % 2 !== 0} />
        </Grid.Unit>
      ))}
    </Grid.Row>
  </Grid.Container>
);

export const Personas = injectIntl("landingPage.personas")(PersonasRaw);
