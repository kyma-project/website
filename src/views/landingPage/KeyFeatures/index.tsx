import React from "react";

import Grid from "@styled/Grid";
import Button from "@components/shared/Button";
import Link from "@components/shared/Link";
import H from "@components/shared/H";

import Connectivity from "../assets/landing-page/Connectivity";
import Extendable from "../assets/landing-page/Extendable";
import TechIndependent from "../assets/landing-page/TechIndependent";

import { FormattedMessage, getTranslation } from "@common/i18n";

import {
  KeyFeaturesWrapper,
  KeyFeaturesSection,
  KeyFeaturesParagraph,
  KeyFeaturesSvgWrap,
  KeyFeaturesLink,
} from "./styled";

const gt = getTranslation("landingPage.keyFeatures");

enum Sections {
  APPLICATION_CONNECTOR = "applicationConnector",
  SERVERLESS = "serverless",
  SERVICE_MANAGEMENT = "serviceManagement",
}

export const KeyFeatures: React.FunctionComponent = () => {
  const getIllustrationComponent = (sectionId: Sections) => {
    switch (sectionId) {
      case Sections.APPLICATION_CONNECTOR:
        return <Connectivity />;
      case Sections.SERVERLESS:
        return <TechIndependent />;
      case Sections.SERVICE_MANAGEMENT:
        return <Extendable />;
      default:
        return null;
    }
  };

  const getUrlForSection = (sectionId: Sections) => {
    switch (sectionId) {
      case Sections.APPLICATION_CONNECTOR:
        return "/docs/components/application-connector";
      case Sections.SERVERLESS:
        return "/docs/components/serverless";
      case Sections.SERVICE_MANAGEMENT:
        return "/docs/components/service-catalog";
      default:
        return "/docs";
    }
  };

  const readMoreButton = (sectionId: Sections) => (
    <KeyFeaturesLink to={getUrlForSection(sectionId)}>
      <FormattedMessage id={gt("readMoreLink")} />
    </KeyFeaturesLink>
  );

  const createSection = (sectionId: Sections) => (
    <KeyFeaturesSection df={4} lg={4} md={12} key={sectionId}>
      <FormattedMessage id={gt(`${sectionId}.id`)}>
        {id => (
          <KeyFeaturesSvgWrap>
            {getIllustrationComponent(id as Sections)}
          </KeyFeaturesSvgWrap>
        )}
      </FormattedMessage>
      <FormattedMessage id={gt(`${sectionId}.headline`)}>
        {headline => (
          <H as="h3" center={true} style={{ minHeight: "66px" }}>
            {headline}
          </H>
        )}
      </FormattedMessage>
      <FormattedMessage id={gt(`${sectionId}.paragraph`)}>
        {paragraph => <KeyFeaturesParagraph>{paragraph}</KeyFeaturesParagraph>}
      </FormattedMessage>
      <div style={{ margin: "0 auto" }}>{readMoreButton(sectionId)}</div>
    </KeyFeaturesSection>
  );

  return (
    <KeyFeaturesWrapper>
      <Grid.Container>
        <Grid.Row space={true}>
          <Grid.Unit df={12}>
            <FormattedMessage id={gt("headline")}>
              {headline => (
                <H as="h2" center={true}>
                  {headline}
                </H>
              )}
            </FormattedMessage>
          </Grid.Unit>
          {Object.values(Sections).map(section => createSection(section))}
          <div style={{ margin: "30px auto 0 auto" }}>
            <Link.Internal to="/docs/root/kyma/#overview-key-components">
              <Button.Emphasized>
                <FormattedMessage id={gt("seeButton")} />
              </Button.Emphasized>
            </Link.Internal>
          </div>
        </Grid.Row>
      </Grid.Container>
    </KeyFeaturesWrapper>
  );
};
