import "lazysizes";
import { browserAPI } from "./gatsby/browser-api";

import "./static/css/fonts.css";
import "./static/css/typography.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "@common/icons";
import "./static/css/global.css";
import "./static/css/docsearch.min.css";

export const onInitialClientRender = browserAPI.onInitialClientRender;
export const shouldUpdateScroll = browserAPI.shouldUpdateScroll;
export const wrapRootElement = browserAPI.wrapRootElement;
export const wrapPageElement = browserAPI.wrapPageElement;
