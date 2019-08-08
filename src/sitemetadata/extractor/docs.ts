import { DocsPageContext } from "@components/generic-documentation/types";

function getPageTitle(uri: string, pageContext: DocsPageContext): string {
  return `${pageContext.content.displayName} - Docs`;
}

export function extractDocsMetadata(
  uri: string,
  pageContext: any,
): {
  pageTitle: string;
} {
  return {
    pageTitle: getPageTitle(uri, pageContext),
  };
}
