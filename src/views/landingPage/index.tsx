import React from "react";

import { PageContext } from "@typings/common";
import { LandingPageContext } from "@typings/landingPage";

import { Headline } from "./Headline";
import { WhatIs } from "./WhatIs";
import { ExtensionsAndTools } from "./ExtensionsAndTools";
import { Adopters } from "./Adopters";
import { Newsroom } from "./Newsroom";

const LandingPageView: React.FunctionComponent<PageContext<
  LandingPageContext
>> = ({ pageContext: { adopters, latestBlogPosts } }) => (
  <>
    <Headline />
    <WhatIs />
    <ExtensionsAndTools />
    <Newsroom latestBlogPosts={latestBlogPosts} />
    <Adopters adopters={adopters} />
  </>
);

export default LandingPageView;
