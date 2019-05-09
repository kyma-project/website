import to from "await-to-js";
import { VError } from "verror";

import GitClient from "../github-client/git-client";

import { copyResources, fileExists } from "../helpers";

export class CopyDocs {
  releases = async ({ releases, source, output }) => {
    for (const key of Array.from(releases.keys())) {
      const tag = releases.get(key);
      console.log(`Copying documentation for release ${key} from tag ${tag}`);

      let err: Error;
      [err] = await to(GitClient.checkoutTag(tag));
      if (err) {
        throw err;
      }

      const out = `${output}/${key}`;
      [err] = await to(this.do(source, out));
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
      [err] = await to(this.do(source, out));
      if (err) {
        throw new VError(err, `while copying sources from branch: ${branch}`);
      }
    }
  };

  private do = async (source: string, output: string) => {
    const docsDir = `${source}/docs`;

    const manifestExists = this.checkExistsOfManifest(docsDir);
    if (manifestExists) {
      this.copyOldArchitecture(docsDir, output);
    } else {
      this.copyNewArchitecture(docsDir, output);
    }
  };

  private checkExistsOfManifest = async (docsDir: string): Promise<boolean> => {
    const manifestPaths: string[] = [`${docsDir}/manifest.yaml`, `${docsDir}/manifest.yml`];
    for (const path of manifestPaths) {
      const exists = await fileExists(path);
      if (exists) {
        return true;
      }
    }
    return false;
  };

  private copyOldArchitecture = async (docsDir: string, output: string) => {
    console.log(`Copy documentation to ${output}`);
    const allowedFilesRegex = /docs\/(manifest\.(yaml|yml)|[A-z0-9-_]*\/(docs\.config\.json|docs\/assets\/[A-z0-9-_.]*\.(png|jpg|gif|jpeg|svg|yaml|yml|json)|docs\/[A-z0-9-_.]*\.md))/;
    const [err] = await to(copyResources(docsDir, output, allowedFilesRegex));
    if (err) {
      throw new VError(err, `while copying documentation to ${output}`);
    }
  };

  private copyNewArchitecture = async (docsDir: string, output: string) => {
    console.log(`Copy documentation to ${output}`);
    const allowedFilesRegex = /docs\/(assets\/[A-z0-9-_.]*\.(png|jpg|gif|jpeg|svg|yaml|yml|json)|[A-z0-9-_.]*\.md)/;
    const [err] = await to(copyResources(docsDir, output, allowedFilesRegex));
    if (err) {
      throw new VError(err, `while copying documentation to ${output}`);
    }
  };
}

export default new CopyDocs();
