import React from "react";
import YouTube from "react-youtube";

import { YouTubeFrameWrapper, Header } from "./styled";

export const YouTubeFrame: React.FunctionComponent = () => {
  const options = {};

  return (
    <>
      <Header>Check our last video</Header>
      <YouTubeFrameWrapper>
        <YouTube videoId="2g811Eo7K8U" opts={options} />
      </YouTubeFrameWrapper>
    </>
  );
};
