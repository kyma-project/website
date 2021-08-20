import React, { useRef } from "react";

import { PageContext } from "@typings/common";
import { LandingPageContext } from "@typings/landingPage";

import { Headline } from "./Headline";
import { WhatIs } from "./WhatIs";
import { ExtensionsAndTools } from "./ExtensionsAndTools";
import { Adopters } from "./Adopters";
import { Newsroom } from "./Newsroom";
import { Manifesto } from "./Manifesto";
import { Features } from "./Features";
import { UsedBy } from "./UsedBy";
import { Nutshell } from "./Nutshell";
import { Personas } from "./Personas";
import { CheckItOut } from "./CheckItOut";

const LandingPageView: React.FunctionComponent<PageContext<
  LandingPageContext
>> = ({ pageContext: { adopters, latestBlogPosts } }) => {
  const scrollRef = useRef<HTMLElement>(null);
  return (
    <>
      <Manifesto scrollRef={scrollRef} />
      <Features scrollRef={scrollRef} />
      <Nutshell />
      <CheckItOut />
      <UsedBy adopters={adopters} />

      {/* <Headline /> */}
      {/* <WhatIs /> */}
      {/* <ExtensionsAndTools /> */}
      {/* <Newsroom latestBlogPosts={latestBlogPosts} /> */}
      {/* <Adopters adopters={adopters} /> */}
    </>
  );
};

export default LandingPageView;
