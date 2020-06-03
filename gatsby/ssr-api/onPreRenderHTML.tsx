import React from "react";
import { PreRenderHTMLArgs } from "gatsby";

export const onPreRenderHTML = (args: PreRenderHTMLArgs): any => {
  unlineGlobalStyles(args);
};

function unlineGlobalStyles({
  getHeadComponents,
  replaceHeadComponents,
}: PreRenderHTMLArgs) {
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  // workaround to revert forcefully injected inline styles
  // TODO: fix type after bumping GatsbyJS
  const headComponents = (getHeadComponents as any)();
  const transformedHeadComponents = headComponents.map((node: any) => {
    // inline global style produces by GatsbyJS
    if (node.type === "style" && node.props["data-href"]) {
      let loaded = false;
      return (
        <link
          href={node.props["data-href"]}
          as="style"
          onLoad={_ => (loaded = true)}
          rel={loaded ? "stylesheet" : "preload"}
        />
      );
      // remove global style produces by TypographyJS - we do it ourselves
    }
    if (node.props.id !== "typography.js") {
      return node;
    }
  });
  replaceHeadComponents(transformedHeadComponents);
}
