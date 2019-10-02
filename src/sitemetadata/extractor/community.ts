import { DocsPageContext } from "@typings/docs";

function getPageTitle(pageContext: DocsPageContext): string {
  return `${pageContext.content.displayName} - Community`;
}

export function extractCommunityMetadata(
  pageContext: any,
): {
  pageTitle: string;
} {
  return {
    pageTitle: getPageTitle(pageContext),
  };
}
