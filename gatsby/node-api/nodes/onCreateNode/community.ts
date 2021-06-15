import { Node } from "gatsby";
import { CreateNodeField } from "../../../types";

interface OnCreateCommunityNode {
  node: Node;
  relativePath: string;
  createNodeField: CreateNodeField;
}

export const onCreateCommunityNode = ({
  node,
  relativePath,
  createNodeField,
}: OnCreateCommunityNode) => {
  const splitted = relativePath.split("/");

  const id = splitted[1];
  const restPath = splitted.slice(2, splitted.length);
  const fileName = splitted[splitted.length - 1];

  createNodeField({
    node,
    name: "docInfo",
    value: {
      id,
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
