import { readFile as rF } from "fs-extra";
import { fileExists } from "./file-exists";
import to from "await-to-js";
import { VError } from "verror";

export const readFile = async (file: string): Promise<string> => {
  let err: Error | null;

  [err] = await to(fileExists(file));
  if (err) {
    throw err;
  }

  let data: Buffer;
  [err, data] = await to(rF(file));
  if (err) {
    throw new VError(err, `while reading file: ${file}`);
  }

  return data.toString();
};
