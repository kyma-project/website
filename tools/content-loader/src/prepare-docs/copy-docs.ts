import to from "await-to-js";
import { VError } from "verror";

import GitClient from "../github-client/git-client";

import ClusterDocsTopicSerializer from "../cdt-serializer";

export class CopyDocs {
  releases = async ({ releases, source, output }) => {
    for (const release of Array.from(releases.keys())) {
      const tag = releases.get(release);
      console.log(
        `Copying documentation for release ${release} from tag ${tag}`,
      );

      let err: Error;
      [err] = await to(GitClient.checkoutTag(tag));
      if (err) {
        throw err;
      }

      const out = `${output}/${release}`;
      [err] = await to(this.do(source, out, release as string));
      if (err) {
        throw new VError(err, `while copying sources from tag: ${tag}`);
      }
    }
  };

  branches = async ({ branches, source, output }) => {
    for (const branch of Array.from(branches.keys())) {
      console.log(`Copying documentation from branch ${branch}`);

      let err: Error;
      [err] = await to(GitClient.checkout(branch as string));
      if (err) {
        throw err;
      }

      const out = `${output}/${branch}`;
      [err] = await to(this.do(source, out, branch as string));
      if (err) {
        throw new VError(err, `while copying sources from branch: ${branch}`);
      }
    }
  };

  local = async ({ source, output }) => {
    console.log(`Copying local documentation from branch`);

    const [err] = await to(this.do(source, output));
    if (err) {
      throw new VError(err, `while copying local documentation to ${output}`);
    }
  };

  private do = async (source: string, output: string, version?: string) => {
    let err: Error | null = null;

    console.log(`Copy documentation to ${output}`);

    [err] = await to(this.copy(source, output, version));
    if (err) {
      throw new VError(err, `while copying documentation to ${output}`);
    }
  };

  private copy = async (source: string, output: string, version: string) => {
    const [err] = await to(
      ClusterDocsTopicSerializer.do(source, output, { docsVersion: version }),
    );
    if (err) {
      throw err;
    }
  };
}

export default new CopyDocs();
