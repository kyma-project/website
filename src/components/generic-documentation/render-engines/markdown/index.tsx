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

import { ImageSpec } from "../../../../../gatsby/types";
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
  let imagesSpec: ImageSpec[] = [];
  if (serializedSources.length) {
    imagesSpec = (serializedSources as SourceWithOptions[])[0].source.data
      ?.imagesSpec;
  }

  return {
    renderEngine: markdownRenderEngine,
    options: {
      customRenderers: {
        image: (props: any) => <Image {...props} imagesSpec={imagesSpec} />,
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
