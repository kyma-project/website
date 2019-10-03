import { DOCS_LATEST_VERSION } from "../../../constants";
import { DocsContentItem } from "../utils";

import fixLinksJSON from "../../../../content/docs/fix-links.json";

const MD_LINKS_REGEX = /\[([^\[]+)\]\(([^\)]+)\)/g;
const DOCS_LINKS_REGEX = /^\/(docs|components|root)\/(.*?)$/g;

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

      if (!r || !r[2]) return h;
      const newHref = r[1] === "docs" ? r[2] : `${r[1]}/${r[2]}`;

      return version && !newHref.includes(version)
        ? `/docs/${version}/${newHref}`
        : `/docs/${newHref}`;
    });

    return occurrence;
  });

export const rewrite = ({
  source,
  version,
  type,
  id,
  docType,
  docTitle,
  latestVersion,
}: {
  [k: string]: string;
}) => {
  const v =
    version === DOCS_LATEST_VERSION || !version ? latestVersion : version;

  const linksToRewrite: any = fixLinksJSON;
  if (!linksToRewrite[v]) {
    return source;
  }

  return source.replace(MD_LINKS_REGEX, occurrence => {
    MD_LINKS_REGEX.lastIndex = 0;
    const href = MD_LINKS_REGEX.exec(occurrence);

    if (!href || !href[2]) return occurrence;
    const h = href[2];

    if (
      linksToRewrite[v][type] &&
      linksToRewrite[v][type][id] &&
      linksToRewrite[v][type][id][docType] &&
      linksToRewrite[v][type][id][docType][docTitle] &&
      linksToRewrite[v][type][id][docType][docTitle][h]
    ) {
      occurrence = occurrence.replace(
        h,
        linksToRewrite[v][type][id][docType][docTitle][h],
      );
    }

    return occurrence;
  });
};

export const fixLinks = ({
  content,
  version,
  latestVersion,
}: {
  content: DocsContentItem;
  version: string;
  latestVersion: string;
}) => {
  const type = content.type || "root";
  const id = content.id;

  content.docs = content.docs.map(doc => {
    const docType = doc.type || doc.title;
    const docTitle = doc.title;

    doc.source = rewrite({
      source: doc.source,
      version,
      type,
      id,
      docType,
      docTitle,
      latestVersion,
    });
    doc.source = changeVersion({ source: doc.source, version });

    return doc;
  });

  return content;
};
