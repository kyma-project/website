import { Source } from "@kyma-project/documentation-component";
import { plugins } from "@kyma-project/dc-markdown-render-engine";
import { toKebabCase } from "@common/utils/toKebabCase";

type Header = plugins.Header;

function hoistingParents(headers: Header[]): Header[] {
  if (headers.length === 1 && headers[0].children) {
    return hoistingParents(headers[0].children);
  }
  return headers;
}

function getTypes(sources: Source[]): [string[], { [key: string]: number }] {
  const types: Set<string> = new Set<string>();
  const numberOfTypes: { [key: string]: number } = {};

  sources.map(s => {
    const data = s.data;
    if (!(data && data.frontmatter)) {
      return;
    }

    const { title, type } = data.frontmatter;
    const t = type ? type : title;

    if (numberOfTypes[t]) {
      numberOfTypes[type]++;
    } else {
      numberOfTypes[t] = 1;
    }
    types.add(t);
  });
  return [Array.from(types), numberOfTypes];
}

export const postProcessingHeaders = (
  sources: Source[],
  headers: Header[],
): Header[] => {
  if (!sources.length) {
    return hoistingParents(headers);
  }

  if (headers.length === 1 && !headers[0].children) {
    return [];
  }

  const [types, numberOfTypes] = getTypes(sources);
  if (!types.length) {
    return headers;
  }
  const processedHeaders: Header[] = [];

  for (const type of types) {
    if (numberOfTypes[type] === 1 && headers.find(h => h.title === type)) {
      continue;
    }

    const kebabCased = toKebabCase(`${type}-${type}`);
    if (!kebabCased) {
      continue;
    }

    processedHeaders.push({
      title: type,
      id: kebabCased,
      level: "doc-type",
      children: [],
    });
  }

  if (!processedHeaders.length) {
    return hoistingParents(headers);
  }

  headers.map(h => {
    const data = h.source && h.source.data;
    if (!(data && data.frontmatter)) {
      return;
    }

    const { title, type } = data.frontmatter;
    const t = type ? type : title;

    const ph = processedHeaders.find(p => p.title === t);
    if (ph && ph.children) {
      h.parent = ph;
      ph.children.push(h);
    } else {
      processedHeaders.push(h);
    }
  });

  const sortedProcessedHeaders: Header[] = [];
  for (const type of types) {
    const newHeaders = processedHeaders.find(h => h.title === type);
    if (newHeaders) {
      sortedProcessedHeaders.push(newHeaders);
    }
  }

  return hoistingParents(sortedProcessedHeaders);
};
