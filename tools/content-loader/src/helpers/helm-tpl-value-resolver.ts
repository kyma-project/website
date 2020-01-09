import { join, dirname } from "path";
import { statSync, readdirSync, existsSync } from "fs";
import { readYaml } from "./read-yaml";
import { parentDir } from "./parent-dir";
import { merge, get } from "lodash";

const VALUES_FILE_NAME = "values.yaml";

const extractValuePaths = (resourcePath: string, chartDir: string) => {
  const result: string[] = [];
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
    const match = templateRegexp.exec(s);
    if (!match || !match.length) {
      return;
    }
    yield { match: match[0], value: match[1] };
  }
}

export const mergeObjects = async (acc: Promise<any>, current: Promise<any>) =>
  Promise.all([acc, current])
    .then(results => merge(...results))
    .catch((e: Error) => ({}));

export const values = async (path: string, chartRepo: string) =>
  extractValuePaths(path, chartRepo)
    .map(readYaml)
    .reduce(mergeObjects);

export const fixSourceUrl = (url: string, vals: any) =>
  Array.from(valueTplMatchGenerator(url))
    .map((v: SearchResult) => ({
      searchValue: v.match,
      replaceValue: get(vals, v.value),
    }))
    .reduceRight(
      (acc: string, current: ReplaceDTO) =>
        acc.replace(current.searchValue, current.replaceValue),
      url,
    );
