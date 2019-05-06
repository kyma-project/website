import { remove } from "fs-extra";
import to from "await-to-js";
import { VError } from "verror";

export const removeDir = async (dir: string) => {
  const [err] = await to(remove(dir));
  if (err) {
    throw new VError(err, `while removing dir: ${dir}`);
  }
};
