import { join } from "path";
import { copy } from "fs-extra";
import to from "await-to-js";
import { VError } from "verror";

import { getFilesPaths } from "./get-files-paths";
import { removeDir } from "./remove-dir";

export const copyResources = async (
  dir: string,
  output: string,
  regex: RegExp,
) => {
  let err: Error | null;

  [err] = await to(removeDir(output));
  if (err) {
    throw err;
  }

  let files: string[] | undefined;
  [err, files] = await to(getFilesPaths(dir));
  if (err) {
    throw new VError(err, `while getting files paths`);
  }
  if (!files || !files.length) {
    return;
  }

  files = files.filter(file => Boolean(regex.exec(file)));
  const copyingFiles = files.map(async file => {
    const newPath = join(output, file.replace(dir, ""));
    const [e, r] = await to(copy(file, newPath));
    if (e) {
      throw new VError(e, `while copying file "${file}" to path: ${newPath}`);
    }
    return r;
  });

  let result;
  [err, result] = await to(Promise.all(copyingFiles));
  if (err) {
    throw new VError(err, `while copying files`);
  }

  return result;
};
