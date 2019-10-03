import { pathExists } from "fs-extra";

export const fileExists = async (path: string) => await pathExists(path);
