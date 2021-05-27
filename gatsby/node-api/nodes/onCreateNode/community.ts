import { Node } from "gatsby";
import {
  COMMUNITY_FILENAME_REGEX,
  COMMUNITY_PATH_PREFIX,
} from "../../../constants";
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
  // const match = COMMUNITY_FILENAME_REGEX.exec(relativePath);
  // if (!match || match.length < 3) return;

  const splitted = relativePath.split("/");

  const id = splitted[2];
  const restPath = splitted.slice(3, splitted.length);
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
  // const slug = `/${COMMUNITY_PATH_PREFIX}/${type}/${id}`;

  createNodeField({
    node,
    name: "slug",
    value: slug,
    filePath: relativePath,
  });
};
