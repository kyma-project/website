import React, { FC } from "react";
import { IFrameWrapper } from "./styled";

export const GithubButtons: FC = () => (
  <IFrameWrapper>
    <iframe
      src="https://ghbtns.com/github-btn.html?user=kyma-project&repo=kyma&type=star&count=true"
      title="Kyma's Github stars"
      className="lazyload"
      frameBorder="0"
      scrolling="0"
      width="95px"
      height="20px"
    />
    <iframe
      src="https://ghbtns.com/github-btn.html?user=kyma-project&repo=kyma&type=fork&count=true"
      title="Kyma's Github forks"
      className="lazyload"
      frameBorder="0"
      scrolling="0"
      width="95px"
      height="20px"
    />
  </IFrameWrapper>
);
