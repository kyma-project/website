import to from "await-to-js";
import { VError } from "verror";

import ClusterDocsTopicSerializer from "../clusterDocsTopicSerializer";

export class CopyCommunity {
  do = async (source: string, output: string) => {
    console.log(`Copy community content to ${output}`);
    const [err] = await to(this.copy(source, output));
    if (err) {
      throw new VError(err, `while copying documentation to ${output}`);
    }
  };

  private copy = async (source: string, output: string) => {
    const [err] = await to(ClusterDocsTopicSerializer.do(source, output));
    if (err) {
      throw err;
    }
  };
}

export default new CopyCommunity();
