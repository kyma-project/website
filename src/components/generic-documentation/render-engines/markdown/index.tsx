import React from "react";
import { RenderEngineWithOptions } from "@kyma-project/documentation-component";
import {
  markdownRenderEngine,
  MarkdownRenderEngineOptions,
  plugins,
} from "@kyma-project/dc-markdown-render-engine";

import { Image, Link, Heading, CopyButton } from "./custom-renderers";
import { highlightTheme } from "./highlightTheme";
import { headingPrefix } from "./helpers";

export const markdownRE: RenderEngineWithOptions<
  MarkdownRenderEngineOptions
> = {
  renderEngine: markdownRenderEngine,
  options: {
    customRenderers: {
      image: Image,
      link: Link,
      heading: Heading,
    },
    parsers: [plugins.tabsParserPlugin],
    headingPrefix,
    highlightTheme,
    copyButton: CopyButton,
  },
};
