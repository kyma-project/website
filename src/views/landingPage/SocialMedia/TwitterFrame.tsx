import React from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";

import { TwitterFrameWrapper, Header } from "./styled";

export const TwitterFrame: React.FunctionComponent = () => {
  const options = {
    height: 600,
  };

  return (
    <>
      <Header>Check our last tweets</Header>
      <TwitterFrameWrapper>
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="kymaproject"
          options={options}
        />
      </TwitterFrameWrapper>
    </>
  );
};
