import * as styledComponents from "styled-components";
import {
  ThemedStyledComponentsModule,
  ThemedStyledProps,
} from "styled-components";

import { Theme } from "./theme";
import media from "./media";

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
  withTheme,
} = (styledComponents as any) as ThemedStyledComponentsModule<Theme>;

type ThemeProps<P> = ThemedStyledProps<P, Theme>;

export {
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
  withTheme,
  ThemeProps,
  media,
};

export default styled;
