import React, { useState, useEffect } from "react";
import {
  DC,
  Sources,
  Plugins,
  RenderEngines,
  Renderers,
} from "@kyma-project/documentation-component";
import { plugins as markdownPlugins } from "@kyma-project/dc-markdown-render-engine";

import { DocsPageContext } from "@components/docs/types";

import { markdownRE } from "./render-engines";
import { MarkdownSingleRenderer } from "./renderers";
import { DocsLayout } from "./layouts";
import { serializer } from "./serializer";
import { replaceImagePathsMutationPlugin } from "./render-engines/markdown/plugins";
import { headingPrefix, customNodes } from "./render-engines/markdown/helpers";

const PLUGINS: Plugins = [
  markdownPlugins.frontmatterMutationPlugin,
  markdownPlugins.replaceAllLessThanCharsMutationPlugin,
  {
    plugin: markdownPlugins.headersExtractorPlugin,
    options: {
      headerPrefix: headingPrefix,
      customNodes,
    },
  },
  markdownPlugins.tabsMutationPlugin,
  replaceImagePathsMutationPlugin,
];

const RENDER_ENGINES: RenderEngines = [markdownRE];

const RENDERERS: Renderers = {
  single: [MarkdownSingleRenderer],
};

function renderContent(type: LayoutType, props?: any): React.ReactNode {
  switch (type) {
    case LayoutType.DOCS: {
      return <DocsLayout renderers={RENDERERS} {...props} />;
    }
    // case LayoutType.COMMUNITY: {
    //   return <CatalogUILayout {...props} renderers={RENDERERS} />;
    // }
    // case LayoutType.INSTANCES_UI: {
    //   return <InstancesUILayout renderers={RENDERERS} />;
    // }
    default:
      return null;
  }
}

export enum LayoutType {
  DOCS = "docs",
  COMMUNITY = "community",
}

export interface GenericComponentProps {
  pageContext: DocsPageContext;
  layout?: LayoutType;
}

export const GenericComponent: React.FunctionComponent<
  GenericComponentProps
> = ({ pageContext, layout = LayoutType.DOCS }) => {
  const sources = serializer
    .setDocsContent(pageContext.content)
    .serialize(pageContext.assetsPath)
    .getSources();

  if (!sources || !sources.length) {
    return null;
  }

  return (
    <DC.Provider
      sources={sources}
      plugins={PLUGINS}
      renderEngines={RENDER_ENGINES}
    >
      {renderContent(layout, pageContext)}
    </DC.Provider>
  );
};
