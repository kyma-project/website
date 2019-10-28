import React from "react";
import YouTube from "react-youtube";

import { YouTubeFrameWrapper, YouTubeFrameItem } from "./styled";

interface Props {
  videos: string[];
}

export const YouTubeFrame: React.FunctionComponent<Props> = ({
  videos = [],
}) => {
  if (!videos.length) {
    return null;
  }

  const list = videos.map(video => (
    <YouTubeFrameItem key={video}>
      <YouTube videoId={video} />
    </YouTubeFrameItem>
  ));

  return <YouTubeFrameWrapper>{list}</YouTubeFrameWrapper>;
};
