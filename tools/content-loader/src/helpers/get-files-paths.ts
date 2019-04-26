import { stat, readdir } from "fs-extra";
import to from "await-to-js";
import { VError } from "verror";

export const getFilesPaths = async (path: string) => {
  let err: Error | null;

  let type;
  [err, type] = await to(stat(path));
  if (err) throw new VError(err, `while getting stats from path: ${path}`);
  if (type.isFile()) return path;

  let paths: string[];
  [err, paths] = await to(readdir(path));
  if (err) throw new VError(err, `while getting read dir: ${path}`);

  const filesPromises = paths.map(async p => {
    const newPath = `${path}/${p}`;
    const [err, result] = await to(this.getFilesPaths(`${path}/${p}`));
    if (err)
      throw new VError(err, `while getting paths for path: ${newPath}`);
    return result;
  });

  let files;
  [err, files] = await to(Promise.all(filesPromises));
  if (err) throw new VError(err, `while executing filesPromises`);

  const flattenFiles = files.reduce(
    (arr, x) => (Array.isArray(x) ? [...arr, ...x] : [...arr, x]),
    [],
  );

  return flattenFiles;
};