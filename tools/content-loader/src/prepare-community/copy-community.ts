import to from "await-to-js";
import { VError } from "verror";
import { copy } from "fs-extra";
import { join } from "path";

export class CopyCommunity {
  do = async (source: string, output: string) => {
    const docsSrc = join(source, "docs");
    console.log(`Copy community content from ${docsSrc} to ${output}`);

    const [err] = await to(copy(docsSrc, output));
    if (err) {
      throw new VError(err, `while copying documentation to ${output}`);
    }
  };
}

export default new CopyCommunity();
