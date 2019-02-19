const { join } = require("path");
const fs = require("fs-extra");

class Copy {
  async releases({ releases, source, output, gitClient }) {
    for (const key of releases.keys()) {
      const tag = releases.get(key);
      console.log(`Copying documentation for release ${key} from tag ${tag}`);
      gitClient.checkoutTag(tag);

      const out = `${output}/${key}`;
      await this.copy(source, out);
    }
  }

  async branches({ branches, source, output, gitClient }) {
    for (const branch of branches.keys()) {
      const commit = branches.get(branch);
      console.log(
        `Copying documentation for commit ${commit} from branch ${branch}`,
      );
      gitClient.checkout(commit);

      const out = `${output}/${branch}`;
      await this.copy(source, out);
    }
  }

  async getFilesPaths(path) {
    const type = await fs.stat(path);
    if (type.isFile()) return path;

    const paths = await fs.readdir(path);

    const filesPromises = paths.map(
      async p => await this.getFilesPaths(`${path}/${p}`),
    );

    const files = await Promise.all(filesPromises);
    const flattenFiles = files.reduce(
      (arr, x) => (Array.isArray(x) ? [...arr, ...x] : [...arr, x]),
      [],
    );

    return flattenFiles;
  }

  async removeDir(dir) {
    try {
      await fs.remove(dir);
    } catch (err) {
      console.error(err);
    }
  }

  async copyResources(docsDir, output) {
    await this.removeDir(output);

    let files = await this.getFilesPaths(docsDir);
    const allowedFilesRegex = /docs\/(manifest\.(yaml|yml)|[A-z0-9-_]*\/(docs\.config\.json|docs\/assets\/[A-z0-9-_]*\.(png|jpg|gif|jpeg|svg|yaml|yml|json)|docs\/[A-z0-9-_]*\.md))/;

    files = files.filter(file => Boolean(allowedFilesRegex.exec(file)));

    const copyingFiles = files.map(file => {
      const newPath = join(output, file.replace(docsDir, ""));
      return fs.copy(file, newPath);
    });

    return await Promise.all(copyingFiles);
  }

  async copy(source, output) {
    const docsDir = `${source}/docs`;

    console.log(`Copy documentation to ${output}`);
    await this.copyResources(docsDir, output);
  }
}

module.exports = new Copy();
