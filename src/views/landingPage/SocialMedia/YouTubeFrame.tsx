import React from "react";
import YouTube from "react-youtube";

import { YouTubeFrameWrapper } from "./styled";

export const YouTubeFrame: React.FunctionComponent = () => {
  const options = {};

  return (
    <YouTubeFrameWrapper>
      <YouTube videoId="2g811Eo7K8U" opts={options} />
    </YouTubeFrameWrapper>
  );
};
