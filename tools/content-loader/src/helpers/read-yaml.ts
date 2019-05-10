import { safeLoad } from "js-yaml";
import { readFile } from "./read-file";
import to from "await-to-js";
import { VError } from "verror";

export const readYaml = async (file: string) => {
  const [err, data] = await to(readFile(file));
  if (err) {
    throw err;
  }

  return safeLoad(data);
};
