import { readFileSync } from "fs";
import { resolve } from "path";
import { safeLoad } from "js-yaml";

import { EarlyAdopter } from "@typings/landingPage";
import { CreatePageFn, CreatePageFnArgs } from "../../../types";

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
