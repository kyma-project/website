import React from "react";
import {
  RenderEngineWithOptions,
  Sources,
  SourceWithOptions,
} from "@kyma-project/documentation-component";
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
  serializedSources: Sources,
  specifications?: Specification[],
): RenderEngineWithOptions<MarkdownRenderEngineOptions> => {
  const imagesWithAspectRatio = (serializedSources as SourceWithOptions[])
    // @ts-ignore
    .flatMap(source => source.source.data?.imagesWithAspectRatio);

  return {
    renderEngine: markdownRenderEngine,
    options: {
      customRenderers: {
        image: (props: any) => (
          <Image {...props} imagesWithAspectRatio={imagesWithAspectRatio} />
        ),
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
  };
};
