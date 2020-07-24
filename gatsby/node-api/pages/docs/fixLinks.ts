import { DocsContentItem } from "../utils";

const MD_LINKS_REGEX = /\[([^\[]+)\]\(([^\)]+)\)/g;
const DOCS_LINKS_REGEX = /^\/(docs|([a-zA-Z0-9_-]+))\/(.*?)$/g;

export const changeVersion = ({
  source,
  version,
}: {
  source: string;
  version: string;
}) =>
  source.replace(MD_LINKS_REGEX, occurrence => {
    MD_LINKS_REGEX.lastIndex = 0;
    const href = MD_LINKS_REGEX.exec(occurrence);

    if (!href || !href[2]) return occurrence;
    const h = href[2];

    occurrence = occurrence.replace(h, oldHref => {
      DOCS_LINKS_REGEX.lastIndex = 0;
      const r = DOCS_LINKS_REGEX.exec(oldHref);

      if (!r || !r[3]) return h;
      const newHref =
        r[1] === "docs" || r[2] === "docs" ? r[3] : `${r[2]}/${r[3]}`;

      return version && !newHref.includes(version)
        ? `/docs/${version}/${newHref}`
        : `/docs/${newHref}`;
    });

    return occurrence;
  });

export const fixLinks = ({
  content,
  version,
}: {
  content: DocsContentItem;
  version: string;
}) => {
  content.docs = content.docs.map(doc => {
    doc.source = changeVersion({ source: doc.source, version });
    return doc;
  });
  return content;
};
