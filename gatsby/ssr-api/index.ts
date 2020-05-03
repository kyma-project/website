import { GatsbySSR } from "gatsby";
import { onRenderBody } from "./onRenderBody";
import { wrapRootElement } from "./wrapRootElement";
import { wrapPageElement } from "./wrapPageElement";

export const ssrAPI: GatsbySSR = {
  onRenderBody,
  wrapRootElement,
  wrapPageElement,
};
