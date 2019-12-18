import React from "react";
import {
  DC,
  SourceWithOptions,
  Plugins,
  RenderEngines,
  Renderers,
  Sources,
} from "@kyma-project/documentation-component";
import { plugins as markdownPlugins } from "@kyma-project/dc-markdown-render-engine";

import { PreviewPageContext } from "@typings/common";
import { DocsPageContext } from "@typings/docs";

import { markdownRE, openApiRE } from "./render-engines";
import { MarkdownRenderer } from "./renderers";
import {
  DocsLayout,
  DocsSpecificationLayout,
  CommunityLayout,
} from "./layouts";
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

function prepareSources(
  pageContext?: DocsPageContext,
  sources?: Sources,
): Sources | undefined {
  let serializedSources: Sources = [];
  if (pageContext && pageContext.content && pageContext.assetsPath) {
    serializedSources = serializer
      .setDocsContent(pageContext.content)
      .serialize(pageContext.assetsPath)
      .getSources();
  }
  if (!pageContext && sources && sources.length) {
    serializedSources = sources;
  }

  if (!serializedSources || !serializedSources.length) {
    return;
  }

  return serializedSources;
}

function extractDataFromFirstSources(sources: Sources): [string, string] {
  let temp = sources[0] as SourceWithOptions;
  if (Array.isArray(temp)) {
    temp = temp[0] as SourceWithOptions;
  }
  const firstSource = temp.source;

  const title =
    firstSource.data &&
    firstSource.data.frontmatter &&
    firstSource.data.frontmatter.title;
  const type =
    firstSource.data &&
    firstSource.data.frontmatter &&
    firstSource.data.frontmatter.type;

  return [title || "", type || ""];
}

function renderContent(
  type: LayoutType,
  renderers: Renderers,
  props?: any,
): React.ReactNode {
  switch (type) {
    case LayoutType.DOCS: {
      return <DocsLayout renderers={renderers} {...props} />;
    }
    case LayoutType.DOCS_SPECIFICATION: {
      return <DocsSpecificationLayout />;
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
  DOCS_SPECIFICATION = "docs-specification",
  COMMUNITY = "community",
}

export interface GenericComponentProps {
  pageContext?: DocsPageContext & PreviewPageContext;
  sources?: Sources;
  layout?: LayoutType;
  docsVersionSwitcher?: React.ReactNode;
}

export const GenericComponent: React.FunctionComponent<GenericComponentProps> = ({
  pageContext,
  sources,
  layout = LayoutType.DOCS,
  docsVersionSwitcher,
}) => {
  types.clear();
  setHideTitleHeader(false);

  const serializedSources: Sources | undefined = prepareSources(
    pageContext,
    sources,
  );
  if (!serializedSources) {
    return null;
  }
  const [title, type] = extractDataFromFirstSources(serializedSources);

  const RENDER_ENGINES: RenderEngines = [
    markdownRE(layout, pageContext && pageContext.specifications),
    openApiRE,
  ];
  const RENDERERS: Renderers = {
    single: [MarkdownRenderer(serializedSources.length, { title, type })],
  };

  return (
    <GenericDocsProvider assetsPath={pageContext && pageContext.assetsPath}>
      <DC.Provider
        sources={serializedSources}
        plugins={PLUGINS}
        renderEngines={RENDER_ENGINES}
      >
        {renderContent(layout, RENDERERS, {
          ...pageContext,
          sourcesLength: serializedSources.length,
          docsVersionSwitcher,
          inPreview: pageContext && pageContext.inPreview,
        })}
      </DC.Provider>
    </GenericDocsProvider>
  );
};
