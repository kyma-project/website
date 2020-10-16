import React from "react";

import Grid from "@styled/Grid";

import { Header as FeaturesHeader } from "./Header";
import { FeatureCard } from "./FeatureCard";

import { FeaturesI18nTarget } from "@typings/landingPage";

const features = Object.values<FeaturesI18nTarget>(FeaturesI18nTarget);

interface FeatureProps {
  scrollRef: React.RefObject<HTMLElement>;
}

// also used in Manifesto component
export const featuresID = "key-features";

export const Features: React.FunctionComponent<FeatureProps> = ({
  scrollRef: innerRef,
}) => (
  <Grid.Container as="section" id={featuresID} ref={innerRef}>
    <Grid.Row>
      <Grid.Unit df={12}>
        <FeaturesHeader />
      </Grid.Unit>
      {features.map(feature => (
        <Grid.Unit df={4} sm={12} key={feature}>
          <FeatureCard feature={feature} />
        </Grid.Unit>
      ))}
    </Grid.Row>
  </Grid.Container>
);
