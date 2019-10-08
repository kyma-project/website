import React from "react";

import { PageContext } from "@typings/common";
import { LandingPageContext } from "@typings/landingPage";

import { Headline } from "./Headline";
import { WhatIs } from "./WhatIs";
import { MakeSpecial } from "./MakeSpecial";
import { KeyFeatures } from "./KeyFeatures";
import { Community } from "./Community";
import { SocialMedia } from "./SocialMedia";
import { Adopters } from "./Adopters";

const LandingPageView: React.FunctionComponent<
  PageContext<LandingPageContext>
> = ({ pageContext: { adopters } }) => (
  <>
    <Headline />
    <WhatIs />
    <KeyFeatures />
    <MakeSpecial />
    <SocialMedia />
    <Adopters adopters={adopters} />
  </>
);

export default LandingPageView;
