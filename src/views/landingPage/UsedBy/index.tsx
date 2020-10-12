import React, { useState } from "react";
import { Adopter } from "@typings/landingPage";
import { sizes } from "@styled";
import { useWindowSize } from "react-use";
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

import { CustomerPairArray, CustomerPair } from "./CustomerPair";

import {
  HeaderWrapper,
  StyledWrapper,
  StyledGridUnit,
  ButtonWrapper,
  LoadAllButton,
  StyledGridContainer,
} from "./styled";

import { MobileGallery } from "./MobileGallery";

const gt = getTranslation("landingPage.usedBy");

interface UsedByProps {
  adopters: Adopter[];
}

const UsedByRaw: FunctionComponentIntl<UsedByProps> = ({ adopters }) => {
  const { width } = useWindowSize();

  const isMobile = width <= sizes.smallPhone; // same as is.smallPhone(), but because we use useWindowSize we get updated width after every browser window resize

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
              <Link.External to={config.links.ADD_KYMA_USER}>
                <Button.Emphasized size="md">
                  <FormattedMessage id={gt("addYourCompany")} />
                </Button.Emphasized>
              </Link.External>
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

export const UsedBy = injectIntl("landingPage.usedBy")(UsedByRaw);
