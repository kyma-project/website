import { RenderEngineWithOptions } from "@kyma-project/documentation-component";
import {
  markdownRenderEngine,
  MarkdownRenderEngineOptions,
  plugins,
} from "@kyma-project/dc-markdown-render-engine";

import { highlightTheme } from "./highlightTheme";
import { headingPrefix } from "./helpers";

export const markdownRE: RenderEngineWithOptions<
  MarkdownRenderEngineOptions
> = {
  renderEngine: markdownRenderEngine,
  options: {
    parsers: [plugins.tabsParserPlugin],
    headingPrefix,
    highlightTheme,
  },
};
