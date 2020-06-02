import React from "react";

import { injectIntl, IntlInterface } from "@common/i18n";

import { IFrameWrapper } from "./styled";

const GithubButtons: React.FunctionComponent<IntlInterface> = ({
  formatMessage,
}) => (
  <IFrameWrapper>
    <iframe
      src="https://ghbtns.com/github-btn.html?user=kyma-project&repo=kyma&type=star&count=true"
      title={formatMessage({ id: "githubButtons.stars" })}
      frameBorder="0"
      scrolling="0"
      width="95px"
      height="20px"
    />
    <iframe
      src="https://ghbtns.com/github-btn.html?user=kyma-project&repo=kyma&type=fork&count=true"
      title={formatMessage({ id: "githubButtons.forks" })}
      frameBorder="0"
      scrolling="0"
      width="95px"
      height="20px"
    />
  </IFrameWrapper>
);

export default injectIntl("layout")(GithubButtons);
