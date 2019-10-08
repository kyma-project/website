import { Adopter } from "@typings/landingPage";
import {
  CreatePageFn,
  CreatePageFnArgs,
  GraphQLFunction,
} from "../../../types";

export const createLandingPage = (
  createPage: CreatePageFn,
  component: string,
  adopters: Adopter[],
): CreatePageFn => (props: CreatePageFnArgs) => {
  createPage({
    ...props,
    component,
    context: {
      ...props.context,
      adopters,
      horizontalHeaderBg: false,
    },
  });
};

// function getEarlyAdopters(): EarlyAdopter[] {
//   const path = resolve(
//     __dirname,
//     "../../../../content/early-adopters/early-adopters.yml",
//   );
//   const file = readFileSync(path, "utf8");
//   const data = safeLoad(file) as { adopters: EarlyAdopter[] };
//   return JSON.parse(JSON.stringify(data.adopters));
// }

export async function getAdopters(
  graphql: GraphQLFunction,
): Promise<Adopter[]> {
  const result = await graphql(`
    {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/adopters/" } }) {
        edges {
          node {
            id
            rawMarkdownBody
            fields {
              assetsPath
            }
            frontmatter {
              url
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
      url: node.frontmatter.url,
      logo: node.fields.assetsPath,
      content: node.rawMarkdownBody,
    })) as Adopter[];
}
