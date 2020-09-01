import "lazysizes";
import { browserAPI } from "./gatsby/browser-api";

import "@fortawesome/fontawesome-svg-core/styles.css";
import "@common/icons";

export const onInitialClientRender = browserAPI.onInitialClientRender;
export const shouldUpdateScroll = browserAPI.shouldUpdateScroll;
export const wrapRootElement = browserAPI.wrapRootElement;
export const wrapPageElement = browserAPI.wrapPageElement;
