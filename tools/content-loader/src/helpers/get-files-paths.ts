import { lstatSync, Stats } from "fs";
import { readdir } from "fs-extra";
import to from "await-to-js";
import { VError } from "verror";

export const getFilesPaths = async (path: string): Promise<string[]> => {
  let err: Error | null;

  let type: Stats;
  try {
    type = lstatSync(path);
    if (type.isSymbolicLink()) return [""];
    if (type.isFile()) return [path];
  } catch (e) {
    throw new VError(e, `while getting stats from path: ${path}`);
  }

  let paths: string[] | undefined;
  [err, paths] = await to(readdir(path));
  if (err) {
    throw new VError(err, `while getting read dir: ${path}`);
  }
  if (!paths || !paths.length) {
    return [];
  }

  const filesPromises = paths.map(async p => {
    const newPath = `${path}/${p}`;
    const [e, r] = await to(getFilesPaths(`${path}/${p}`));
    if (e) {
      throw new VError(e, `while getting paths for path: ${newPath}`);
    }
    return r;
  });

  let files: Array<string[] | undefined> | undefined;
  [err, files] = await to(Promise.all(filesPromises));
  if (err) {
    throw new VError(err, `while executing filesPromises`);
  }
  if (!files || !files.length) {
    return [];
  }

  const filteredFiles = files.filter(f => Array.isArray(f)) as string[][];
  const flattenFiles = filteredFiles.reduce(
    (arr, x) => (Array.isArray(x) ? [...arr, ...x] : [...arr, x]),
    [],
  );

  return flattenFiles.filter((f: string) => f);
};
