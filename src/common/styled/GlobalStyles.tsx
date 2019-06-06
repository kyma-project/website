import { createGlobalStyle } from "@styled";

import reset from "styled-reset";
import "@fortawesome/fontawesome-svg-core/styles.css";

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

  body{
    position: relative;
  }

  svg {
    max-width: 100%;
  }

  #svgSprite {
    display: none;
  }

  .overlay{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: rgba(0,0,0,0.5); /*dim the background*/
  }
`;
