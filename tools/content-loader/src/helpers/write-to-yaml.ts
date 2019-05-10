import { safeDump } from "js-yaml";

export const writeToYaml = (obj: any) => {
  return safeDump(obj, {
    indent: 2,
  });
};
