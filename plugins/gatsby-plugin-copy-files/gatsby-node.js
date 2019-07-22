const { join, resolve } = require("path");
const fs = require("fs-extra");

exports.onCreateNode = ({ node }, pluginOptions) => {
  const {
    source: src,
    destination,
    extensions,
    excludeDirs,
    excludeFiles,
  } = pluginOptions;
  const source = resolve(src);

  const matchExcludeDirs = fileRelativeDirectory => {
    return excludeDirs.some(dir => fileRelativeDirectory.includes(dir));
  };

  const matchExcludeFiles = filePath => {
    return excludeFiles.some(file => filePath.includes(file));
  };

  if (node.internal.type === "File") {
    const nodeName = `${node.relativeDirectory}/${node.base}`;

    if (
      node.dir.includes(source) &&
      extensions.includes(node.extension) &&
      !(matchExcludeDirs(node.relativeDirectory) || matchExcludeFiles(nodeName))
    ) {
      const relativeToDest = node.dir.replace(source, "");
      const newPath = join(
        process.cwd(),
        "public",
        destination,
        relativeToDest,
        node.base,
      );

      fs.copy(node.absolutePath, newPath, err => {
        if (err) {
          console.error(`Error copying file: ${nodeName}`, err);
        }
      });
    }
  }
};
