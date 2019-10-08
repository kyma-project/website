import { readFileSync } from "fs";
import { resolve } from "path";
import { safeLoad } from "js-yaml";

import { CreatePageFn, CreatePageFnArgs } from "../../../types";
import { SlidesBannerProps } from "@typings/landingPage";

export const addToContextSlidesBanner = (
  createPage: CreatePageFn,
): CreatePageFn => (props: CreatePageFnArgs) => {
  const slidesBanner: SlidesBannerProps = extractSlidesBanner();

  createPage({
    ...props,
    context: {
      ...props.context,
      slidesBanner,
    },
  });
};

function extractSlidesBanner(): SlidesBannerProps {
  const path = resolve(__dirname, "../../../../content/banner/slides.yml");
  const file = readFileSync(path, "utf8");
  const data = safeLoad(file);
  return JSON.parse(JSON.stringify(data));
}
