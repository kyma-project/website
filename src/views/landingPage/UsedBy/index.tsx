import React, { useState } from "react";
import { Adopter } from "@typings/landingPage";
import styled from "@styled";
import H from "@components/shared/H";
import Link from "@components/shared/Link";
import Grid from "@styled/Grid";
import chunk from "lodash.chunk";
import Button from "@components/shared/Button";

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

type CustomerPairArray = Array<[Adopter, Adopter?]>;

const UsedByRaw: FunctionComponentIntl<UsedByProps> = ({ adopters }) => {
  const customers = chunk(adopters, 2) as CustomerPairArray;
  const [opened, useOpen] = useState(false);

  const useToggle = () => {
    useOpen(open => !open);
  };

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
          <CustomerPair customers={customers.slice(0, 2)} />
          {!!opened ? <CustomerPair customers={customers.slice(2)} /> : null}
        </Grid.Row>
        {!!opened ? null : (
          <LoadAllButtonWrapper>
            <LoadAllButton size="md" onClick={useToggle}>
              <FormattedMessage id="landingPage.usedBy.loadAll" />
            </LoadAllButton>
          </LoadAllButtonWrapper>
        )}
      </Grid.Container>
    </StyledWrapper>
  );
};

const LoadAllButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const LoadAllButton = styled(Button.Normal)`
  padding: 0 50px;
`;

const CustomerPair: React.FunctionComponent<{
  customers: CustomerPairArray;
}> = ({ customers }) => (
  <React.Fragment>
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
  </React.Fragment>
);

const StyledWrapper = styled.div`
  background: url(${usedByBackgroundSVG});
  background-size: 100% 1100px;
  background-repeat: no-repeat;
  /* background-color: rebeccapurple; */
  /* margin-top: -200px; */
  /* min-height: 1200px; */
  padding-top: 200px;
`;

export const UsedBy = injectIntl("landingPage.usedBy")(UsedByRaw);
