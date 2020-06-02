import { ssrAPI } from "./gatsby/ssr-api";

export const onRenderBody = ssrAPI.onRenderBody;
export const wrapRootElement = ssrAPI.wrapRootElement;
export const wrapPageElement = ssrAPI.wrapPageElement;
