import { safeLoad } from "js-yaml";
import { readFile } from "./read-file";
import to from "await-to-js";

export const readYaml = async (file: string) => {
  const [err, data] = await to(readFile(file));
  if (err || !data) {
    throw err;
  }

  return safeLoad(data);
};

export type read = (path: string) => Promise<any>;

export const memoizeRead = (f: read) => {
  const cache: any = {};
  return async (path: string) => {
    const cachedResult = cache[path];
    if (!cachedResult) {
      cache[path] = f(path);
    }
    return cache[path];
  };
};
