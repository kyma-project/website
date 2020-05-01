import { createGlobalStyle } from "@styled";

import reset from "styled-reset";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-tippy/dist/tippy.css";

import "@common/icons";

import typography from "./typography";

export default createGlobalStyle`
  ${reset};
  ${typography.createStyles()}

  * {
    box-sizing: border-box;
  }

  html, body {
    font-family: "Poppins", Arial, sans-serif;
    line-height: 1.675;
    font-weight: 500;
    color: #485766;
    font-size: 1rem;
    min-height: 100%;
    margin: 0;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  body {
    position: relative;
  }

  svg {
    max-width: 100%;
  }

  #svgSprite {
    display: none;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: rgba(0,0,0,0.5); /*dim the background*/
  }

  .tippy-tooltip.kyma-theme {
    color: #fff;
    background-color: #0077e1;
    box-shadow: 0 0 6px 0 rgba(137, 165, 199, 0.42);
    border-radius: 3px;
    font-size: 12px;
    font-family: Poppins;
    line-height: 12px;
  }

  .tippy-popper[x-placement^='top'] [x-arrow] {
    border-top-color: #0077e1;
  }
  .tippy-popper[x-placement^='bottom'] [x-arrow] {
    border-bottom-color: #0077e1;
  }
  .tippy-popper[x-placement^='left'] [x-arrow] {
    border-left-color: #0077e1;
  }
  .tippy-popper[x-placement^='right'] [x-arrow] {
    border-right-color: #0077e1;
  }
`;
