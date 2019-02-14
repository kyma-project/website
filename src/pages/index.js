import React from "react";
import { Helmet } from "react-helmet";

import LandingLayout from "../components/layout/LandingLayout";

import Headline from "../components/landing/Headline";
import WhatIs from "../components/landing/WhatIs";
import MakesSpecial from "../components/landing/MakesSpecial";
import Features from "../components/landing/Features";
import Community from "../components/landing/Community";
import Adopters from "../components/landing/Adopters";

const IndexPage = () => (
  <LandingLayout>
    <Helmet />
    <div className="container">
      <Headline />
      <WhatIs />
    </div>
    <MakesSpecial />
    <div className="container">
      <Features />
    </div>

    <section className="bg-b">
      <Community />
      <Adopters />
    </section>
  </LandingLayout>
);

export default IndexPage;
