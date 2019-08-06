import { Node } from "gatsby";
import { ROADMAP_CAPABILITY_FILENAME_REGEX } from "../../../constants";
import { CreateNodeField } from "../../../types";

interface OnCreateCapabilityNode {
  node: Node;
  relativePath: string;
  createNodeField: CreateNodeField;
}

const capability = ({
  node,
  relativePath,
  createNodeField,
}: OnCreateCapabilityNode) => {
  const match = ROADMAP_CAPABILITY_FILENAME_REGEX.exec(relativePath);
  if (!match || match.length < 2) return;

  const type = match[1];

  createNodeField({
    node,
    name: "type",
    value: type,
  });
};

export const onCreateRoadmapNode = { capability };
