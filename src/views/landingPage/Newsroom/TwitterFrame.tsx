import React from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";

import { TwitterFrameWrapper } from "./styled";

interface Props {
  twitterUsername: string;
}

export const TwitterFrame: React.FunctionComponent<Props> = ({
  twitterUsername,
}) => {
  const options = {
    tweetLimit: 2,
  };

  return (
    <TwitterFrameWrapper>
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName={twitterUsername}
        options={options}
        noHeader={true}
        noFooter={true}
        noBorders={true}
        autoHeight={true}
        transparent={true}
      />
    </TwitterFrameWrapper>
  );
};
