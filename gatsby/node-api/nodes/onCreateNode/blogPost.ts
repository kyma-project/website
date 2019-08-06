import { Node } from "gatsby";
import {
  ASSETS_DIR,
  BLOG_PATH_PREFIX,
  BLOG_POST_FILENAME_REGEX,
} from "../../../constants";
import { CreateNodeField } from "../../../types";

interface OnCreateBlogPostNode {
  node: Node;
  relativePath: string;
  createNodeField: CreateNodeField;
}

export const onCreateBlogPostNode = ({
  node,
  relativePath,
  createNodeField,
}: OnCreateBlogPostNode) => {
  const match = BLOG_POST_FILENAME_REGEX.exec(relativePath);
  if (!match || match.length < 5) return;

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
