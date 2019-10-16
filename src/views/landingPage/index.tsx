import React from "react";

import { PageContext } from "@typings/common";
import { LandingPageContext } from "@typings/landingPage";

import { Headline } from "./Headline";
import { WhatIs } from "./WhatIs";
import { MakeSpecial } from "./MakeSpecial";
import { Adopters } from "./Adopters";
import { SocialMedia } from "./SocialMedia";

const LandingPageView: React.FunctionComponent<
  PageContext<LandingPageContext>
> = ({ pageContext: { adopters, latestBlogPosts } }) => (
  <>
    <Headline />
    <WhatIs />
    <MakeSpecial />
    <Adopters adopters={adopters} />
    <SocialMedia latestBlogPosts={latestBlogPosts} />
  </>
);

export default LandingPageView;
