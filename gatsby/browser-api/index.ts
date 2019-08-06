import { GatsbyBrowser } from "gatsby";
import { wrapRootElement } from "./wrapRootElement";
import { wrapPageElement } from "./wrapPageElement";

export const browserAPI: GatsbyBrowser = {
  wrapRootElement,
  wrapPageElement,
};
