import { Source } from "@kyma-project/documentation-component";

function firstElementOfHeaders(source: Source): string {
  if (source.data && source.data.frontmatter && source.data.frontmatter.title) {
    return source.data.frontmatter.title;
  }
  return "";
}

export const customNodes = [firstElementOfHeaders];
