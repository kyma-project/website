import { MutableRefObject } from "react";

export const checkIsInView = (
  ref: MutableRefObject<HTMLDivElement | undefined>,
) => (element: HTMLAnchorElement) => {
  const bounding = element.getBoundingClientRect();
  const current = ref && ref.current;

  if (!current) {
    return;
  }

  if (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.right <=
      (window.innerWidth || document.documentElement.clientWidth) &&
    bounding.bottom <=
      (window.innerHeight || document.documentElement.clientHeight)
  ) {
    return;
  }

  current.scrollBy(0, bounding.top - Math.ceil(window.innerHeight * 0.5));
};
