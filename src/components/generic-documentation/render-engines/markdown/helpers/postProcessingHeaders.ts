import { Source } from "@kyma-project/documentation-component";
import { plugins } from "@kyma-project/dc-markdown-render-engine";
import { toKebabCase } from "@common/utils/toKebabCase";

type Header = plugins.Header;

function decrementLevels(headers: Header[], level: number = 0): Header[] {
  for (const header of headers) {
    const firstLevel = level ? level : header.level;
    header.level -= firstLevel;
    if (firstLevel && header.children && header.children.length) {
      header.children = decrementLevels(header.children, firstLevel);
    }
  }

  return headers;
}

function getTypes(sources: Source[]): [string[], { [key: string]: number }] {
  const types: Set<string> = new Set<string>();
  const numberOfTypes: { [key: string]: number } = {};

  sources.map(s => {
    const data = s.data;
    if (data && data.frontmatter) {
      const { title, type } = data.frontmatter;
      const t = type ? type : title;

      if (numberOfTypes[t]) {
        numberOfTypes[type]++;
      } else {
        numberOfTypes[t] = 1;
      }
      types.add(t);
    }
  });
  return [Array.from(types), numberOfTypes];
}

export const postProcessingHeaders = (
  sources: Source[],
  headers: Header[],
): Header[] => {
  if (!sources.length) {
    return headers;
  }

  const [types, numberOfTypes] = getTypes(sources);
  if (!types.length) {
    return decrementLevels(headers, 0);
  }
  let processedHeaders: Header[] = [];

  for (const type of types) {
    if (numberOfTypes[type] === 1 && headers.find(h => h.title === type)) {
      continue;
    }

    processedHeaders.push({
      title: type,
      id: toKebabCase(type),
      level: 0,
      children: [],
    });
  }

  headers.map(h => {
    const data = h.source && h.source.data;
    if (data && data.frontmatter) {
      const { title, type } = data.frontmatter;
      const t = type ? type : title;

      const ph = processedHeaders.find(p => p.title === t);
      if (ph && ph.children) {
        h.parent = ph;
        ph.children.push(h);
      } else {
        processedHeaders.push(h);
      }
    }
  });

  processedHeaders = processedHeaders.sort((first, sec) =>
    first.title.toLowerCase() === "overview"
      ? -1
      : sec.title.toLowerCase() === "overview"
      ? 1
      : 0,
  );

  return decrementLevels(processedHeaders, 0);
};
