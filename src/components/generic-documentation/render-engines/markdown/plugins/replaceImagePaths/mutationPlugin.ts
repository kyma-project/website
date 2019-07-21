import { MutationPluginArgs } from "@kyma-project/documentation-component";

const ASSETS_REGEXP = /(?=]\()]\(\s*(\.\/)?assets/g;

export function replaceImagePaths({
  source,
  options,
}: MutationPluginArgs): string {
  if (!source.data || !source.data.assetsPath) {
    return source.rawContent as string;
  }
  const docsUrl = source.data.assetsPath.substring(
    0,
    source.data.assetsPath.lastIndexOf("/"),
  );

  const content = (source.content || source.rawContent) as string;
  if (content.search(ASSETS_REGEXP) !== -1) {
    return content.replace(ASSETS_REGEXP, `](${docsUrl}`);
  }
  return content;
}
