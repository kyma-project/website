import { GatsbySSR } from "gatsby";
import { wrapRootElement } from "./wrapRootElement";
import { wrapPageElement } from ".//wrapPageElement";

export const ssrAPI: GatsbySSR = {
  wrapRootElement,
  wrapPageElement,
};
