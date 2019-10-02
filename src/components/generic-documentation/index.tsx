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
  pageContext?: DocsPageContext;
  sources?: Sources;
  layout?: LayoutType;
  docsVersionSwitcher?: React.ReactNode;
}

export const GenericComponent: React.FunctionComponent<
  GenericComponentProps
> = ({
  pageContext,
  sources,
  layout = LayoutType.DOCS,
  docsVersionSwitcher,
}) => {
  types.clear();
  setHideTitleHeader(false);

  let serializedSources: Sources = [];
  if (pageContext && pageContext.content && pageContext.assetsPath) {
    serializedSources = serializer
      .setDocsContent(pageContext.content)
      .serialize(pageContext.assetsPath)
      .getSources();
  }
  if (sources) {
    serializedSources = sources;
  }

  if (!serializedSources || !serializedSources.length) {
    return null;
  }

  let tempSource = serializedSources[0] as SourceWithOptions;
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

  const RENDER_ENGINES: RenderEngines = [
    markdownRE(layout, pageContext && pageContext.specifications),
    openApiRE,
  ];
  const renderers: Renderers = {
    single: [MarkdownRenderer(serializedSources.length, { title, type })],
  };

  return (
    <GenericDocsProvider assetsPath={pageContext && pageContext.assetsPath}>
      <DC.Provider
        sources={serializedSources}
        plugins={PLUGINS}
        renderEngines={RENDER_ENGINES}
      >
        {renderContent(layout, renderers, {
          ...pageContext,
          sourcesLength: serializedSources.length,
          docsVersionSwitcher,
        })}
      </DC.Provider>
    </GenericDocsProvider>
  );
};
