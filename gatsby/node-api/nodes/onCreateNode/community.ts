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
  const match = COMMUNITY_FILENAME_REGEX.exec(relativePath);
  if (!match || match.length < 3) return;

  const id = match[1];
  const fileName = match[2];

  let type = null;
  try {
    type = require(`../../../../content/community/${id}/docs.config.json`).spec.type.toLowerCase();
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
      fileName,
    },
  });

  const slug = `/${COMMUNITY_PATH_PREFIX}/${type}/${id}`;
  createNodeField({
    node,
    name: "slug",
    value: slug,
  });
};
