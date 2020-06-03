import { GatsbySSR } from "gatsby";
import { onPreRenderHTML } from "./onPreRenderHTML";
import { onRenderBody } from "./onRenderBody";
import { wrapRootElement } from "./wrapRootElement";
import { wrapPageElement } from "./wrapPageElement";

export const ssrAPI: GatsbySSR = {
  onPreRenderHTML,
  onRenderBody,
  wrapRootElement,
  wrapPageElement,
};
