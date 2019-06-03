import React from "react";
import { StaticQuery, graphql } from "gatsby";

import Headline from "@components/landingPage/Headline";
import WhatIs from "@components/landingPage/WhatIs";
import MakeSpecial from "@components/landingPage/MakeSpecial";
import KeyFeatures from "@components/landingPage/KeyFeatures";
import Community from "@components/landingPage/Community";
import EarlyAdopters from "@components/landingPage/EarlyAdopters/EarlyAdopters";

import { CommunityAndEarlyAdoptersWrapper } from "./styled";

const LandingPage: React.FunctionComponent = () => (
  <StaticQuery
    query={query}
    // tslint:disable-next-line jsx-no-lambda
    render={data => {
      const earlyAdopters = data.allEarlyAdopters.edges[0].node.adopters;

      return (
        <>
          <Headline />
          <WhatIs />
          <MakeSpecial />
          <KeyFeatures />
          <CommunityAndEarlyAdoptersWrapper>
            <Community />
            <EarlyAdopters earlyAdopters={earlyAdopters} />
          </CommunityAndEarlyAdoptersWrapper>
        </>
      );
    }}
  />
);

const query = graphql`
  query EarlyAdoptersQuery {
    allEarlyAdopters {
      edges {
        node {
          adopters {
            name
            link
          }
        }
      }
    }
  }
`;

export default LandingPage;
