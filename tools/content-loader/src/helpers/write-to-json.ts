import { writeJSON } from "fs-extra";
import to from "await-to-js";
import { VError } from "verror";

export const writeToJson = async (outputPath: string, data: any) => {
  const [err] = await to(
    writeJSON(outputPath, data, { encoding: "utf8", spaces: 2 }),
  );
  if (err) {
    throw new VError(
      err,
      `while writing json ${JSON.stringify(data)} to ${outputPath}`,
    );
  }
};
