import { MutationPluginArgs } from "@kyma-project/documentation-component";

const ASSETS_REGEXP = /(?=]\()]\(\s*(\.\/)?assets/g;
const SRC_ATTR_REGEXP = /<img(.*?)src=("|')(.*?)("|')(.*?)>/gm;

export function replaceImagePaths({ source }: MutationPluginArgs): string {
  if (!source.data || !source.data.assetsPath) {
    return source.rawContent as string;
  }
  const docsUrl = source.data.assetsPath.substring(
    0,
    source.data.assetsPath.lastIndexOf("/"),
  );

  let content = (source.content || source.rawContent) as string;

  // for md img syntax
  if (content.search(ASSETS_REGEXP) !== -1) {
    content = content.replace(ASSETS_REGEXP, `](${docsUrl}`);
  }

  // for html img tag
  return content.replace(SRC_ATTR_REGEXP, occurrence => {
    SRC_ATTR_REGEXP.lastIndex = 0;
    const src = SRC_ATTR_REGEXP.exec(occurrence);

    if (!src || !src[3]) return occurrence;
    const s = src[3];

    occurrence = occurrence.replace(s, newSrc => {
      const path = newSrc.split("/").reverse()[0];
      return `${docsUrl}/${path}`;
    });

    return occurrence;
  });
}
