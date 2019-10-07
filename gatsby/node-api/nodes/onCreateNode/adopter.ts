import { Node } from "gatsby";
import { CreateNodeField } from "../../../types";

interface OnCreateAdopterNode {
  node: Node & { frontmatter?: { logo?: string } };
  relativePath: string;
  createNodeField: CreateNodeField;
}

export const onCreateAdopterNode = ({
  node,
  relativePath,
  createNodeField,
}: OnCreateAdopterNode) => {
  const logo = node.frontmatter && node.frontmatter.logo;
  if (!logo) {
    throw new Error(
      "logo field must be provided in frontmatter object of case study.",
    );
  }

  createNodeField({
    node,
    name: "logo",
    value: logo,
  });
};
