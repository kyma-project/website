import React, { useRef } from "react";

import { PageContext } from "@typings/common";
import { LandingPageContext } from "@typings/landingPage";
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
      <Nutshell />
      <Personas />
      <CheckItOut />
      <UsedBy adopters={adopters} />
    </>
  );
};

export default LandingPageView;
