import React, { useState, useEffect } from "react";
import {
  DC,
  SourceWithOptions,
  Plugins,
  RenderEngines,
  Renderers,
} from "@kyma-project/documentation-component";
import { plugins as markdownPlugins } from "@kyma-project/dc-markdown-render-engine";

import { DocsPageContext } from "@components/generic-documentation/types";

import { markdownRE } from "./render-engines";
import { MarkdownRenderer } from "./renderers";
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

function renderContent(
  type: LayoutType,
  renderers: Renderers,
  props?: any,
): React.ReactNode {
  switch (type) {
    case LayoutType.DOCS: {
      return <DocsLayout renderers={renderers} {...props} />;
    }
    case LayoutType.COMMUNITY: {
      return <CommunityLayout renderers={renderers} {...props} />;
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
  docsVersionSwitcher?: React.ReactNode;
}

export const GenericComponent: React.FunctionComponent<
  GenericComponentProps
> = ({ pageContext, layout = LayoutType.DOCS, docsVersionSwitcher }) => {
  types.clear();
  setHideTitleHeader(false);

  const sources = serializer
    .setDocsContent(pageContext.content)
    .serialize(pageContext.assetsPath)
    .getSources();

  if (!sources || !sources.length) {
    return null;
  }

  let tempSource = sources[0] as SourceWithOptions;
  if (Array.isArray(tempSource)) {
    tempSource = tempSource[0] as SourceWithOptions;
  }
  const firstSource = tempSource.source;

  const title =
    firstSource.data &&
    firstSource.data.frontmatter &&
    firstSource.data.frontmatter.title;
  const type: string =
    firstSource.data &&
    firstSource.data.frontmatter &&
    firstSource.data.frontmatter.type;

  const RENDER_ENGINES: RenderEngines = [markdownRE(layout)];
  const renderers: Renderers = {
    single: [MarkdownRenderer(sources.length, { title, type })],
  };

  return (
    <GenericDocsProvider assetsPath={pageContext.assetsPath}>
      <DC.Provider
        sources={sources}
        plugins={PLUGINS}
        renderEngines={RENDER_ENGINES}
      >
        {renderContent(layout, renderers, {
          ...pageContext,
          sourcesLength: sources.length,
          docsVersionSwitcher,
        })}
      </DC.Provider>
    </GenericDocsProvider>
  );
};
