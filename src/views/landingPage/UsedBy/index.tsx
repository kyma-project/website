import React from "react";
import { Adopter } from "@typings/landingPage";
import styled from "@styled";
import H from "@components/shared/H";
import Grid from "@styled/Grid";
import chunk from "lodash.chunk";

import {
  FormattedMessage,
  getTranslation,
  injectIntl,
  FunctionComponentIntl,
} from "@common/i18n";

import usedByBackgroundSVG from "@views/landingPage/assets/landing-page/usedBy/usedByBackground.svg";

import { Card } from "./Card";

import { HeaderWrapper } from "./styled";

const gt = getTranslation("landingPage.usedBy");

interface UsedByProps {
  adopters: Adopter[];
}

const UsedByRaw: FunctionComponentIntl<UsedByProps> = ({ adopters }) => {
  const customers = chunk(adopters, 2) as Array<[Adopter, Adopter?]>;

  return (
    <StyledWrapper>
      <Grid.Container as="section">
        <Grid.Row>
          <Grid.Unit df={12}>
            <HeaderWrapper>
              <H as="h2">
                <FormattedMessage
                  id={gt("headline")}
                  tagName={React.Fragment}
                />
              </H>
              <FormattedMessage tagName="p" id={gt("paragraph")} />
            </HeaderWrapper>
          </Grid.Unit>
          {customers.map(([first, second]) => (
            <Grid.Row key={first.company}>
              <Grid.Unit df={6}>
                <Card {...first} />
              </Grid.Unit>
              {!!second ? (
                <Grid.Unit df={6}>
                  <Card {...second} />
                </Grid.Unit>
              ) : null}
            </Grid.Row>
          ))}
        </Grid.Row>
      </Grid.Container>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  background-image: url(${usedByBackgroundSVG});
  background-size: 100%;
  background-repeat: no-repeat;
  /* background-color: rebeccapurple; */
  /* margin-top: -200px; */
  min-height: 1200px;
  padding-top: 200px;
`;

export const UsedBy = injectIntl("landingPage.usedBy")(UsedByRaw);
