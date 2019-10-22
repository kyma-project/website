import { readFileSync } from "fs";
import { resolve } from "path";
import { safeLoad } from "js-yaml";

import { EarlyAdopter, Adopter } from "@typings/landingPage";
import {
  CreatePageFn,
  CreatePageFnArgs,
  GraphQLFunction,
} from "../../../types";
import { ASSETS_DIR, ADOPTERS_DIR } from "../../../constants";

export const createLandingPage = (
  createPage: CreatePageFn,
  component: string,
  context: any,
): CreatePageFn => {
  const earlyAdopters = getEarlyAdopters();

  return (props: CreatePageFnArgs) => {
    createPage({
      ...props,
      component,
      context: {
        ...props.context,
        ...context,
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

export async function getAdopters(
  graphql: GraphQLFunction,
): Promise<Adopter[]> {
  const path = resolve(__dirname, "../../../../content/adopters/adopters.yaml");
  const file = readFileSync(path, "utf8");
  const data = safeLoad(file) as { adopters: Adopter[] };
  const adopters = JSON.parse(JSON.stringify(data.adopters)) as Adopter[];
  return adopters.map(adopter => ({
    ...adopter,
    logo: createLogoAssetPath(adopter.logo),
    content: stripAdopterContent(adopter.content),
  }));
}

function createLogoAssetPath(logo: string): string {
  if (!logo) {
    throw new Error(
      "logo field must be provided in frontmatter object of case study.",
    );
  }

  if (logo.startsWith("http")) {
    return logo;
  }

  return resolve(`/${ASSETS_DIR}${ADOPTERS_DIR}${logo}`);
}

function stripAdopterContent(content: string): string {
  if (content.length > 140) {
    return `${content.substring(0, 137)}...`;
  }
  return content;
}
