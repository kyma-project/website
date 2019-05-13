import { pathExists } from "fs-extra";

export const fileExists = async (path: string) => {
  const exists = await pathExists(path);
  return exists;
};
