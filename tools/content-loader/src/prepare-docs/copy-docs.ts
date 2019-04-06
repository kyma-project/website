import { join } from 'path';
import { remove, copy, stat, readdir } from 'fs-extra';
import to from 'await-to-js';
import { VError } from 'verror';

import GitClient from "../github-client/git-client";

class CopyDocs {
  releases = async ({ releases, source, output }) => {
    for(const key of Array.from(releases.keys())) {
      const tag = releases.get(key);
      console.log(`Copying documentation for release ${key} from tag ${tag}`);

      let err: Error;
      [err] = await to(GitClient.checkoutTag(tag));
      if(err) throw err;

      const out = `${output}/${key}`;
      [err] = await to(this.do(source, out));
      if(err) throw new VError(err, `while copying sources from tag: ${tag}`);
    }
  }

  branches = async ({ branches, source, output }) => {
    for(const branch of Array.from(branches.keys())) {
      console.log(
        `Copying documentation from branch ${branch}`,
      );
      
      let err: Error;
      [err] = await to(GitClient.checkout(branch as string));
      if(err) throw err;

      const out = `${output}/${branch}`;
      [err] = await to(this.do(source, out));
      if(err) throw new VError(err, `while copying sources from branch: ${branch}`);
    }
  }

  private getFilesPaths = async (path: string) => {
    let err: Error | null;;

    let type;
    [err, type] = await to(stat(path));
    if(err) throw new VError(err, `while getting stats from path: ${path}`);
    if (type.isFile()) return path;

    let paths: string[];
    [err, paths] = await to(readdir(path));
    if(err) throw new VError(err, `while getting read dir: ${path}`);

    const filesPromises = paths.map(
      async p => {
        const newPath = `${path}/${p}`;
        const [err, result] = await to(this.getFilesPaths(`${path}/${p}`));
        if(err) throw new VError(err, `while getting paths for path: ${newPath}`);
        return result;
      },
    );

    let files;
    [err, files] = await to(Promise.all(filesPromises));
    if(err) throw new VError(err, `while executing filesPromises`);

    const flattenFiles = files.reduce(
      (arr, x) => (Array.isArray(x) ? [...arr, ...x] : [...arr, x]),
      [],
    );

    return flattenFiles;
  }

  private removeDir = async (dir: string) => {
    const [err] = await to(remove(dir));
    if(err) throw new VError(err, `while removing dir: ${dir}`);
  }

  private copyResources = async (docsDir: string, output: string) => {
    let err: Error | null;;
    [err] = await to(this.removeDir(output));
    if(err) throw err;

    let files;
    [err, files] = await to(this.getFilesPaths(docsDir));
    if(err) throw new VError(err, `while getting files paths`);

    const allowedFilesRegex = /docs\/(manifest\.(yaml|yml)|[A-z0-9-_]*\/(docs\.config\.json|docs\/assets\/[A-z0-9-_.]*\.(png|jpg|gif|jpeg|svg|yaml|yml|json)|docs\/[A-z0-9-_.]*\.md))/;

    files = files.filter(file => Boolean(allowedFilesRegex.exec(file)));

    const copyingFiles = files.map(async file => {
      const newPath = join(output, file.replace(docsDir, ""));
      const [err, result] = await to(copy(file, newPath));
      if(err) throw new VError(err, `while copying file "${file}" to path: ${newPath}`);
      return result;
    });

    let result;
    [err, result] = await to(Promise.all(copyingFiles));
    if(err) throw new VError(err, `while copying files`);

    return result;
  }

  private do = async (source: string, output: string) => {
    const docsDir = `${source}/docs`;

    console.log(`Copy documentation to ${output}`);
    const [err] = await to(this.copyResources(docsDir, output));
    if(err) throw new VError(err, `while copying documentation to ${output}`);
  }
}

export default new CopyDocs();
