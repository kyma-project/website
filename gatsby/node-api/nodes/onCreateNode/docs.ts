import { Node } from "gatsby";
import { DOCS_PATH_PREFIX, DOCS_FILENAME_REGEX } from "../../../constants";
import { CreateNodeField } from "../../../types";

interface OnCreateDocsNode {
  node: Node;
  relativePath: string;
  createNodeField: CreateNodeField;
}

export const onCreateDocsNode = ({
  node,
  relativePath,
  createNodeField,
}: OnCreateDocsNode) => {
  const match = DOCS_FILENAME_REGEX.exec(relativePath);
  if (!match || match.length < 4) return;

  const version = match[1];
  const id = match[2].split("/")[0];
  const fileName = match[3];

  let type = null;
  try {
    type = require(`../../../../content/docs/${version}/${id}/docs.config.json`).spec.type.toLowerCase();
  } catch (err) {
    console.error(err);
    return;
  }

  createNodeField({
    node,
    name: "docInfo",
    value: {
      id,
      type,
      version,
      fileName,
    },
  });

  const slug = `/${DOCS_PATH_PREFIX}/${version}/${type}/${id}`;
  createNodeField({
    node,
    name: "slug",
    value: slug,
  });
};
