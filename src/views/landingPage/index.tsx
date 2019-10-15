import React from "react";

import { PageContext } from "@typings/common";
import { LandingPageContext } from "@typings/landingPage";

import { Headline } from "./Headline";
import { WhatIs } from "./WhatIs";
import { MakeSpecial } from "./MakeSpecial";
import { KeyFeatures } from "./KeyFeatures";
import { Community } from "./Community";
import { EarlyAdopters } from "./EarlyAdopters";
import { Adopters } from "./Adopters";

import { CommunityAndEarlyAdoptersWrapper } from "./styled";

const LandingPageView: React.FunctionComponent<
  PageContext<LandingPageContext>
> = ({ pageContext: { earlyAdopters, adopters } }) => (
  <>
    <Headline />
    <WhatIs />
    <MakeSpecial />
    <KeyFeatures />
    {/* <CommunityAndEarlyAdoptersWrapper>
      <Community />
      <EarlyAdopters earlyAdopters={earlyAdopters} />
    </CommunityAndEarlyAdoptersWrapper> */}
    <Adopters adopters={adopters} />
  </>
);

export default LandingPageView;
