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
import { DocsLayout, CommunityLayout } from "./layouts";
import { serializer } from "./serializer";
import { replaceImagePathsMutationPlugin } from "./render-engines/markdown/plugins";
import {
  headingPrefix,
  customFirstNode,
} from "./render-engines/markdown/helpers";
import { GenericDocsProvider } from "./services";
import { types, setHideTitleHeader } from "./constants";

const PLUGINS: Plugins = [
  markdownPlugins.frontmatterMutationPlugin,
  markdownPlugins.replaceAllLessThanCharsMutationPlugin,
  {
    plugin: markdownPlugins.headersExtractorPlugin,
    options: {
      headerPrefix: headingPrefix,
      customFirstNode,
    },
  },
  markdownPlugins.tabsMutationPlugin,
  replaceImagePathsMutationPlugin,
];

const RENDERERS: Renderers = {
  single: [MarkdownSingleRenderer],
};

function renderContent(type: LayoutType, props?: any): React.ReactNode {
  switch (type) {
    case LayoutType.DOCS: {
      return <DocsLayout renderers={RENDERERS} {...props} />;
    }
    case LayoutType.COMMUNITY: {
      return <CommunityLayout renderers={RENDERERS} {...props} />;
    }
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
  types.clear();
  setHideTitleHeader(false);

  const sources = serializer
    .setDocsContent(pageContext.content)
    .serialize(pageContext.assetsPath)
    .getSources();

  if (!sources || !sources.length) {
    return null;
  }

  const RENDER_ENGINES: RenderEngines = [markdownRE(layout)];

  return (
    <GenericDocsProvider>
      <DC.Provider
        sources={sources}
        plugins={PLUGINS}
        renderEngines={RENDER_ENGINES}
      >
        {renderContent(layout, pageContext)}
      </DC.Provider>
    </GenericDocsProvider>
  );
};
