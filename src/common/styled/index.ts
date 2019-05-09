import * as styledComponents from "styled-components";

import { Theme } from "./theme";
import media, { sizes, is } from "./media";

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
  withTheme,
} = (styledComponents as any) as styledComponents.ThemedStyledComponentsModule<
  Theme
>;

type ThemeProps<P> = styledComponents.ThemedStyledProps<P, Theme>;

export {
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
  withTheme,
  ThemeProps,
  media,
  sizes,
  is,
};

export default styled;
