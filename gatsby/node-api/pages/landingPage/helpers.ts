import { readFileSync } from "fs";
import { resolve } from "path";
import { safeLoad } from "js-yaml";

import { EarlyAdopter, Adopter } from "@typings/landingPage";
import {
  CreatePageFn,
  CreatePageFnArgs,
  GraphQLFunction,
} from "../../../types";

export const createLandingPage = (
  createPage: CreatePageFn,
  component: string,
): CreatePageFn => {
  const earlyAdopters = getEarlyAdopters();

  return (props: CreatePageFnArgs) => {
    createPage({
      ...props,
      component,
      context: {
        ...props.context,
        earlyAdopters,
        horizontalHeaderBg: false,
      },
    });
  };
};

function getEarlyAdopters(): EarlyAdopter[] {
  const path = resolve(
    __dirname,
    "../../../../content/early-adopters/early-adopters.yml",
  );
  const file = readFileSync(path, "utf8");
  const data = safeLoad(file) as { adopters: EarlyAdopter[] };
  return JSON.parse(JSON.stringify(data.adopters));
}

export async function getAdopters(graphql: GraphQLFunction) {
  const result = await graphql(`
    {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/adopters/" } }) {
        edges {
          node {
            id
            rawMarkdownBody
            fields {
              logo
            }
            frontmatter {
              title
              url
              companyInfo {
                company
                location
                industry
              }
            }
          }
        }
      }
    }
  `);
  if (result.errors) {
    throw new Error(result.errors);
  }

  return result.data.allMarkdownRemark.edges
    .map((e: any) => e.node)
    .map((node: any) => ({
      ...node,
      logo: node.fields.logo,
      content: node.rawMarkdownBody,
    })) as Adopter[];
}
