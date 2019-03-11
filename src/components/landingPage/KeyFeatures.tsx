import React from "react";

import Grid from "@styled/Grid";
import Button from "@components/shared/Button";
import Link from "@components/shared/Link";
import H from "@components/shared/H";

import Connectivity from "./assets/landing-page/Connectivity";
import Extendable from "./assets/landing-page/Extendable";
import TechIndependent from "./assets/landing-page/TechIndependent";

import { FormattedMessage, getTranslation } from "@common/i18n";

import {
  KeyFeaturesWrapper,
  KeyFeaturesSection,
  KeyFeaturesParagraph,
  SvgWrap,
  KeyFeaturesLink,
} from "./styled";

const gt = getTranslation("landingPage.keyFeatures");

const KeyFeatures: React.FunctionComponent = () => {
  const sections: string[] = [
    "applicationConnector",
    "serverless",
    "serviceManagement",
  ];

  const getIllustrationComponent = (sectionId: string) => {
    switch (sectionId) {
      case "applicationConnector":
        return <Connectivity />;
      case "serverless":
        return <TechIndependent />;
      case "serviceManagement":
        return <Extendable />;
      default:
        return null;
    }
  };

  const getUrlForSection = (sectionId: string) => {
    switch (sectionId) {
      case "applicationConnector":
        return "/docs/components/application-connector";
      case "serverless":
        return "/docs/components/serverless";
      case "serviceManagement":
        return "/docs/components/service-catalog";
      default:
        return "/docs";
    }
  };

  const readMoreButton = (sectionId: string) => (
    <KeyFeaturesLink to={getUrlForSection(sectionId)}>
      <FormattedMessage id={gt("readMoreLink")} />
    </KeyFeaturesLink>
  );

  const createSection = (sectionId: string) => (
    <KeyFeaturesSection df={4} lg={4} md={12} key={sectionId}>
      <FormattedMessage id={gt(`${sectionId}.id`)}>
        {id => <SvgWrap>{getIllustrationComponent(id as string)}</SvgWrap>}
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
          {sections.map(section => createSection(section))}
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

export default KeyFeatures;
