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
  const splitted = relativePath.split("/");
  const version = splitted[2];
  const id = splitted[3];
  const restPath = splitted.slice(4, splitted.length);
  const fileName = splitted[splitted.length - 1];

  createNodeField({
    node,
    name: "docInfo",
    value: {
      id,
      version,
      fileName,
    },
  });

  const slug = [id].concat(restPath).join("/");

  createNodeField({
    node,
    name: "slug",
    value: slug,
    filePath: relativePath,
  });
};
