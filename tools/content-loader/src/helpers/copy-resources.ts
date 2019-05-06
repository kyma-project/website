import { join } from "path";
import { stat, readdir, copy } from "fs-extra";
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

  let files;
  [err, files] = await to(getFilesPaths(dir));
  if (err) {
    throw new VError(err, `while getting files paths`);
  }

  const allowedFilesRegex = /docs\/(manifest\.(yaml|yml)|[A-z0-9-_]*\/(docs\.config\.json|docs\/assets\/[A-z0-9-_.]*\.(png|jpg|gif|jpeg|svg|yaml|yml|json)|docs\/[A-z0-9-_.]*\.md))/;

  files = files.filter(file => Boolean(regex.exec(file)));

  const copyingFiles = files.map(async file => {
    const newPath = join(output, file.replace(dir, ""));
    const [err, result] = await to(copy(file, newPath));
    if (err) {
      throw new VError(err, `while copying file "${file}" to path: ${newPath}`);
    }
    return result;
  });

  let result;
  [err, result] = await to(Promise.all(copyingFiles));
  if (err) {
    throw new VError(err, `while copying files`);
  }

  return result;
};
