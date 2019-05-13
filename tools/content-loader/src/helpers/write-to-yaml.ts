import { safeDump } from "js-yaml";
import { writeFile } from "fs-extra";
import to from "await-to-js";
import { VError } from "verror";

export const writeToYaml = async (outputPath: string, data: any) => {
  const yaml = safeDump(data, {
    indent: 2,
  });

  const [err] = await to(writeFile(outputPath, yaml, { encoding: "utf8" }));
  if (err) {
    throw new VError(err, `while writing yaml ${yaml} to ${outputPath}`);
  }
};
