import { Source } from "@kyma-project/documentation-component";
import { toKebabCase } from "@common/utils";

export function headingPrefix(source: Source): string {
  if (source.data && source.data.frontmatter) {
    const title = source.data.frontmatter.title;
    return toKebabCase(title);
  }
  return "";
}
