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
  const isMobile = is.smallPhone();

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
            <StyledGridUnit>
              <HeaderWrapper marginBottom={10}>
                <H as="h2">
                  <FormattedMessage
                    id={gt("headline")}
                    tagName={React.Fragment}
                  />
                </H>
                <FormattedMessage tagName="p" id={gt("paragraph")} />
              </HeaderWrapper>
              <MobileGallery customers={adopters} isMobile={isMobile} />
            </StyledGridUnit>
          </Grid.Row>
        ) : (
          <Grid.Row>
            <Grid.Unit df={12}>
              <HeaderWrapper marginBottom={30}>
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
        {isMobile ? null : (
          <ButtonWrapper>
            {!!opened ? (
              <AddCompanyButton />
            ) : (
              <LoadAllButton size="md" onClick={useToggle}>
                <FormattedMessage id={gt("loadAll")} />
              </LoadAllButton>
            )}
          </ButtonWrapper>
        )}
      </StyledGridContainer>
    </StyledWrapper>
  );
};

const AddCompanyButton = () => (
  <Link.External to={config.links.ADD_KYMA_USER}>
    <Button.Emphasized size="md">
      <FormattedMessage id={gt("addYourCompany")} />
    </Button.Emphasized>
  </Link.External>
);

const ButtonWrapper = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  /* & button {
    padding: 0 30px;
  } */
`;

const LoadAllButton = styled(Button.Normal)`
  padding: 0 70px;
`;

const CustomerPair: React.FunctionComponent<{
  customers: CustomerPairArray;
}> = ({ customers }) => (
  <React.Fragment>
    {customers.map(([first, second]) => (
      <StyledGridRow key={first.company}>
        <Grid.Unit df={6}>
          <Card {...first} />
        </Grid.Unit>
        {!!second ? (
          <Grid.Unit df={6}>
            <Card {...second} />
          </Grid.Unit>
        ) : null}
      </StyledGridRow>
    ))}
  </React.Fragment>
);

const StyledGridRow = styled(Grid.Row)`
  justify-content: center;
`;

const StyledWrapper = styled.div`
  background: url(${usedByBackgroundSVG});
  background-size: 100% 1050px;
  padding: 200px 15px 30px;
  background-repeat: no-repeat;
  ${media.phone`
    background-size: 120% 600px;
    padding: 110px 15px 0px;
  `};
  ${media.smallPhone`
    background-size: 120% 600px;
    padding: 110px 15px 0px;
  `};
`;

const StyledGridContainer = styled(Grid.Container)`
  ${media.smallPhone`
    padding: 0;
  `}
`;

const StyledGridUnit = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  flex: 0 0 100%;
  max-width: 100%;
`;

export const UsedBy = injectIntl("landingPage.usedBy")(UsedByRaw);
