import { Source } from "@kyma-project/documentation-component";

export function headingPrefix(source: Source): string {
  if (source.data && source.data.frontmatter) {
    const title = source.data.frontmatter.title;
    let type = source.data.frontmatter.type;

    type = type || title;
    return `${type}-${title}`;
  }
  return "";
}
