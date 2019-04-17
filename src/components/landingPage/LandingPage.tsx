import React from "react";

import Headline from "@components/landingPage/Headline";
import WhatIs from "@components/landingPage/WhatIs";
import MakeSpecial from "@components/landingPage/MakeSpecial";
import KeyFeatures from "@components/landingPage/KeyFeatures";
import Community from "@components/landingPage/Community";
import EarlyAdopters from "@components/landingPage/EarlyAdopters/EarlyAdopters";

import { CommunityAndEarlyAdoptersWrapper } from "./styled";

const LandingPage: React.FunctionComponent = () => (
  <>
    <Headline />
    <WhatIs />
    <MakeSpecial />
    <KeyFeatures />
    <CommunityAndEarlyAdoptersWrapper>
      <Community />
      <EarlyAdopters />
    </CommunityAndEarlyAdoptersWrapper>
  </>
);

export default LandingPage;
