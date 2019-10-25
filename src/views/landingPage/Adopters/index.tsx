import React from "react";

import Grid from "@styled/Grid";
import H from "@components/shared/H";
import Link from "@components/shared/Link";
import Button from "@components/shared/Button";
import Paragraph from "@components/shared/Paragraph";

import { AdoptersGallery } from "./AdoptersGallery";

import { FormattedMessage, getTranslation } from "@common/i18n";

import { Adopter } from "@typings/landingPage";

import { AdoptersWrapper, AddYourCompanyWrapper } from "./styled";

import config from "@config";

interface Props {
  adopters: Adopter[];
}

const gt = getTranslation("landingPage.adopters");

export const Adopters: React.FunctionComponent<Props> = ({ adopters }) => (
  <AdoptersWrapper id={config.landingPage.ids.usedBy}>
    <Grid.Container as="section">
      <Grid.Row>
        <Grid.Unit df={12}>
          <header>
            <H as="h2" center={true}>
              <FormattedMessage id={gt("headline")} />
            </H>
            <Paragraph>
              <FormattedMessage id={gt("paragraph")} />
            </Paragraph>
          </header>
        </Grid.Unit>
        <Grid.Unit df={12}>
          <AdoptersGallery adopters={adopters} />
        </Grid.Unit>
        <Grid.Unit df={12}>
          <AddYourCompanyWrapper>
            <Link.External to={config.links.ADD_KYMA_USER}>
              <Button.Emphasized size="sm">
                <FormattedMessage id="landingPage.adopters.addYourCompany" />
              </Button.Emphasized>
            </Link.External>
          </AddYourCompanyWrapper>
        </Grid.Unit>
      </Grid.Row>
    </Grid.Container>
  </AdoptersWrapper>
);
