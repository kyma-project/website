import React from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";

import { TwitterFrameWrapper } from "./styled";

export const TwitterFrame: React.FunctionComponent = () => {
  const options = {
    height: 600,
  };

  return (
    <TwitterFrameWrapper>
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="kymaproject"
        options={options}
      />
    </TwitterFrameWrapper>
  );
};
