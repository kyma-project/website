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
import { PostPageContext } from "@typings/blog";

import { markdownRE, openApiRE } from "./render-engines";
import { MarkdownRenderer } from "./renderers";
import {
  DocsLayout,
  DocsSpecificationLayout,
  CommunityLayout,
  BlogPostLayout,
} from "./layouts";
import { serializer } from "./serializer";
import { replaceImagePathsMutationPlugin } from "./render-engines/markdown/plugins";
import {
  headingPrefix,
  customFirstNode,
} from "./render-engines/markdown/helpers";
import { GenericDocsProvider } from "./services";
import { types, setHideTitleHeader } from "./constants";

function prepareSources(
  pageContext?: DocsPageContext | PostPageContext,
  sources?: Sources,
): Sources | undefined {
  serializer.clear();

  let serializedSources: Sources = [];
  if (pageContext && pageContext.assetsPath) {
    if (typeof pageContext.content === "string") {
      serializedSources = serializer
        .serializeBlogPost(pageContext.content, pageContext.assetsPath)
        .getSources();
    } else {
      serializedSources = serializer
        .serializeDocs(pageContext.content, pageContext.assetsPath)
        .getSources();
    }
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
  let source = sources[0] as SourceWithOptions;
  if (Array.isArray(source)) {
    source = source[0] as SourceWithOptions;
  }
  const frontmatter = source.source.data?.frontmatter || {};

  return [frontmatter.title || "", frontmatter.type || ""];
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
    case LayoutType.BLOG_POST: {
      return <BlogPostLayout renderers={renderers} {...props} />;
    }
    default:
      return null;
  }
}

function getPlugins(layout: LayoutType): Plugins {
  let headersExtractorOptions = {};
  if (DOCS_LAYOUTS.includes(layout)) {
    headersExtractorOptions = {
      headerPrefix: headingPrefix,
      customFirstNode,
    };
  } else {
    headersExtractorOptions = {
      headerPrefix: headingPrefix,
    };
  }

  return [
    markdownPlugins.frontmatterMutationPlugin,
    markdownPlugins.replaceAllLessThanCharsMutationPlugin,
    {
      plugin: markdownPlugins.headersExtractorPlugin,
      options: headersExtractorOptions,
    },
    markdownPlugins.tabsMutationPlugin,
    replaceImagePathsMutationPlugin(layout),
  ];
}

function getRenderEngines(
  layout: LayoutType,
  pageContext?: PageContext,
): RenderEngines {
  if (DOCS_LAYOUTS.includes(layout)) {
    return [
      markdownRE(layout, (pageContext as DocsPageContext)?.specifications),
      openApiRE,
    ];
  }

  return [markdownRE(layout)];
}

export enum LayoutType {
  DOCS = "docs",
  DOCS_SPECIFICATION = "docs-specification",
  COMMUNITY = "community",
  BLOG_POST = "blog-post",
}

export const DOCS_LAYOUTS = [
  LayoutType.DOCS,
  LayoutType.DOCS_SPECIFICATION,
  LayoutType.COMMUNITY,
];

type PageContext = (DocsPageContext & PreviewPageContext) | PostPageContext;
export interface GenericComponentProps {
  pageContext?: PageContext;
  sources?: Sources;
  layout?: LayoutType;
  additionalProps?: any;
}

export const GenericComponent: React.FunctionComponent<GenericComponentProps> = ({
  pageContext,
  sources,
  layout = LayoutType.DOCS,
  additionalProps,
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

  let title = "";
  let type = "";
  if (DOCS_LAYOUTS.includes(layout)) {
    [title, type] = extractDataFromFirstSources(serializedSources);
  }

  const plugins = getPlugins(layout);
  const renderEngines = getRenderEngines(layout, pageContext);
  const renderers: Renderers = {
    single: [MarkdownRenderer(serializedSources.length, { title, type })],
  };

  return (
    <GenericDocsProvider assetsPath={pageContext && pageContext.assetsPath}>
      <DC.Provider
        sources={serializedSources}
        plugins={plugins}
        renderEngines={renderEngines}
      >
        {renderContent(layout, renderers, {
          ...pageContext,
          sourcesLength: serializedSources.length,
          ...additionalProps,
          inPreview:
            pageContext && (pageContext as PreviewPageContext).inPreview,
        })}
      </DC.Provider>
    </GenericDocsProvider>
  );
};
