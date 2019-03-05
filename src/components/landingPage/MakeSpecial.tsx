import React from "react";

import Grid from "@styled/Grid";
import Button from "@components/shared/Button";
import Link from "@components/shared/Link";
import Paragraph from "@components/shared/Paragraph";
import H from "@components/shared/H";

import MakesSpecialSvg from "./assets/landing-page/MakesSpecial";

import { FormattedMessage, getTranslation } from "@common/i18n";

import { MakeSpecialWrapper, MakesSpecialSvgWrapper } from "./styled";

const gt = getTranslation("landingPage.makeSpecial");

const MakeSpecial: React.FunctionComponent = () => (
  <MakeSpecialWrapper>
    <Grid.Container as="section">
      <Grid.Row space={true} alignCenter={true}>
        <Grid.Unit df={6} lg={6} md={12}>
          <MakesSpecialSvgWrapper>
            <MakesSpecialSvg />
          </MakesSpecialSvgWrapper>
        </Grid.Unit>
        <Grid.Unit df={6} lg={6} md={12}>
          <FormattedMessage id={gt("headline")}>
            {headline => <H as="h2">{headline}</H>}
          </FormattedMessage>
          <>
            <FormattedMessage id={gt("paragraph")}>
              {paragraph => <Paragraph>{paragraph}</Paragraph>}
            </FormattedMessage>
            <Link.Internal to="/docs">
              <Button.Light>
                <FormattedMessage id={gt("readDocsButton")} />
              </Button.Light>
            </Link.Internal>
          </>
        </Grid.Unit>
      </Grid.Row>
    </Grid.Container>
  </MakeSpecialWrapper>
);

export default MakeSpecial;
