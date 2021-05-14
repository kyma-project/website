import { DocsPageContext } from "@typings/docs";

function getPageTitle(pageContext: DocsPageContext): string {
  console.log(pageContext.content);
  //undefined
  // return `dadsdasd -Docs`
  return `${pageContext.content.displayName} - Docs`;
}

export function extractDocsMetadata(
  pageContext: any,
): {
  pageTitle: string;
} {
  return {
    pageTitle: getPageTitle(pageContext),
  };
}
