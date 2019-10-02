import React from "react";
import { RenderEngineWithOptions } from "@kyma-project/documentation-component";
import {
  markdownRenderEngine,
  MarkdownRenderEngineOptions,
} from "@kyma-project/dc-markdown-render-engine";

import { Specification } from "@typings/docs";

import { Image, Link, Heading, CopyButton } from "./custom-renderers";
import { tabsParserPlugin } from "./plugins";
import { highlightTheme } from "./highlightTheme";
import { headingPrefix } from "./helpers";
import { LayoutType } from "../../index";

export const markdownRE = (
  layout: LayoutType,
  specifications?: Specification[],
): RenderEngineWithOptions<MarkdownRenderEngineOptions> => ({
  renderEngine: markdownRenderEngine,
  options: {
    customRenderers: {
      image: Image,
      link: (props: any) => (
        <Link {...props} specifications={specifications} layout={layout} />
      ),
      heading: Heading,
    },
    parsers: [tabsParserPlugin],
    headingPrefix,
    highlightTheme,
    copyButton: CopyButton,
  },
});
