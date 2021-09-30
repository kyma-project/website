import to from "await-to-js";
import { VError } from "verror";
import { copy } from "fs-extra";

export class CopyCommunity {
  do = async (source: string, output: string) => {
    console.log(`Copy community content from ${source} to ${output}`);

    const [err] = await to(copy(source, output));
    if (err) {
      throw new VError(err, `while copying documentation to ${output}`);
    }
  };
}

export default new CopyCommunity();
