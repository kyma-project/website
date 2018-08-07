import React from "react";
import { Helmet } from "react-helmet";
import Headline from "../components/landing/Headline";
import Features from "../components/landing/Features";
import WhatIs from "../components/landing/WhatIs";
import LandingLayout from "../components/layout/LandingLayout";
import Mission from "../components/landing/Mission";

const IndexPage = () => (
  <LandingLayout>
    <Helmet />
    <div className="container">
      <Headline />
      <Mission />
    </div>
    <WhatIs />
    <div className="container">
      <Features />
    </div>
  </LandingLayout>
);

export default IndexPage;
