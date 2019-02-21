const {
  ASSETS_DIR,
  BLOG_PATH_PREFIX,
  BLOG_POST_FILENAME_REGEX,
} = require("../constants");

module.exports = ({ node, relativePath, createNodeField }) => {
  const match = BLOG_POST_FILENAME_REGEX.exec(relativePath);
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const fileName = match[4].replace(/\./g, "");

  createNodeField({
    node,
    name: "postInfo",
    value: {
      year,
      month,
      day,
      fileName,
    },
  });

  createNodeField({
    node,
    name: "assetsPath",
    value: `/${ASSETS_DIR}${relativePath}`.replace("index.md", ""),
  });

  const date = new Date(year, month - 1, day + 1);
  createNodeField({
    node,
    name: "date",
    value: date.toJSON(),
  });

  const slug = `/${BLOG_PATH_PREFIX}/${year}/${month}/${day}/${fileName}`;
  createNodeField({
    node,
    name: "slug",
    value: slug,
  });
};
