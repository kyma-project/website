import { DocsPageContext } from "@typings/docs";

function getPageTitle(pageContext: DocsPageContext): string {
  return `${pageContext.content.displayName} - Docs`;
}

export function extractDocsMetadata(
  pageContext: DocsPageContext,
): {
  pageTitle: string;
} {
  return {
    pageTitle: getPageTitle(pageContext),
  };
}
