import { safeLoad } from "js-yaml";

export const readYaml = (file: string) => {
  return safeLoad(file);
};
