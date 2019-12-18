import { css } from "@styled";
import {
  CSSObject,
  SimpleInterpolation,
  ThemedCssFunction,
} from "styled-components";

enum Sizes {
  SMALL_PHONE = "smallPhone",
  PHONE = "phone",
  TABLET = "tablet",
  LARGE_TABLET = "largeTablet",
  DESKTOP = "desktop",
  LARGE_DESKTOP = "largeDesktop",
}

//////////////////// another breakpoints
// smallPhone: 320,
// phone: 576,
// tablet: 768,
// desktop: 992,
// largeDesktop: 1200,

export const sizes: { [index in Sizes]: number } = {
  smallPhone: 576,
  phone: 768,
  tablet: 1024,
  largeTablet: 1216,
  desktop: 1440,
  largeDesktop: 1580,
};

type Media = { [index in Sizes]: ThemedCssFunction<any> };

const DEFAULT_EM = 16;

const media: Media = Object.keys(sizes).reduce((obj: Media, label: string) => {
  const sizeLabel = label as Sizes;
  const emSize = sizes[sizeLabel] / DEFAULT_EM;
  (obj as any)[sizeLabel] = (
    first: TemplateStringsArray | CSSObject,
    ...interpolations: SimpleInterpolation[]
  ) => css`
    @media (max-width: ${emSize}em) {
      ${css(first, ...interpolations)};
    }
  `;
  return obj;
}, {} as Media);

export const is = {
  smallPhone: (): boolean =>
    Boolean(
      typeof window !== "undefined" && window.innerWidth <= sizes.smallPhone,
    ),
  phone: (): boolean =>
    Boolean(
      typeof window !== "undefined" &&
        window.innerWidth > sizes.smallPhone &&
        window.innerWidth <= sizes.phone,
    ),
  tablet: (): boolean =>
    Boolean(
      typeof window !== "undefined" &&
        window.innerWidth > sizes.phone &&
        window.innerWidth <= sizes.tablet,
    ),
  desktop: (): boolean =>
    Boolean(
      typeof window !== "undefined" &&
        window.innerWidth > sizes.tablet &&
        window.innerWidth <= sizes.desktop,
    ),
  largeDesktop: (): boolean =>
    Boolean(
      typeof window !== "undefined" &&
        window.innerWidth > sizes.desktop &&
        window.innerWidth <= sizes.largeDesktop,
    ),
};

export default media;
