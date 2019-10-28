import to from "await-to-js";
import { VError } from "verror";

import GitClient from "../github-client/git-client";

import ClusterDocsTopicSerializer from "../cdt-serializer";

import { copyResources, fileExists } from "../helpers";

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
    const docsDir = `${source}/docs`;
    let err: Error | null;

    console.log(`Copy documentation to ${output}`);
    const manifestExists = await this.checkIfManifestExists(docsDir);
    if (manifestExists) {
      [err] = await to(this.copyOldArchitecture(docsDir, output));
    } else {
      [err] = await to(this.copyNewArchitecture(source, output, version));
    }

    if (err) {
      throw new VError(err, `while copying documentation to ${output}`);
    }
  };

  private checkIfManifestExists = async (docsDir: string): Promise<boolean> => {
    const manifestPaths: string[] = [
      `${docsDir}/manifest.yaml`,
      `${docsDir}/manifest.yml`,
    ];
    for (const path of manifestPaths) {
      const exists = await fileExists(path);
      if (exists) {
        return true;
      }
    }
    return false;
  };

  private copyOldArchitecture = async (docsDir: string, output: string) => {
    const allowedFilesRegex = /docs\/(manifest\.(yaml|yml)|[A-z0-9-_]*\/(docs\.config\.json|docs\/assets\/[A-z0-9-_.&]*\.(png|jpg|gif|jpeg|svg|yaml|yml|json)|docs\/[A-z0-9-_.&]*\.md))/;
    const [err] = await to(copyResources(docsDir, output, allowedFilesRegex));
    if (err) {
      throw err;
    }
  };

  private copyNewArchitecture = async (
    source: string,
    output: string,
    version: string,
  ) => {
    const [err] = await to(
      ClusterDocsTopicSerializer.do(source, output, { docsVersion: version }),
    );
    if (err) {
      throw err;
    }
  };
}

export default new CopyDocs();
