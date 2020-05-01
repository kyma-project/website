import { MutationPluginArgs } from "@kyma-project/documentation-component";
import { LayoutType, DOCS_LAYOUTS } from "@components/generic-documentation";

const DOCS_ASSETS_REGEXP = /(?=]\()]\(\s*(\.\/)?assets/g;
const BLOG_POST_ASSETS_REGEXP = /(?=]\()]\(\s*(\.\/)?.\//g;
const SRC_ATTR_REGEXP = /<img(.*?)src=("|')(.*?)("|')(.*?)>/gm;

export function replaceImagePaths(layout: LayoutType) {
  return ({ source }: MutationPluginArgs): string => {
    if (!source.data || !source.data.assetsPath) {
      return source.rawContent as string;
    }
    const sourceUrl = source.data.assetsPath.substring(
      0,
      source.data.assetsPath.lastIndexOf("/"),
    );

    let content = (source.content || source.rawContent) as string;

    // for md img syntax
    if (
      DOCS_LAYOUTS.includes(layout) &&
      content.search(DOCS_ASSETS_REGEXP) !== -1
    ) {
      content = content.replace(DOCS_ASSETS_REGEXP, `](${sourceUrl}`);
    } else if (content.search(BLOG_POST_ASSETS_REGEXP) !== -1) {
      content = content.replace(BLOG_POST_ASSETS_REGEXP, `](${sourceUrl}/`);
    }

    // for html img tag
    return content.replace(SRC_ATTR_REGEXP, occurrence => {
      SRC_ATTR_REGEXP.lastIndex = 0;
      const src = SRC_ATTR_REGEXP.exec(occurrence);

      if (!src || !src[3]) return occurrence;
      const s = src[3];

      occurrence = occurrence.replace(s, newSrc => {
        const path = newSrc.split("/").reverse()[0];
        return `${sourceUrl}/${path}`;
      });

      return occurrence;
    });
  };
}
