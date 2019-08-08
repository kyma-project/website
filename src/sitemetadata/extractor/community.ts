import { DocsPageContext } from "@components/generic-documentation/types";

function getPageTitle(uri: string, pageContext: DocsPageContext): string {
  return `${pageContext.content.displayName} - Community`;
}

export function extractCommunityMetadata(
  uri: string,
  pageContext: any,
): {
  pageTitle: string;
} {
  return {
    pageTitle: getPageTitle(uri, pageContext),
  };
}
