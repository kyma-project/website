import { Node } from "gatsby";
import { join, resolve } from "path";
import fs from "fs-extra";

const matchExcludeDirs = (
  excludeDirs: Array<string | RegExp>,
  fileRelativeDirectory: string,
) =>
  excludeDirs.some(dir => {
    if (dir instanceof RegExp) {
      return dir.test(fileRelativeDirectory);
    }
    return fileRelativeDirectory.includes(dir);
  });

const matchExcludeFiles = (
  excludeFiles: Array<string | RegExp>,
  filePath: string,
) =>
  excludeFiles.some(file => {
    if (file instanceof RegExp) {
      return file.test(filePath);
    }
    return filePath.includes(file);
  });

interface CopyAssetsOptions {
  source: string;
  destination: string;
  extensions: string[];
  excludeDirs: Array<string | RegExp>;
  excludeFiles: Array<string | RegExp>;
}
const options: CopyAssetsOptions = {
  source: resolve(`${__dirname}/../../../../content`),
  destination: "/assets",
  extensions: ["jpeg", "jpg", "gif", "png", "svg", "json", "yaml", "yml"],
  excludeDirs: ["i18n"],
  excludeFiles: [
    "docs/versions.json",
    "docs.config.json",
    "manifest.yaml",
    "events.yaml",
  ],
};

export interface CopyAssetsNode extends Node {
  dir: string;
  extension: string;
  relativeDirectory: string;
  base: string;
  absolutePath: string;
}

export const copyAssets = (node: CopyAssetsNode) => {
  const nodeName = `${node.relativeDirectory}/${node.base}`;
  const {
    source,
    destination,
    extensions,
    excludeDirs,
    excludeFiles,
  } = options;

  const condition =
    node.dir.includes(source) &&
    extensions.includes(node.extension) &&
    !(
      matchExcludeDirs(excludeDirs, node.relativeDirectory) ||
      matchExcludeFiles(excludeFiles, nodeName)
    );
  if (!condition) {
    return;
  }

  const relativeToDest = node.dir.replace(source, "");
  const newPath = join(
    process.cwd(),
    "public",
    destination,
    relativeToDest,
    node.base,
  );

  fs.copy(node.absolutePath, newPath, (err: Error) => {
    if (err) {
      console.error(`Error copying file: ${nodeName}`, err);
    }
  });
};
