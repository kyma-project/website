import { readFile as rF } from "fs-extra";
import { fileExists } from "./file-exists";
import to from "await-to-js";
import { VError } from "verror";

export const readFile = async (file: string): Promise<string> => {
  const [err] = await to(fileExists(file));
  if (err) {
    throw err;
  }
  const [rfErr, data] = await to(rF(file));
  if (rfErr) {
    throw new VError(rfErr, `while reading file: ${file}`);
  }
  if (!data) {
    return "";
  }
  return data.toString();
};
