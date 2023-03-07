import React from "react";
import { RenderBodyArgs } from "gatsby";

export const onRenderBody = ({
  setHeadComponents,
  setPostBodyComponents,
}: RenderBodyArgs): any => {
  setHeadComponents([
    <link
      rel="dns-prefetch"
      key="dns-prefetch-api-github"
      href="https://api.github.com"
    />,
  ]);
};
