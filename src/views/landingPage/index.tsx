import React from "react";

import { PageContext } from "@typings/common";
import { LandingPageContext } from "@typings/landingPage";

import { Headline } from "./Headline";
import { WhatIs } from "./WhatIs";
import { MakeSpecial } from "./MakeSpecial";

import { EarlyAdopters } from "./EarlyAdopters";

import { CommunityAndEarlyAdoptersWrapper } from "./styled";

const LandingPageView: React.FunctionComponent<
  PageContext<LandingPageContext>
> = ({ pageContext: { earlyAdopters } }) => (
  <>
    <Headline />
    <WhatIs />
    <MakeSpecial />
    <CommunityAndEarlyAdoptersWrapper>
      <EarlyAdopters earlyAdopters={earlyAdopters} />
    </CommunityAndEarlyAdoptersWrapper>
  </>
);

export default LandingPageView;
