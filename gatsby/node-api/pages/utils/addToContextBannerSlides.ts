import { readFileSync } from "fs";
import { resolve } from "path";
import { safeLoad } from "js-yaml";

import { CreatePageFn, CreatePageFnArgs } from "../../../types";
import { SlidesBannerProps } from "@typings/landingPage";

export function extractSlidesBanner(): SlidesBannerProps {
  const path = resolve(__dirname, "../../../../content/banner/slides.yml");
  const file = readFileSync(path, "utf8");
  const data = safeLoad(file);
  return JSON.parse(JSON.stringify(data));
}

export const addToContextSlidesBanner = (
  createPage: CreatePageFn,
  slidesBanner: SlidesBannerProps,
): CreatePageFn => (props: CreatePageFnArgs) => {
  createPage({
    ...props,
    context: {
      ...props.context,
      slidesBanner,
    },
  });
};
