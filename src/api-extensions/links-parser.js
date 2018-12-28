const rewriteLinks = require("./rewrite-links");

const headerRegexp = /<h(1|2|3|4|5|6)(.*?)id=(\"|')(.*?)(\"|')(.*?)>(.*?)<\/h(1|2|3|4|5|6)>/g;
const headerIDRegexp = /id=(\"|')(.*?)(\"|')/g;
const hrefAssetsRegexp = /href=\"(?!(https?|ftp))(.*?)assets\/(.*?)\.(json|yaml|jpg|jpeg|png|svg)\"/g;

function linksParser({
  content,
  contentType,
  id,
  version,
  includeVersionInPath = true,
  versionForAssets,
}) {
  content.docs = content.docs.map(doc => {
    if (!doc.source) return doc;

    doc.source = changeVersionInLinksHref(
      doc.source,
      version,
      includeVersionInPath,
    );
    doc.source = changeHeadersID(doc.source, doc.type, doc.title);
    doc.source = replaceHeadersToHeadersWithChains(doc.source);
    doc.source = rewriteLinks(
      doc.source,
      version,
      contentType,
      id,
      doc.type,
      doc.title,
    );
    doc.source = makeAbsolutePathsForAssets(
      doc.source,
      contentType,
      id,
      versionForAssets,
    );
    return doc;
  });
  return content;
}

function changeVersionInLinksHref(source, version, includeVersionInPath) {
  const hrefLinksRegexp = /href=\"\/docs\/(.*?)\"/g;

  source = source.replace(hrefLinksRegexp, occurrence => {
    hrefLinksRegexp.lastIndex = 0;
    let href = hrefLinksRegexp.exec(occurrence);

    if (!href || !href[1]) return occurrence;
    href = href[1];

    if (includeVersionInPath) {
      href = `href="/docs/${version}/${href}"`;
    } else {
      href = `href="/docs/${href}"`;
    }
    return href;
  });
  return source;
}

function changeHeadersID(source, docType, docTitle) {
  if (!docType) docType = docTitle;

  source = source.replace(headerIDRegexp, occurrence => {
    headerIDRegexp.lastIndex = 0;
    let id = headerIDRegexp.exec(occurrence);

    if (!id || !id[2]) return occurrence;
    id = id[2];

    const typeLowerCased = docType.toLowerCase().replace(/ /g, "-");
    const titleLowerCased = docTitle.toLowerCase().replace(/ /g, "-");
    const typeWithTitle = `${typeLowerCased}-${titleLowerCased}`;

    return `id="${typeWithTitle}-${id}"`;
  });
  return source;
}

function replaceHeadersToHeadersWithChains(source) {
  source = source.replace(headerRegexp, occurrence => {
    headerIDRegexp.lastIndex = 0;
    let id = headerIDRegexp.exec(occurrence);

    if (!id || !id[2]) return occurrence;
    id = id[2];

    const contentRegexp = />(.*?)</g;
    let content = contentRegexp.exec(occurrence);

    if (!content || !content[1]) return occurrence;
    content = content[1];
    return occurrence.replace(
      content,
      changeContentInHeaderForChain(content, id),
    );
  });
  return source;
}

function changeContentInHeaderForChain(content, id) {
  const svgIcon =
    '<svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>';
  const className = "anchor-chain";
  const anchorTag = `<a href="#${id}" aria-hidden class="${className}">${svgIcon}</a>`;

  return `${anchorTag}${content}`;
}

function makeAbsolutePathsForAssets(source, contentType, id, version) {
  source = source.replace(
    hrefAssetsRegexp,
    occurrence =>
      `href="/documentation/${version}/${contentType}/${id}/assets/${getFileNameOfAssets(
        occurrence,
      )}"`,
  );
  return source;
}

function getFileNameOfAssets(occurrence) {
  const fileName = occurrence.split("/");
  return fileName[fileName.length - 1];
}

module.exports = linksParser;
