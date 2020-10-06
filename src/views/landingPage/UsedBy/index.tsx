import React, { useState } from "react";
import { Adopter } from "@typings/landingPage";
import styled, { is, media } from "@styled";
import H from "@components/shared/H";
import Link from "@components/shared/Link";
import Grid from "@styled/Grid";
import chunk from "lodash.chunk";
import Button from "@components/shared/Button";
import config from "@config";
import {
  FormattedMessage,
  getTranslation,
  injectIntl,
  FunctionComponentIntl,
} from "@common/i18n";

import usedByBackgroundSVG from "@views/landingPage/assets/landing-page/usedBy/usedByBackground.svg";

import { Card } from "./Card";

import { HeaderWrapper } from "./styled";
import { MobileGallery } from "./MobileGallery";

const gt = getTranslation("landingPage.usedBy");

interface UsedByProps {
  adopters: Adopter[];
}

type CustomerPairArray = Array<[Adopter, Adopter?]>;

const UsedByRaw: FunctionComponentIntl<UsedByProps> = ({ adopters }) => {
  const isMobile = is.phone() || is.smallPhone();

  const customers = chunk(adopters, 2) as CustomerPairArray;
  const [opened, useOpen] = useState(false);

  const useToggle = () => {
    useOpen(open => !open);
  };

  return (
    <StyledWrapper>
      <StyledGridContainer as="section">
        {isMobile ? (
          <Grid.Row>
            <StyledGridUnit df={12} withoutMargin={true} withoutPadding={true}>
              <HeaderWrapper marginBottom={10}>
                <H as="h2">
                  <FormattedMessage
                    id={gt("headline")}
                    tagName={React.Fragment}
                  />
                </H>
                <FormattedMessage tagName="p" id={gt("paragraph")} />
              </HeaderWrapper>
              <MobileGallery customers={adopters} />
            </StyledGridUnit>
          </Grid.Row>
        ) : (
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
        )}

        <ButtonWrapper>
          {!!opened || isMobile ? (
            <AddCompanyButton />
          ) : (
            <LoadAllButton size="md" onClick={useToggle}>
              <FormattedMessage id={gt("loadAll")} />
            </LoadAllButton>
          )}
        </ButtonWrapper>
      </StyledGridContainer>
    </StyledWrapper>
  );
};

const AddCompanyButton = () => (
  <Link.External to={config.links.ADD_KYMA_USER}>
    <Button.Normal size="md">
      <FormattedMessage id={gt("addYourCompany")} />
    </Button.Normal>
  </Link.External>
);

const ButtonWrapper = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;

const LoadAllButton = styled(Button.Normal)`
  padding: 0 70px;
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
  padding: 200px 15px 60px;
  background-repeat: no-repeat;
  ${media.phone`
    background-size: 120% 600px;
    padding: 110px 15px 60px;
  `};
  ${media.smallPhone`
    background-size: 120% 600px;
    padding: 110px 15px 60px;
  `};
`;

const StyledGridContainer = styled(Grid.Container)`
  ${media.phone`
    padding: 0;
  `}
  ${media.smallPhone`
    padding: 0;
  `}
`;

const StyledGridUnit = styled(Grid.Unit)`
  &&& {
    padding: 0;
    margin: 0;
  }
`;

export const UsedBy = injectIntl("landingPage.usedBy")(UsedByRaw);
