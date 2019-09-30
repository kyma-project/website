import { GatsbyBrowser } from "gatsby";
import { wrapRootElement } from "./wrapRootElement";
import { wrapPageElement } from "./wrapPageElement";
import { onInitialClientRender } from "./onInitialClientRender";
import { shouldUpdateScroll } from "./shouldUpdateScroll";

export const browserAPI: GatsbyBrowser = {
  onInitialClientRender,
  shouldUpdateScroll,
  wrapRootElement,
  wrapPageElement,
};
