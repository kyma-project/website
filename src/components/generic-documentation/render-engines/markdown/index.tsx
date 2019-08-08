import React from "react";
import { RenderEngineWithOptions } from "@kyma-project/documentation-component";
import {
  markdownRenderEngine,
  MarkdownRenderEngineOptions,
  plugins,
} from "@kyma-project/dc-markdown-render-engine";

import { Image, Link, Heading, CopyButton } from "./custom-renderers";
import { tabsParserPlugin } from "./plugins";
import { highlightTheme } from "./highlightTheme";
import { headingPrefix } from "./helpers";
import { LayoutType } from "../../index";

export const markdownRE = (
  layout: LayoutType,
): RenderEngineWithOptions<MarkdownRenderEngineOptions> => ({
  renderEngine: markdownRenderEngine,
  options: {
    customRenderers: {
      image: Image,
      link: (props: any) => <Link {...props} layout={layout} />,
      heading: Heading,
    },
    parsers: [tabsParserPlugin],
    headingPrefix,
    highlightTheme,
    copyButton: CopyButton,
  },
});
