import { join, dirname, sep } from "path";
import { statSync, readdirSync, existsSync } from "fs";
import { memoizeRead, readYaml } from "./read-yaml";
import { get } from "lodash";

const VALUES_FILE_NAME = "values.yaml";

export const parentDir = (p: string) => {
  if (!p) {
    return "";
  }
  const parent = p.substring(0, p.lastIndexOf(sep));
  return parent ? parent : "";
};

const extractValuePaths = (resourcePath: string, chartDir: string) => {
  let result: string[] = [];
  let dirName = dirname(resourcePath);
  let shouldContinue = true;
  while (
    existsSync(dirName) &&
    statSync(dirName).isDirectory() &&
    shouldContinue
  ) {
    if (dirName === chartDir) {
      shouldContinue = false;
    }
    const value = readdirSync(dirName).find(s => s === VALUES_FILE_NAME);
    if (value) {
      result.push(join(dirName, value));
    }
    dirName = parentDir(dirName);
  }
  return result;
};

const templateRegexp = /\{{2}[ ]*\.Values\.?(\w+(\.\w+)*)[ ]*\}{2}/g;

interface SearchResult {
  match: string;
  value: string;
}

interface ReplaceDTO {
  searchValue: string;
  replaceValue: string;
}

export function* valueTplMatchGenerator(s: string) {
  while (true) {
    let match = templateRegexp.exec(s);
    if (!match || !match.length) {
      return;
    }
    yield { match: match[0], value: match[1] };
  }
}

export const merge = async (acc: Promise<any>, current: Promise<any>) =>
  Promise.all([acc, current])
    .then(results => Object.assign(...results))
    .catch((e: Error) => {
      console.log(`${e.name}: ${e.message}\n`);
      return {};
    });

const read = memoizeRead(readYaml);

export const values = async (path: string, chartRepo: string) =>
  extractValuePaths(path, chartRepo)
    .map(read)
    .reduce(merge);

export const fixUrl = (url: string, values: any) =>
  Array.from(valueTplMatchGenerator(url))
    .map((v: SearchResult) => ({
      searchValue: v.match,
      replaceValue: get(values, v.value),
    }))
    .reduceRight(
      (acc: string, current: ReplaceDTO) =>
        acc.replace(current.searchValue, current.replaceValue),
      url,
    );
