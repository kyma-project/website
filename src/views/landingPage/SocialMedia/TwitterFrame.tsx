import React from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";

export const TwitterFrame: React.FunctionComponent = () => {
  const options = {
    height: 600,
  };

  return (
    <TwitterTimelineEmbed
      sourceType="profile"
      screenName="kymaproject"
      options={options}
    />
  );
};
