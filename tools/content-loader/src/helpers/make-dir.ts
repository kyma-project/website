import { mkdirs } from "fs-extra";
import { removeDir } from "./remove-dir";
import to from "await-to-js";
import { VError } from "verror";

export const makeDir = async (dir: string, remove?: boolean): Promise<void> => {
  let err: Error | null;

  if (remove) {
    [err] = await to(removeDir(dir));
    if (err) {
      throw err;
    }
  }

  [err] = await to(mkdirs(dir));
  if (err) {
    throw new VError(err, `while creating dir: ${dir}`);
  }
};
