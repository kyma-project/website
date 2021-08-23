import { PageContext } from "@typings/common";
import { LandingPageContext } from "@typings/landingPage";
import React, { useRef } from "react";
import { CheckItOut } from "./CheckItOut";
import { Features } from "./Features";
import { Manifesto } from "./Manifesto";
import { Nutshell } from "./Nutshell";
import { Personas } from "./Personas";
import { UsedBy } from "./UsedBy";

const LandingPageView: React.FunctionComponent<PageContext<
  LandingPageContext
>> = ({ pageContext: { adopters, latestBlogPosts } }) => {
  const scrollRef = useRef<HTMLElement>(null);
  return (
    <>
      <Manifesto scrollRef={scrollRef} />
      <Features scrollRef={scrollRef} />
      <Nutshell />
      <Personas />
      <CheckItOut />
      <UsedBy adopters={adopters} />
    </>
  );
};

export default LandingPageView;
