import React from "react";
import { FeaturesI18nTarget } from "@typings/landingPage";
import { IntlInterface, injectIntl } from "@common/i18n";
import H from "@components/shared/H";
import { ImageWrapper, FeatureWrapper } from "./styled";
import extensibilitySVG from "@views/landingPage/assets/landing-page/features/extensibility.svg";
import runtimeSVG from "@views/landingPage/assets/landing-page/features/runtime.svg";
import supportSVG from "@views/landingPage/assets/landing-page/features/support.svg";

const getImageForFeature = (feature: FeaturesI18nTarget) => {
  switch (feature) {
    case FeaturesI18nTarget.EXTENSIBILITY:
      return extensibilitySVG;
    case FeaturesI18nTarget.RUNTIME:
      return runtimeSVG;
    case FeaturesI18nTarget.SUPPORT:
      return supportSVG;
    default:
      return null;
  }
};

interface Props {
  feature: FeaturesI18nTarget;
}

const FeatureCardRaw: React.FunctionComponent<Props & IntlInterface> = ({
  feature,
  formatMessage,
  formatArray,
}) => (
  <FeatureWrapper>
    <ImageWrapper>
      <img src={getImageForFeature(feature)} alt={feature} />
    </ImageWrapper>
    <H as="h3">{formatMessage({ id: `${feature}.title` })}</H>
    {formatArray({ id: `${feature}.paragraphs` }).map((desc, id) => (
      <p key={id}>{desc}</p>
    ))}
  </FeatureWrapper>
);

export const FeatureCard = injectIntl("landingPage.keyFeatures.features")(
  FeatureCardRaw,
);
