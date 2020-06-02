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
    <link
      rel="dns-prefetch"
      key="dns-prefetch-google-analytics"
      href="https://www.google-analytics.com"
    />,
  ]);

  const attachCode = `
    if (ga) {
      ga('require', 'linker');
      ga('linker:autoLink', ['kyma-project.io']);
    }
  `;

  // use with the `allowLinker` option of gatsby-plugin-google-analytics
  setPostBodyComponents([
    <script
      key="ga-linker"
      dangerouslySetInnerHTML={{
        __html: attachCode,
      }}
    />,
  ]);
};
