import { Source } from "@kyma-project/documentation-component";

export function headingPrefix(source: Source): string {
  if (source.data && source.data.frontmatter) {
    if (source.data.frontmatter.type) {
      if (source.data.frontmatter.title) {
        return `${source.data.frontmatter.type}-${source.data.frontmatter.title}`;
      }
      return `${source.data.frontmatter.type}`;
    }
    if (source.data.frontmatter.title) {
      return `${source.data.frontmatter.title}`;
    }
  }
  return "";
}
