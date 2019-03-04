const { DOCS_LATEST_VERSION } = require("../../constants");

const linksToRewrite = require("../../../content/docs/fix-links");

const mdLinksRegex = /\[([^\[]+)\]\(([^\)]+)\)/g;
const docsLinksRegex = /^\/(docs|components|root)\/(.*?)$/g;

const changeVersion = ({ source, version }) => {
  return source.replace(mdLinksRegex, occurrence => {
    mdLinksRegex.lastIndex = 0;
    let href = mdLinksRegex.exec(occurrence);

    if (!href || !href[2]) return occurrence;
    href = href[2];

    occurrence = occurrence.replace(href, newHref => {
      docsLinksRegex.lastIndex = 0;
      newHref = docsLinksRegex.exec(newHref);

      if (!newHref || !newHref[2]) return href;
      newHref =
        newHref[1] === "docs" ? newHref[2] : `${newHref[1]}/${newHref[2]}`;

      return version && !newHref.includes(version)
        ? `/docs/${version}/${newHref}`
        : `/docs/${newHref}`;
    });

    return occurrence;
  });
};

const rewrite = ({
  source,
  version,
  type,
  id,
  docType,
  docTitle,
  latestVersion,
}) => {
  const v =
    version === DOCS_LATEST_VERSION || !version ? latestVersion : version;
  if (!linksToRewrite[v]) return source;

  return source.replace(mdLinksRegex, occurrence => {
    mdLinksRegex.lastIndex = 0;
    let href = mdLinksRegex.exec(occurrence);

    if (!href || !href[2]) return occurrence;
    href = href[2];

    if (
      linksToRewrite[v][type] &&
      linksToRewrite[v][type][id] &&
      linksToRewrite[v][type][id][docType] &&
      linksToRewrite[v][type][id][docType][docTitle] &&
      linksToRewrite[v][type][id][docType][docTitle][href]
    ) {
      occurrence = occurrence.replace(
        href,
        linksToRewrite[v][type][id][docType][docTitle][href],
      );
    }

    return occurrence;
  });
};

module.exports = ({ content, version, latestVersion }) => {
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
