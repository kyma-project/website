import { safeLoad } from "js-yaml";
import { readFile } from "./read-file";
import to from "await-to-js";

export const readYaml = async (file: string): Promise<any> => {
  const [err, data] = await to(readFile(file));
  if (err || !data) {
    throw err;
  }
  if (!data) {
    return;
  }

  return safeLoad(data);
};
