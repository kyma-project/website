import to from "await-to-js";
import { VError } from "verror";

import ClusterDocsTopicSerializer from "../cdt-serializer";

export class CopyCommunity {
  do = async (source: string, output: string) => {
    console.log(`Copy community content to ${output}`);
    const [err] = await to(this.copy(source, output));
    if (err) {
      throw new VError(err, `while copying documentation to ${output}`);
    }
  };

  private copy = async (source: string, output: string) => {
    const copyRegex: string = `([A-z0-9-_.&]*\.md|assets\/[A-z0-9-_.&]*\.(png|jpg|gif|jpeg|svg|yaml|yml|json))`;
    const [err] = await to(
      ClusterDocsTopicSerializer.do(source, output, { copyRegex }),
    );
    if (err) {
      throw err;
    }
  };
}

export default new CopyCommunity();
