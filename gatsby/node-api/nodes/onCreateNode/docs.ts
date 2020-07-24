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
  if (!match || match.length < 6) return;

  const repositoryName = match[2];
  const version = match[3];
  const id = match[4].split("/")[0];
  const fileName = match[5];

  let type = null;
  try {
    type = require(`../../../../content/docs/${repositoryName}/${version}/${id}/docs.config.json`).spec.type.toLowerCase();
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
